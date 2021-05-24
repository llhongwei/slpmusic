//防抖函数
export function debounce(fn, delay) {
	let timer;

	return function () {
		if(timer) clearTimeout(timer);
		
		let _this = this;
		let _arguments = arguments;

		timer = setTimeout(() => {
			fn.apply(_this, _arguments);
		},delay);
	}
}

//节流函数1  第一次执行没有延迟
export function throttle(fn, interval) {
	let last = 0;

	return function () {
		let now = new Date().getTime();

		let _this = this;
		let _arguments = arguments;

		if(now - last > interval) {
			fn.apply(_this, _arguments);
			last = now;
		}
	}
}

//节流函数2  第一次执行有延迟
export function throttle2(fn, interval) {
	let timer;

	return function () {
		let _this = this;
		let _arguments = arguments;

		if(timer) {
			return;
		}

		timer = setTimeout(() => {
			fn.apply(_this, _arguments);
			timer = null;
		}, interval);
	}
}