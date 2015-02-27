seneca-rabbitmq-transport
======================

Seneca micro-services message transport over RabbitMQ messaging.


## Support

For questions:
[@rjrodger](http://twitter.com/rjrodger)
[@zbangazbanga](http://twitter.com/zbangazbanga)

Current Version: 0.2.1

Tested on: Node 0.10.31, Seneca 0.5.21


### Install

```sh
npm install seneca-rabbitmq-transport
```

You'll also need [RabbitMQ](http://www.rabbitmq.com) or another server that
implements version 0.9.1 of the [AMQP](http://www.amqp.org) protocol.


## Quick Example

```js
require('seneca')()
  .use('rabbitmq-transport')
  .add('foo:two',function(args,done){ done(null,{bar:args.bar}) })
  .client( {type:'rabbitmq',url:'amqp://localhost',pin:'foo:one,bar:*'} )
  .listen( {type:'rabbitmq',url:'amqp://localhost',pin:'foo:two,bar:*'} )
```






