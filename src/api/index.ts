import ywzRequest from '@/utils/axios';
import { objectToQueryString } from '@/utils';

export function getTimeWeather(data) {
    return ywzRequest({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?${objectToQueryString(
            data,
        )}`,
        method: 'GET',
        // onDownloadProgress(ProgressEvent) {
        //     console.log('进度事件', ProgressEvent);
        // },
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

export function userLogin(data) {
    return ywzRequest({
        url: '/login',
        method: 'POST',
        data,
    });
}

export function userLogout() {
    return ywzRequest({
        url: '/logout',
        method: 'POST',
    });
}

export function getUserDaynamicRoute() {
    return ywzRequest({
        url: '/router',
        method: 'POST',
    });
}

export function getUserDaynamicTestRoute() {
    return ywzRequest({
        url: '/router/test',
        method: 'POST',
    });
}

export function mergeFiles(data) {
    return ywzRequest({
        url: 'http://localhost:3306/api/merge_files',
        method: 'POST',
        data,
    });
}
