/* Copyright (c) 2010-2014 Nearform */
'use strict'

var assert = require('assert')
var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it

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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 20)
      assert.equal(result.rate, 0.20)
      assert.equal(result.total, 120)
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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 20)
      assert.equal(result.rate, 0.20)
      assert.equal(result.total, 120)
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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 5)
      assert.equal(result.rate, 0.05)
      assert.equal(result.total, 105)
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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 20)
      assert.equal(result.rate, 0.20)
      assert.equal(result.total, 120)
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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 0)
      assert.equal(result.rate, 0)
      assert.equal(result.total, 100)
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
      assert.ok(!err, err)
      assert.ok(result)
      assert.equal(result.tax, 0)
      assert.equal(result.rate, 0)
      assert.equal(result.total, 100)
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
      assert.ok(!err)
      assert.ok(result)
      assert.equal(result.tax, 0)
      assert.equal(result.rate, 0)
      assert.equal(result.total, 100)
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
      assert.ok(!err)
      assert.ok(result)
      assert.equal(result.tax, 0)
      assert.equal(result.rate, 0)
      assert.equal(result.total, 100)
      done()
    })
  })
})
