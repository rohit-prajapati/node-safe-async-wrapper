/* jslint node: true */
'use strict';

var domain = require('domain');

function safeAsyncWrapper(fn) {
    return function (/*...args, callback*/) {
        var self = this;
        var args = arguments;
        var callback = args[args.length - 1];
        var postDomain = domain.create();
        postDomain.on('error', function (err) {
            return callback(err);
        });
        postDomain.run(function () {
            fn.apply(self, args);
        });
    };
}

module.exports = {
    wrap: safeAsyncWrapper
};
