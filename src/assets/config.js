import * as echarts from 'echarts';

export const hisOption = {
    title: {
        text: '今日&昨日',
        textAlign: 'left',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#ddd',
            },
        },
        backgroundColor: 'rgba(255,255,255,1)',
        padding: [5, 10],
        textStyle: {
            color: '#7588E4',
        },
        extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)',
    },
    legend: {
        right: 20,
        orient: 'vertical',
        data: ['今日', '昨日'],
    },
    xAxis: {
        type: 'category',
        data: [
            '00:00',
            '2:00',
            '4:00',
            '6:00',
            '8:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
        ],
        boundaryGap: false,
        splitLine: {
            show: true,
            interval: 'auto',
            lineStyle: {
                color: ['#D4DFF5'],
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: '#609ee9',
            },
        },
        axisLabel: {
            margin: 10,

            fontSize: 14,
        },
    },
    yAxis: {
        type: 'value',
        splitLine: {
            lineStyle: {
                color: ['#D4DFF5'],
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            lineStyle: {
                color: '#609ee9',
            },
        },
        axisLabel: {
            margin: 10,

            fontSize: 14,
        },
    },
    series: [
        {
            name: '今日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [
                '1200',
                '1400',
                '1008',
                '1411',
                '1026',
                '1288',
                '1300',
                '800',
                '1100',
                '1000',
                '1118',
                '1322',
            ],
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: 'rgba(199, 237, 250,0.5)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(199, 237, 250,0.2)',
                        },
                    ],
                    false,
                ),
            },
            itemStyle: {
                color: '#f7b851',
            },
            lineStyle: {
                width: 3,
            },
        },
        {
            name: '昨日',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [
                '1200',
                '1400',
                '808',
                '811',
                '626',
                '488',
                '1600',
                '1100',
                '500',
                '300',
                '1998',
                '822',
            ],
            areaStyle: {
                color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                        {
                            offset: 0,
                            color: 'rgba(216, 244, 247,1)',
                        },
                        {
                            offset: 1,
                            color: 'rgba(216, 244, 247,1)',
                        },
                    ],
                    false,
                ),
            },
            itemStyle: {
                color: '#58c8da',
            },
            lineStyle: {
                width: 3,
            },
        },
    ],
};

// 访问来源
export const pieOption = {
    title: {
        text: '访问来源',
        x: 'left',
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
        orient: 'vertical',
        bottom: 'bottom',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            label: {
                show: true,
            }, //是否显示视觉引导线及文字
            data: [
                {
                    value: 335,
                    name: '直接访问',
                    itemStyle: {
                        color: '#ffa800',
                    },
                },
                {
                    value: 310,
                    name: '邮件营销',
                    itemStyle: {
                        color: '#b250ff',
                    },
                },
                {
                    value: 234,
                    name: '联盟广告',
                    itemStyle: {
                        color: '#4f9aff',
                    },
                },
                {
                    value: 135,
                    name: '视频广告',
                    itemStyle: {
                        color: '#4bf3ff',
                    },
                },
                {
                    value: 1548,
                    name: '搜索引擎',
                    itemStyle: {
                        color: '#ee6378',
                    },
                },
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
};

// 访问趋势
export const lineOption = {
    title: {
        text: '访问趋势',
        x: 'left',
    },
    grid: {
        bottom: 20,
    },
    tooltip: {
        trigger: 'axis',
    },
    xAxis: [
        {
            type: 'category',
            data: [
                '2023-01',
                '2023-02',
                '2023-03',
                '2023-04',
                '2023-05',
                '2023-06',
            ],
            axisLine: {
                lineStyle: {
                    color: '#999',
                },
            },
            axisLabel: {
                interval: 4,
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            splitNumber: 4,
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#DDD',
                },
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#333',
                },
            },
            nameTextStyle: {
                color: '#999',
            },
            splitArea: {
                show: false,
            },
        },
    ],
    series: [
        {
            name: 'PV',
            type: 'line',
            data: [23, 60, 20, 36, 23, 85],
            lineStyle: {
                normal: {
                    width: 8,
                    color: {
                        type: 'linear',

                        colorStops: [
                            {
                                offset: 0,
                                color: '#A9F387', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#48D8BF', // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    },
                    shadowColor: 'rgba(72,216,191, 0.3)',
                    shadowBlur: 10,
                    shadowOffsetY: 20,
                },
            },
            itemStyle: {
                normal: {
                    color: '#fff',
                    borderWidth: 10,
                    /*shadowColor: 'rgba(72,216,191, 0.3)',
                shadowBlur: 100,*/
                    borderColor: '#A9F387',
                },
            },
            smooth: true,
        },
    ],
};

// 成交占比
export const barOption = {
    title: {
        text: '成交占比',
        x: 'left',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            textStyle: {
                color: '#fff',
            },
        },
    },
    grid: {
        borderWidth: 0,
        top: 60,
        bottom: 20,
        textStyle: {
            color: '#fff',
        },
    },
    legend: {
        textStyle: {
            color: '#90979c',
        },
        data: ['成交量（万方）', '成交均价（万元/平分）'],
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['2011', '2012', '2013', '2014', '2015', '2016'],
        },
    ],
    yAxis: [
        {
            type: 'value',
            show: false,
        },
    ],
    series: [
        {
            name: '成交量（万方）',
            type: 'bar',
            stack: '总量',
            barMaxWidth: 30,
            barGap: '0%',
            itemStyle: {
                normal: {
                    color: 'rgba(254,191,7,1)',
                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                        },
                        position: 'insideTop',
                        formatter: function (p) {
                            return p.value > 0 ? p.value : '';
                        },
                    },
                },
            },
            data: [1729, 1937, 1279, 975, 2488, 1374],
        },

        {
            name: '成交均价（万元/平分）',
            type: 'line',
            stack: '总量',
            symbolSize: 20,
            symbol: 'circle',
            itemStyle: {
                normal: {
                    color: 'rgba(153,153,153,1)',
                    barBorderRadius: 0,
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (p) {
                            return p.value > 0 ? p.value : '';
                        },
                    },
                },
            },
            data: [2.23, 2.25, 2.41, 2.72, 3.23, 3.83],
        },
    ],
};
