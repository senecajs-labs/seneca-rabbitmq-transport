![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](https://github.com/senecajs/) a seneca-auth plugin

## Recommendation

We are considering retiring this module in favor of https://github.com/disintegrator/seneca-amqp-transport  Please take a look and let us know your thoughts by creating an issue.

## seneca-rabbitmq-transport
[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter chat][gitter-badge]][gitter-url]

A micro-services message transport over RabbitMQ

## About

seneca-rabbitmq-transport's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online][].

The annotated source can be found locally by clicking [here][].

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
Copyright Richard Rodger and other contributors 2016, Licensed under [MIT][].

[npm-badge]: https://img.shields.io/npm/v/seneca-rabbitmq-transport.svg
[npm-url]: https://npmjs.com/package/seneca-rabbitmq-transport
[travis-badge]: https://api.travis-ci.org/senecajs/seneca-rabbitmq-transport.svg
[travis-url]: https://travis-ci.org/senecajs/seneca-rabbitmq-transport
[coveralls-badge]:https://coveralls.io/repos/senecajs/seneca-rabbitmq-transport/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/senecajs/seneca-rabbitmq-transport?branch=master
[david-badge]: https://david-dm.org/senecajs/seneca-rabbitmq-transport.svg
[david-url]: https://david-dm.org/senecajs/seneca-rabbitmq-transport
[gitter-badge]: https://badges.gitter.im/senecajs/seneca.svg
[gitter-url]: https://gitter.im/senecajs/seneca
[online]: http://htmlpreview.github.com/?https://github.com/senecajs/seneca-rabbitmq-transport/blob/master/doc/rabbitmq-transport.html
[MIT]: ./LICENSE
[Senecajs org]: https://github.com/senecajs/
[Seneca.js]: https://www.npmjs.com/package/seneca
[senecajs.org]: http://senecajs.org/
[github issue]: https://github.com/senecajs/seneca-rabbitmq-transport/issues
[@senecajs]: http://twitter.com/senecajs
[here]: ./doc/rabbitmq-transport.html
