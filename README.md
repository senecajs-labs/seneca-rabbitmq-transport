![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js][] transport plugin.

# seneca-rabbitmq-transport
[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

A micro-services message transport over RabbitMQ

- __Version:__ 0.2.1
- __Tested on:__ Seneca 0.9
- __Node:__ 0.10, 0.12, 4, 5
- __License:__ [MIT][]

seneca-rabbitmq-transport's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online](http://github.com/senecajs/seneca-rabbitmq-transport/doc/rabbitmq-transport.html).

The annotated source can be found locally at [./doc/rabbitmq-transport.html]().

If you're using this module, and need help, you can:

- Post a [github issue][],
- Tweet to [@senecajs][],
- Ask on the [Gitter][gitter-url].

If you are new to Seneca in general, please take a look at [senecajs.org][]. We have everything from
tutorials to sample apps to help get you up and running quickly.


## Install
To install, simply use npm. Remember you will need to install [Seneca.js][] if you haven't already.

```
npm install seneca
npm install seneca-rabbitmq-transport
```

## Test
To run tests, you need to have a rabbitmq server running locally. You can either to that yourself, or
you can use the `setup.sh` script in the repository. This will spin up a docker container that has a
rabitmq server running:

```
npm run setup-test
```
Then, to run the tests, simply use npm:

```
npm run test
```

## Contributing
The [Senecajs org][] encourage open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License
Copyright Richard Rodger and other contributors 2015, Licensed under [MIT][].

[travis-badge]: https://travis-ci.org/piccoloaiutante/seneca-rabbitmq-transport.svg?branch=master
[travis-url]: https://travis-ci.org/piccoloaiutante/seneca-rabbitmq-transport
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/senecajs/seneca

[MIT]: ./LICENSE
[Senecajs org]: https://github.com/senecajs/
[Seneca.js]: https://www.npmjs.com/package/seneca
[senecajs.org]: http://senecajs.org/
[github issue]: https://github.com/senecajs/seneca-rabbitmq-transport/issues
[@senecajs]: http://twitter.com/senecajs

