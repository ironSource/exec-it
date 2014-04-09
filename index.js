#!/usr/local/bin/node

var _ = require('lodash');
var path = require('path');
var rc = require('rc');
var fs = require('fs');

var MultiExecutor = require('./lib/MultiExecutor.js');

var conf = rc('remote-exec', {
	c: 'echo Hello',
	p: 22,
	l: 'ec2-user',
	i: '~/.ssh/id_rsa'
});

var pathToPrivateKey = path.normalize(conf.i);
var privateKey = fs.readFileSync(pathToPrivateKey);

var multiExecutor = new MultiExecutor(conf.c, conf.p, conf.l, privateKey);
multiExecutor.start();
