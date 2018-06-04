const os = require('os');
const timerStep = 6000; // 6s
const timesPerM = 60 * 1000 / timerStep; // sample times per minute
// 1m 3m 6m 10m 15m
const avgTimesArr = [1 * timesPerM, 3 * timesPerM, 6 * timesPerM, 10 * timesPerM, 15 * timesPerM];
const timerKey = 'cpusUsageTimer';
const usageAvgKey = 'cpusUsageAvgArr';
const usageTimeInfoKey = 'cpusUsageTimeInfo';

/**
 * Cpu stats
 * @module app/libs/cpustats
 */
module.exports = {
	/**
	 * Get cpus' usage avgage
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @return   {Array}   avage array
	 */
	getCpusUsageAvg: function() {
		// add timer
		if (!global[timerKey]) {
			global[timerKey] = this._getCpusUsageTimer();
		}

		const cpusUsageAvgArr = [0, 0, 0, 0, 0];

		if (global[usageAvgKey] && _.isArray(global[usageAvgKey])) {
			const len = global[usageAvgKey].length;
			const tempUsageArr = [];
			_.each(global[usageAvgKey], function(item) {
				tempUsageArr.unshift(item);
			});
			const tempTimesArr = _.takeWhile(avgTimesArr, function(times) {
				return times <= len;
			});
			_.each(tempUsageArr, function(item, i) {
				_.each(tempTimesArr, function(times, j) {
					const flag = times - 1;
					if (i <= flag) {
						cpusUsageAvgArr[j] += item['usage'];
					}
					if (i === flag) {
						cpusUsageAvgArr[j] = (cpusUsageAvgArr[j] / times).toFixed(4);
					}
				})
			});
		}
		return cpusUsageAvgArr;
	},
	/**
	 * Get cpus' usage sampling timer
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @return   {Function}   sampling timer
	 */
	_getCpusUsageTimer: function() {
		const self = this;
		global[usageTimeInfoKey] = self.getCurCpusUsageTimeInfo();
		return setInterval(function() {
			const usageAvg = {
				time: new Date().getTime(),
				usage: self.getCurCpusUsageAvg(),
			};
			if (global[usageAvgKey] && _.isArray(global[usageAvgKey])) {
				global[usageAvgKey].push(usageAvg);
				if (global[usageAvgKey].length > _.last(avgTimesArr)) {
					global[usageAvgKey].shift();
				}
			} else {
				global[usageAvgKey] = [usageAvg];
			}

		}, timerStep);
	},
	/**
	 * Get current cpus' usage avgage
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @return   {Number}   0-1 number
	 */
	getCurCpusUsageAvg: function() {
		if (global[usageTimeInfoKey]) {
			const curCpusUsageTimeInfo = this.getCurCpusUsageTimeInfo();
			const { idleTime: curIdleTime, totalTime: curTotalTime } = curCpusUsageTimeInfo;
			const { idleTime: preIdleTime, totalTime: preTotalTime }  = global[usageTimeInfoKey];
			const usageAvg = 1 - (curIdleTime - preIdleTime) / (curTotalTime - preTotalTime);
			global[usageTimeInfoKey] = curCpusUsageTimeInfo;
			return usageAvg;
		} else {
			return 0;
		}
	},
	/**
	 * Get current cpus' usage time info
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @return   {Object}   usage time info
	 */
	getCurCpusUsageTimeInfo: function() {
		const cpusStatsArr = os.cpus();
		const cpusNum = cpusStatsArr.length;
		let idleSum = 0;
		let totalSum = 0;

		_.each(cpusStatsArr, function(cpu, index) {
			const times = cpu.times;
			const { user, nice, sys, idle, irq} = times;
			const total = user + nice + sys + idle + irq;
			idleSum += idle;
			totalSum += total;
		});

		return {
			idleTime: idleSum / cpusNum,
			totalTime: totalSum / cpusNum,
		};
	},
	/**
	 * Get cpus' loadavg
	 * @author jerishi
	 * @DateTime 2018-06-01
	 * @return   {Array}   loadavg array
	 */
	getCpusLoadAvg: function() {
		const loadAvg = os.loadavg(); // 1m 5m 15m 
		const cpusNum = os.cpus().length;
		const temploadAvgArr = [0, 0, 0];
		_.each(loadAvg, function(item, index) {
			return temploadAvgArr[index] += item;
		});

		return _.map(temploadAvgArr, function(item) {
			return (item / cpusNum).toFixed(4);
		});
	},
};