/**
 * format timestamp
 */
const zeroify = input => _.padStart(input, 2, '0');

module.exports = () => {
	const d = new Date;

	return (
		d.getFullYear() + '-' +
		zeroify(d.getMonth() + 1) + '-' +
		zeroify(d.getDate()) + ' ' +
		zeroify(d.getHours()) + ':' +
		zeroify(d.getMinutes()) + ':' +
		zeroify(d.getSeconds())
	);
};