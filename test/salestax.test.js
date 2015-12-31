/* Copyright (c) 2010-2014 Nearform */
'use strict'

var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

var seneca = require('seneca')()
  .use('../')
  .use('salestax', {
    country: {
      'FR': 0.20,
      'UK': {
        '*': 0.20,
        category: {
          'energy': 0.05,
          'child': 0.05,
          'food': 0,
          'children_clothes': 0
        }
      },
      'IE': {
        'category': {
          'energy': 0.05,
          'child': 0.05,
          'food': 0,
          'children_clothes': 0
        }
      },
      'USA': {
        '*': 0,
        'state': {
          'CA': 0.875,
          'AK': 0
        }
      }
    }
  })

describe('salestax', function () {
  it('happy', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'FR'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(20)
      expect(result.rate).to.equal(0.20)
      expect(result.total).to.equal(120)
      done()
    })
  })

  it('wildcard', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'UK'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(20)
      expect(result.rate).to.equal(0.20)
      expect(result.total).to.equal(120)
      done()
    })
  })

  it('nested', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'UK',
      category: 'child'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(5)
      expect(result.rate).to.equal(0.05)
      expect(result.total).to.equal(105)
      done()
    })
  })

  it('non existent nested value with wildcard', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'UK',
      category: 'does not exist'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(20)
      expect(result.rate).to.equal(0.20)
      expect(result.total).to.equal(120)
      done()
    })
  })

  it('non existent nested value without wildcard', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'IE',
      category: 'does not exist'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(0)
      expect(result.rate).to.equal(0)
      expect(result.total).to.equal(100)
      done()
    })
  })

  it('no nested value fails if there is no wildcard', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'IE'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(0)
      expect(result.rate).to.equal(0)
      expect(result.total).to.equal(100)
      done()
    })
  })

  it('zero tax rate is valid', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'USA'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(0)
      expect(result.rate).to.equal(0)
      expect(result.total).to.equal(100)
      done()
    })
  })

  it('zero tax rate wildcard is valid', function (done) {
    seneca.act({
      role: 'salestax',
      cmd: 'salestax',
      net: 100,
      country: 'USA',
      state: 'AK'
    }, function (err, result) {
      expect(err).to.not.exist()
      expect(result).to.exist()
      expect(result.tax).to.equal(0)
      expect(result.rate).to.equal(0)
      expect(result.total).to.equal(100)
      done()
    })
  })
})
