var seneca = require('seneca')()
  .use('..')
  .client({type: 'rabbitmq'})

setInterval(function () {
  seneca.act('foo:1,zed:10', console.log)
}, 1111)
