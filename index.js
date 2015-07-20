#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var rc = require('rc');
var fs = require('fs');

var MultiExecutor = require('./lib/MultiExecutor.js');

var conf = rc('exec-it', {
	p: 22,
	l: 'ec2-user',
	i: process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'] + '/.ssh/id_rsa',
	cp: '',
	n: true
});

if (conf.help || conf.usage) {
	console.log(
 		'-c command to execute on remote machine\n' +
 		'-cp command prefix\n' +
 		'-f read command from a file, works only if -c is not specified\n' +
 		'-p ssh port, default is 22\n' +
 		'-l username on remote machine, default is ec2-user\n' +
 		'-i private key, default is /a_home_dir/.ssh/id_rsa)\n' +
 		'-h private key passphrase, default is none)\n')
	return process.exit(0)
}

var command = conf.cp + ((conf.c === undefined) ? fs.readFileSync(conf.f) : conf.c);

var privateKey = fs.readFileSync(conf.i);

var passphrase = conf.h;

var multiExecutor = new MultiExecutor(command, conf.p, conf.l, privateKey, passphrase);
multiExecutor.start();
