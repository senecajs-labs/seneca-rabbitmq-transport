/* Copyright (c) 2014 Richard Rodger */
'use strict'

var Test = require('seneca-transport-test')

var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

describe('rabbitmq-transport', function () {
  it('happy-any', function (done) {
    Test.foo_test('rabbitmq-transport', require, done, 'rabbitmq', -6379)
  })

  it('happy-pin', function (done) {
    Test.foo_pintest('rabbitmq-transport', require, done, 'rabbitmq', -6379)
  })

  it('options', function (done) {
    var a = require('seneca')({
      log: 'silent',
      timeout: 23555
    })
      .use('../rabbitmq-transport.js')

    var so = a.options()
    expect(so.timeout).to.exist()
    expect(so.timeout).to.equal(23555)

    var b = require('seneca')({
      log: 'silent',
      timeout: null
    })
      .use('../rabbitmq-transport.js')

    so = b.options()
    expect(so.timeout).to.not.exists()

    done()
  })
})
