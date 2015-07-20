
var _ = require('lodash');
var debug = require('debug');
var split = require('split');

var Executor = require('./Executor.js');

function MultiExecutor(command, port, user, privateKey, passphrase) {
	this._debug = debug('A');
	this._command = command;
	this._port = port;
	this._user = user;
	this._privateKey = privateKey;
	this._passphrase = passphrase;
	var splitter = split();
	splitter.on('data', _.bind(this._readHost, this));
	splitter.on('end', _.bind(this._execute, this));
	this._spltter = splitter;
	this._hosts = [];
}

var p = MultiExecutor.prototype;

p.start = function(callback) {
	this._debug('start');
	process.stdin.pipe(this._spltter);
};

p._readHost = function(host) {
	this._debug('_readHost');
	if (host.length === 0) {
		return;
	}
	var hosts = this._hosts.push(host);
};

p._execute = function(callback) {
	this._debug('_execute');
	var hosts = this._hosts;
	var hostLength = hosts.length;
	if (hosts.length === 0) {
		console.error('No hosts');
		return;
	}
	for (var i = 0; i < hostLength; i++) {
		var host = hosts[i];
		var remoteExecutor = new Executor(host, this._port, this._user, this._privateKey, this._passphrase, this._command);
		remoteExecutor.start();
	}
};

delete p;

module.exports = MultiExecutor;