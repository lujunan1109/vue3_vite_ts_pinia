import ywzRequest from '@/utils/axios.ts';

export function getTimeWeather() {
    return ywzRequest({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?key=1cf811c466b5081ce23e9acb13d8367f&city=440100&extensions=base`,
        method: 'GET',
    });
}
