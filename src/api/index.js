import ywzRequest from '@/utils/axios.ts';

export function getTimeWeather() {
    return ywzRequest({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?key=1cf811c466b5081ce23e9acb13d8367f&city=440100&extensions=base`,
        method: 'GET',
    });
}

export function getTableData() {
    return ywzRequest({
        url: '/data/list',
        method: 'GET',
    });
}

export function getTreeData() {
    return ywzRequest({
        url: '/data/tree',
        method: 'GET',
    });
}

export function mergeFile(data) {
    return ywzRequest({
        url: 'http://localhost:3306/api/merge_chunk',
        method: 'POST',
        data,
    });
}
