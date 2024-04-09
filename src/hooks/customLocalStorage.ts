export const customLocalStorage = {
    setItem: (key, value) => {
        let valueToStore = value;

        if (
            typeof value === 'undefined' ||
            typeof value === 'function' ||
            typeof value === 'symbol'
        ) {
            // 如果值为 undefined、函数或符号，则转换为 null
            valueToStore = null;
        } else if (value instanceof Date) {
            // 如果值为日期对象，则转换为 ISO 格式字符串
            valueToStore = value.toISOString();
        } else if (
            Number.isNaN(value) ||
            value === Infinity ||
            value === -Infinity
        ) {
            // 处理 NaN、Infinity 和 -Infinity
            valueToStore = String(value);
        } else if (value instanceof Map || value instanceof Set) {
            // 将 Map 和 Set 转换为数组再存储
            valueToStore = Array.from(value);
        }

        localStorage.setItem(key, JSON.stringify(valueToStore));
    },
    getItem: (key) => {
        const storedValue = localStorage.getItem(key);

        if (!storedValue) {
            return null;
        }

        let parsedValue;
        try {
            parsedValue = JSON.parse(storedValue);
        } catch (error) {
            return storedValue; // 返回原始字符串数据
        }

        if (parsedValue === null) {
            return undefined; // 处理存储值为 null 的情况
        } else if (
            typeof parsedValue === 'string' &&
            new Date(parsedValue) !== 'Invalid Date'
        ) {
            return new Date(parsedValue); // 将字符串转换为日期对象
        }

        return parsedValue;
    },
};
