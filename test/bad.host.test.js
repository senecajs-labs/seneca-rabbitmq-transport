/* Copyright (c) 2014 Richard Rodger, MIT License */
'use strict'

var Lab = require('lab')
var Code = require('code')

var RabbitmqTransport = require('../rabbitmq-transport.js')

// Test shortcuts
var lab = exports.lab = Lab.script()
var describe = lab.describe
var test = lab.test
var expect = Code.expect

var internals = {
  defaults: {
    rabbitmq: {
      type: 'rabbitmq',
      port: 5672
    }
  }
}

describe('rabbitmq-transport', function () {
  test('wrong server host', function (fin) {
    var cc = 0
    var seneca_srv = require('seneca')({
      log: 'silent',
      debug: {undead: true},
      errhandler: function (err) {
        cc++
        if (cc === 2) {
          service.close(fin)
        }
        else if (cc === 1) {
          expect('seneca: Action hook:listen,role:transport,type:rabbitmq failed: getaddrinfo ENOTFOUND somehost somehost:5672.').to.equal(err.message)
        }
      },
      timeout: 111
    })
      .use(RabbitmqTransport, {rabbitmq: {host: 'somehost'}})

    var service = foo_service(seneca_srv)
  })

  test('wrong client host', function (fin) {
    var seneca_srv = require('seneca')({log: 'silent'})
      .use(RabbitmqTransport)

    var service = foo_service(seneca_srv)

    service.ready(function () {
      var cc = 0
      var seneca_client = require('seneca')({
        log: 'silent',
        debug: {undead: true},
        errhandler: function (err) {
          cc++
          if (cc === 2) {
            foo_close(client, service, fin)
          }
          else if (cc === 1) {
            expect('seneca: Action hook:client,role:transport,type:rabbitmq failed: getaddrinfo ENOTFOUND somehost somehost:5672.').to.equal(err.message)
          }
        },
        timeout: 111
      })
        .use(RabbitmqTransport, {rabbitmq: {host: 'somehost'}})

      var client = foo_run(seneca_client)
    })
  })
})

function foo_plugin () {
  this.add('foo:1', function (args, done) {
    done(null, {dee: '1-' + args.bar})
  })
}

function foo_service (seneca) {
  var type = internals.defaults['rabbitmq'].type
  var port = internals.defaults['rabbitmq'].port
  return seneca
    .use(foo_plugin)
    .listen({type: type, port: (port < 0 ? -1 * port : port)})
}


function foo_run (seneca) {
  var type = internals.defaults['rabbitmq'].type
  var port = internals.defaults['rabbitmq'].port
  var pn = port < 0 ? -1 * port : port

  return seneca
    .client({type: type, port: pn})
    .ready(function () {
      this.act('foo:1,bar:"A"')
    })
}

function foo_close (client, service, fin) {
  client.close(function (err) {
    if (err) return fin(err)

    service.close(function (err) {
      return fin(err)
    })
  })
}
