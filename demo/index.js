export function throttle(fn, delay) {
    // 判断delay是否为数字
    delay = typeof delay === 'number' ? delay : 0;
    if (typeof fn !== 'function') {
        throw new TypeError('Expected a function');
    }
    let last = 0;

    return function () {
        const now = Date.now()
        if (now - last > delay) {
            last = now
            fn.apply(this, arguments)
        }
    }
}


export function debounce(fn, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay);
    };
}