var _ = require('lodash');
var debug = require('debug');

var Ssh = require('ssh2');

function Executor(host, port, user, privateKey, passphrase, command) {
	this._debug = debug('B');
	this._host = host;
	this._sshOptions = {
		host: host,
		port: port,
		username: user,
		privateKey: privateKey,
		passphrase: passphrase
	}
	this._command = command;
	var ssh = new Ssh();
	ssh.on('ready', _.bind(this._execute, this));
	ssh.on('error', _.bind(this._onError, this));
	this._ssh = ssh;
	this._stream = null;
}

p = Executor.prototype;

p.start = function() {
	this._debug('start');
	this._ssh.connect(this._sshOptions);
};

p._execute = function() {
	this._debug('_execute');
	this._ssh.exec(this._command, _.bind(this._onExecuting, this));
};

p._onExecuting = function(err, stream) {
	this._debug('_onExecuting');
	if (err) {
		console.error(err);
		return;
	}
	this._stream = stream;
	stream.on('data', _.bind(this._onData, this));
	stream.on('close', _.bind(this._onStreamClose, this));
};

p._onStreamClose = function() {
	this._debug('_onStreamClose');
	this._ssh.end();
};

p._onData = function(data, extended) {
	this._debug('_onData');
	console.log('%s %s:\n%s', this._host, (extended === 'stderr' ? 'STDERR' : 'STDOUT'), data);
};

p._onError = function(err) {
	this._debug('_onError');
	console.error('%s ERROR: %s', this._host, err);
};

delete p;

module.exports = Executor;