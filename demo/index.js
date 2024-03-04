export function throttle(fn, delay, options) {
    let last = 0;
    let timer = null;
    return function (...args) {
        const now = Date.now();
        if (options && options.leading) {
            if (now - last > delay) {
                last = now;
                fn.apply(this, args);
            }
        } else {
            if (last && now < last + delay) {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    last = now;
                    fn.apply(this, args);
                }, delay);
            }

        }

    }
}