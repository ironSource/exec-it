#!/usr/local/bin/node

var _ = require('lodash');
var path = require('path');
var rc = require('rc');
var fs = require('fs');

var MultiExecutor = require('./lib/MultiExecutor.js');

var conf = rc('remote-exec', {
	p: 22,
	l: 'ec2-user',
	i: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] + '/.ssh/id_rsa'
});

var command = (conf.c === undefined) ? fs.readFileSync(conf.f) : conf.c;

var privateKey = fs.readFileSync(conf.i);

var multiExecutor = new MultiExecutor(command, conf.p, conf.l, privateKey);
multiExecutor.start();
