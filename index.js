const path = require('path'),
	child_process = require('child_process');

function malta_mocha(o, options) {

	options = options || {};

	const self = this,
		start = new Date(),
		execDir = self.execDir,
        pluginName = path.basename(path.dirname(__filename));
    
    let msg;
	
	process.chdir(execDir);

	return (solve, reject) => {
		try {
			var ls = child_process.spawn('mocha'),
				outmsg = ["\n" + 'plugin ' + pluginName.white() + "\n"];
			ls.stderr.on('data', err => {
				console.log("ERROR".red());
				msg = 'plugin ' + pluginName.white() + ' compilation error';
				console.log((err+"").white());
                // solve(o);
                reject(`ERROR: some tests are failing\nplugin ${pluginName}: SOME TESTS ARE FAILING`);
				self.notifyAndUnlock(start, msg);
			});
			ls.stdout.on('data', m => {
				m = m + "";
				m = m.match(/failing/) ? m.red() : m;
				outmsg.push(m);
			});

			ls.on('exit', code => {	
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