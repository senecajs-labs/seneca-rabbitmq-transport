/* Copyright (c) 2014 Richard Rodger */
'use strict'

var test = require('seneca-transport-test')

var Lab = require('lab')
var Code = require('code')

var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it
var expect = Code.expect

describe('rabbitmq-transport', function () {
  it('happy-any', function (done) {
    test.foo_test('rabbitmq-transport', require, done, 'rabbitmq', -6379)
  })

  it('happy-pin', function (done) {
    test.foo_pintest('rabbitmq-transport', require, done, 'rabbitmq', -6379)
  })
})
