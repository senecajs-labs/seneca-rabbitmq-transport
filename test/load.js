
require('seneca')()
  .use('..')
  .client({type:'rabbitmq'})
  .listen({type:'rabbitmq'})

  .ready(function(){
    console.log( this.list() )
  })
