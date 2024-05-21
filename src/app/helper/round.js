export function round(number, precision = 0) {
	const d = Math.pow(10, precision);
	return Math.round(number * d) / d;
}