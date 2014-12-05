require('seneca')()
  .use('..')

  .add('foo:1',function(args,done){
    done(null,{bar:args.zed+1,when:Date.now()})
  })

  .act('foo:1,zed:0',console.log)

  .listen({type:'rabbitmq'})
