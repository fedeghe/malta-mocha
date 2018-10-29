require('malta').checkDeps('mocha');

var path = require('path'),
	child_process = require('child_process');

function malta_mocha(o, options) {

	options = options || {};

	var self = this,
		start = new Date(),
		msg,
		execDir = self.execDir,
		inDir = path.dirname(self.tplPath),
		pluginName = path.basename(path.dirname(__filename));
	
	process.chdir(execDir);

	return function (solve, reject){
		try {
			var ls = child_process.spawn('mocha'),
				outmsg = ["\n" + 'plugin ' + pluginName.white() + "\n"];
			ls.stderr.on('data', function(err) {
				console.log("ERROR".red());
				msg = 'plugin ' + pluginName.white() + ' compilation error';
				console.log((err+"").white());
				solve(o);
				self.notifyAndUnlock(start, msg);
			});
			ls.stdout.on('data', function(m) {
				m = m + "";
				m = m.match(/failing/) ? m.red() : m;
				outmsg.push(m);
			});

			ls.on('exit', function (code) {	
				msg = outmsg.join("");
				solve(o);
				self.notifyAndUnlock(start, msg);
			});

		} catch (err) {
			self.doErr(err, o, pluginName);
		}
	};
}
malta_mocha.ext = ['js', 'coffee', 'ts'];
module.exports = malta_mocha;