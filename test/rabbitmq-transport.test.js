/* Copyright (c) 2014 Richard Rodger */
"use strict";

var test = require('seneca-transport-test')


describe('rabbitmq-transport', function() {

  it('happy-any', function( fin ) {
    test.foo_test( 'rabbitmq-transport', require, fin, 'rabbitmq', -6379 )
  })

  it('happy-pin', function( fin ) {
    test.foo_pintest( 'rabbitmq-transport', require, fin, 'rabbitmq', -6379 )
  })

  it('happy-multiple-origin', function( fin ) {
    test.multiple_origin_test( 'rabbitmq-transport', require, fin, 'rabbitmq', -6379 )
  })

})
