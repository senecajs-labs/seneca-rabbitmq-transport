/* Copyright (c) 2014 Richard Rodger */
'use strict'

var test = require('seneca-transport-test')

var Lab = require('lab')
var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it

describe('rabbitmq-transport', function () {
  it('happy-any', function (fin) {
    test.foo_test('rabbitmq-transport', require, fin, 'rabbitmq', -6379)
  })

  it('happy-pin', function (fin) {
    test.foo_pintest('rabbitmq-transport', require, fin, 'rabbitmq', -6379)
  })
})
