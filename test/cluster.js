/* Copyright (c) 2014-2015 Richard Rodger, MIT License */
'use strict';

var _ = require('lodash')
var async = require('async')
var assert = require('assert')
var cluster = require('cluster')
var seneca = require('seneca')

var NUM_TASKS = 20
var NUM_CLIENTS = 3
var NUM_SERVERS = 3

if (cluster.isMaster) {

  var workers = {}
  var clientworkers = [];
  var serverworkers = [];

  var tasks = {}
  for (var idx = 0; idx < NUM_TASKS; idx++) {
    tasks[idx] = {id: idx}
  }

  for (var i = 0; i < NUM_CLIENTS; i++) {
    var worker = cluster.fork({TYPE: 'client'})
    workers[worker.id] = worker
    clientworkers.push(worker)
    worker.on('message', function (msg) {
      if (msg.event === 'callback') {
        console.log(_.padLeft(msg.task.id, 4, '0') + '-callback' + ' ' + this.process.pid)
        results[msg.task.id] = results[msg.task.id] || {};
        if (msg.err) {
          results[msg.task.id].errcount = (results[msg.task.id].errcount || 0) + 1;
        }
        else {
          results[msg.task.id].cbcount = (results[msg.task.id].cbcount || 0) + 1;
        }
      }
    });
  }

  // start workers with handle 'once' listeners
  var results = {}
  for (var i = 0; i < NUM_SERVERS; i++) {
    var worker = cluster.fork()
    workers[worker.id] = worker
    serverworkers.push(worker)
    worker.on('message', function (msg) {
      if (msg.event === 'exec') {
        console.log(_.padLeft(msg.task.id, 4, '0') + '-exec' + ' ' + this.process.pid)
        results[msg.task.id] = results[msg.task.id] || {};
        results[msg.task.id].evcount = (results[msg.task.id].evcount || 0) + 1;
      }
    });
  }

  async.each(_.values(workers), function (worker, done) { // wait for all workers to start
    worker.on('message', function (msg) {
      if (msg.event === 'ready') {
        return done()
      }
    })
  }, function () { // then act
    // signal clients to act
    _.each(tasks, function (task, idx) {
      clientworkers[idx%NUM_CLIENTS].send({cmd: 'exec', task: task})
    })

    // allow enough time for the test to complete before killing the workers
    setTimeout(function() {
      _.each(workers, function(worker) {
        worker.kill()
      })
    }, 10 * 1e3)
  })

  async.each(_.values(workers), function (worker, done) { // wait for all workers to exit
    worker.on('exit', function () {
      return done()
    })
  }, function () {
    _.each(tasks, function (task) {
      //actions handled by handle 'once' listeners should be processed once and only once
      assert(results[task.id], 'processed')
      // no errors
      assert.equal(results[task.id].errcount || 0, 0, 'error count')
      // executed once
      assert.equal(results[task.id].evcount, 1, 'exec count')
      // called back once
      assert.equal(results[task.id].cbcount, 1, 'callback count')
    })
  })
}
else {

  var si = seneca({
    timeout: 5 * 1e3
  })

  si.use('../rabbitmq-transport')

  if ('client' === process.env['TYPE']) {
    si.client({type: 'rabbitmq', pin: 'role:test,cmd:*'})

    process.on('message', function (msg) {
      if (msg.cmd === 'exec') {
        si.act({role: 'test', cmd: 'exec', task: msg.task}, function (err) {
          if (err) {
            //console.error(err);
          }
          process.send({event: 'callback', task: msg.task, err: err})
        })
      }
    })
  }
  else {
    si.listen({type: 'rabbitmq', pin: 'role:test,cmd:*'})

    si.add({role: 'test', cmd: 'exec'}, function (args, done) {
      process.send({event: 'exec', task: args.task})
      return done()
    })
  }

  // signal worker ready
  si.ready(function () {
    process.send({event: 'ready'})
  })

}

