// 获取dom
let inputData = document.querySelector('#data-input');
let inputTitle = document.querySelector('#title-input');
let inputTuli = document.querySelector('#tuli-input');
let btn = document.querySelector('#submit-btn');


// 中文省份
let province = {}
let myTitle = "[标题]Business Concentration in Kingsware"
let myTuli = "[图例]Business data:"

// 省份拼音映射中文对象
let obj = {
    'Anhui': "安徽",
    'Beijing': "北京",
    'Central and Western': "",
    'Changhua': "",
    'Chiayi': "",
    'Chiayi City': "",
    'Chongqing': "重庆",
    'Eastern': "",
    'Fujian': "福建",
    'Gansu': "甘肃",
    'Guangdong': "广东",
    'Guangxi': "广西",
    'Guizhou': "贵州",
    'Hainan': "海南",
    'Hebei': "河北",
    'Heilongjiang': "黑龙江",
    'Henan': "河南",
    'Hsinchu': "",
    'Hsinchu City': "",
    'Hualien': "台湾",
    'Hubei': "湖北",
    'Hunan': "湖南",
    'Inner Mongol': "内蒙古",
    'Inner Mongolia': "内蒙古",
    'Islands': "离岛",
    'Jiangsu': "江苏",
    'Jiangxi': "江西",
    'Jilin': "吉林",
    'Kaohsiung City': "",
    'Keelung City': "",
    'Kinmen': "",
    'Kowloon City': "",
    'Kwai Tsing': "桂青",
    'Kwun Tong': "观塘",
    'Liaoning': "辽宁",
    'Lienchiang': "连江",
    'Macau': "澳门",
    'Miaoli': "苗栗",
    'Nantou': "南头",
    'New Taipei City': "",
    'Ningxia': "宁夏",
    'North': "北",
    'Paracel Islands': "西沙群岛",
    'Penghu': "",
    'Pingtung': "",
    'Qinghai': "青海",
    'Sai Kung': "",
    'Sha Tin': "香港",
    'Shaanxi': "陕西",
    'Sham Shui Po': "",
    'Shandong': "山东",
    'Shanghai': "上海",
    'Shanxi': "山西",
    'Sichuan': "四川",
    'Southern': "南方",
    'Tai Po': "香港",
    'Taichung City': "",
    'Tainan City': "",
    'Taipei City': "",
    'Taitung': "",
    'Taoyuan': "",
    'Tianjin': "天津",
    'Tibet': "",
    'Tsuen Wan': "香港",
    'Tuen Mun': "",
    'Wan Chai': "",
    'Wong Tai Sin': "",
    'Xinjiang': "新疆",
    'Xizang': "西藏",
    'Yau Tsim Mong': "香港",
    'Yilan': "",
    'Yuen Long': "",
    'Yunlin': "",
    'Yunnan': "云南",
    'Zhejiang': "浙江"
}

let obj2 = {}

let valueMax = 0;



// 点击按钮 打印 inputData 中的 value
btn.addEventListener('click', () => {
    // 如果输入框数据为空, 弹出提示框
    if (inputData.value === '') return alert('你还没有输入数据');

    // 正则将 inputData 中换行符替换成逗号
    let data = inputData.value.replace(/\n/g, ',');
    // 去掉 data 中的空字符
    data = data.replace(/\s/g, '');
    // 在中文和数字中间添加一个逗号
    data = data.replace(/([\u4e00-\u9fa5])([0-9])/g, '$1:$2');
    // 将 data 转换成数组
    data = data.split(',');
    // 将 data 中数组变成对象
    let obj = {};
    for (let i = 0; i < data.length; i++) {
        let arr = data[i].split(':');
        obj[arr[0]] = arr[1];
    }

    // 遍历出 obj 中最大的 value
    for (let key in obj) {
        if (obj[key] > valueMax) {
            console.log("@", obj[key]);
            valueMax = obj[key];
        }
    }
    console.log("valueMax", valueMax);


    myTitle = inputTitle.value == false ? myTitle : inputTitle.value
    myTuli = inputTuli.value == false ? myTuli : inputTuli.value
    // console.log(inputTitle.value == false);

    obj2 = obj;
    console.log("btn", obj2);
    CreateMap(obj)


})

function addElement(parentId, elementTag, elementId, className, html, width, height) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.setAttribute('class', className);
    newElement.innerHTML = html;

    if (width != undefined || height != undefined) {
        var style = "";
        if (width != undefined && width != "") {
            style += "width:" + width + "px;"
        }

        if (height != undefined && width != height) {
            style += "height:" + height + "px;"
        }

        newElement.setAttribute('style', style);
    }

    p.appendChild(newElement);
}

let test = {}

var lang = 1;
var categoryLabel = 'Category';

function CreateMap(newData) {
    console.log("CreateMap", obj2);
    newData == undefined ? newData = {} : newData = newData;

    var htmlTemplate = "<div id='vis-BusinessConcentration'></div>";

    var width = "100%";

    var height = "100%";

    addElement("BusinessConcentration", "div", "vis", "visualization-container", htmlTemplate, width, height);

    if ("BusinessConcentration" == "RiskRatingBarometerIndustry" || "BusinessConcentration" == "RiskRatingBarometerSector" || "BusinessConcentration" == "BusinessConcentration") {
        setTimeout(createChart(newData), 1000);
    } else {
        createChart('newData');
    }

    function createChart(name) {
        // console.log(name['湖南'], obj);
        // console.log(name['安徽'] == undefined);
        // console.log("createChart", name);
        if (typeof window['Highcharts'] !== 'undefined') {
            // console.log("valueMax", valueMax == 0 ? 20 : valueMax * 1);
            var optionsNew = {
                "credits": {
                    "text": "Cotton Growing in China",
                    "href": "https://www.ibisworld.com",
                    "enabled": false
                },
                "series": [{
                    "allAreas": true,
                    "data": [{
                        "name": "Anhui",
                        "value": name['安徽'] == undefined ? 0 : name['安徽']
                    }, {
                        "name": "Beijing",
                        "value": name['北京'] == undefined ? 0 : name['北京']
                    }, {
                        "name": "Chongqing",
                        "value": name['重庆'] == undefined ? 0 : name['重庆']
                    }, {
                        "name": "Fujian",
                        "value": name['福建'] == undefined ? 0 : name['福建']
                    }, {
                        "name": "Gansu",
                        "value": name['甘肃'] == undefined ? 0 : name['甘肃']
                    }, {
                        "name": "Guangdong",
                        "value": name['广东'] == undefined ? 0 : name['广东']
                    }, {
                        "name": "Guangxi",
                        "value": name['广西'] == undefined ? 0 : name['广西']
                    }, {
                        "name": "Guizhou",
                        "value": name['贵州'] == undefined ? 0 : name['贵州']
                    }, {
                        "name": "Hainan",
                        "value": name['海南'] == undefined ? 0 : name['海南']
                    }, {
                        "name": "Hebei",
                        "value": name['河北'] == undefined ? 0 : name['河北']
                    }, {
                        "name": "Heilongjiang",
                        "value": name['黑龙江'] == undefined ? 0 : name['黑龙江']
                    }, {
                        "name": "Henan",
                        "value": name['河南'] == undefined ? 0 : name['河南']
                    }, {
                        "name": "Hubei",
                        "value": name['湖北'] == undefined ? 0 : name['湖北']
                    }, {
                        "name": "Hunan",
                        "value": name['湖南'] == undefined ? 0 : name['湖南']
                    }, {
                        "name": "Inner Mongol",
                        "value": name['内蒙古'] == undefined ? 0 : name['内蒙古']
                    }, {
                        "name": "Jiangsu",
                        "value": name['江苏'] == undefined ? 0 : name['江苏']
                    }, {
                        "name": "Jiangxi",
                        "value": name['江西'] == undefined ? 0 : name['江西']
                    }, {
                        "name": "Jilin",
                        "value": name['吉林'] == undefined ? 0 : name['吉林']
                    }, {
                        "name": "Liaoning",
                        "value": name['辽宁'] == undefined ? 0 : name['辽宁']
                    }, {
                        "name": "Ningxia",
                        "value": name['宁夏'] == undefined ? 0 : name['宁夏']
                    }, {
                        "name": "Qinghai",
                        "value": name['青海'] == undefined ? 0 : name['青海']
                    }, {
                        "name": "Shaanxi",
                        "value": name['陕西'] == undefined ? 0 : name['陕西']
                    }, {
                        "name": "Shandong",
                        "value": name['山东'] == undefined ? 0 : name['山东']
                    }, {
                        "name": "Shanghai",
                        "value": name['上海'] == undefined ? 0 : name['上海']
                    }, {
                        "name": "Shanxi",
                        "value": name['山西'] == undefined ? 0 : name['山西']
                    }, {
                        "name": "Sichuan",
                        "value": name['四川'] == undefined ? 0 : name['四川']
                    }, {
                        "name": "Tianjin",
                        "value": name['天津'] == undefined ? 0 : name['天津']
                    }, {
                        "name": "Xizang",
                        "value": name['西藏'] == undefined ? 0 : name['西藏']
                    }, {
                        "name": "Xinjiang",
                        "value": name['新疆'] == undefined ? 0 : name['新疆']
                    }, {
                        "name": "Yunnan",
                        "value": name['云南'] == undefined ? 0 : name['云南']
                    }, {
                        "name": "Zhejiang",
                        "value": name['浙江'] == undefined ? 0 : name['浙江']
                    }]
                }, {
                    "allAreas": true,
                    "data": [{
                        "name": "Hong Kong",
                        "value": 0.0
                    }, {
                        "name": "Macau",
                        "value": 0.0,
                        "x": 970,
                        "y": 545
                    }],
                    "type": "mappoint"
                }],
                // 颜色渐变
                "colorAxis": {
                    "min": 0,
                    "max": valueMax == 0 ? 20 : valueMax * 1,
                    // "tickLength": Math.round(valueMax / 4),
                    // "tickInterval": Math.round(valueMax / 4),
                    "tickAmount": 4,
                    'minColor': '#E6E7E8',  //变化初始色
                    // 'maxColor': '#005645'   //变化结束色
                }
            };
            // 990:600 = 1200:x, 求 x
            // 1200 * 600 / 990 = 727.2727272727273

            // 小数取整
            console.log("valueMax", Math.round(valueMax / 4));


            var options = {
                chart: {
                    map: 'countries/cn/custom/cn-all-sar-taiwan',
                    width: 1200,
                    height: 728,
                    marginTop: 40,
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            symbol: 'url(https://my.ibisworld.com/img/download.svg)',
                            x: -10,
                            y: 0,
                            symbolSize: 25,
                            symbolX: 25.0,
                            symbolY: 25.0,
                            menuItems: ['viewFullscreen', 'printChart', 'separator', 'downloadPNG', 'downloadCSV', 'viewData']
                        }
                    },
                    enabled: true
                },

                // 标题名称
                title: {
                    text: myTitle,
                    align: 'center',
                    style: {
                        color: '#333333',
                        fontSize: '16px',
                        lineHeight: '20px',
                        fontWeight: '500',
                        fontFamily: 'Noto Sans, Roboto',
                    },
                    enabled: true,
                },
                // 图例
                legend: {
                    title: {
                        text: myTuli,
                        style: {
                            color: '#333333',
                            fontSize: '14px',
                            lineHeight: '18px',
                            fontWeight: 'normal',
                        },
                    },
                    borderWidth: 0,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    floating: true,
                    layout: 'horizontal',
                    verticalAlign: 'bottom',
                    y: 0,

                    align: 'left',
                },
                credits: {
                    enabled: false
                },

                // 呼出框
                tooltip: {
                    valueDecimals: 1,
                    backgroundColor: '#FFFFFF',
                    borderColor: '#AAA',
                    borderRadius: 10,
                    style: {
                        padding: 0,
                    },
                    useHTML: true,
                    formatter: function () {
                        //console.log(this);
                        return '<div class="map-tooltip">' + '<span style="color:' + this.point.color + '">\u25CF</span><br>' + '<div class="label">' + this.point.name + '<br>' + this.point.value + '</div>' + '</div>';
                    },
                },
                plotOptions: {
                    map: {
                        borderColor: 'white',
                        borderWidth: 1,
                        states: {
                            hover: {
                                color: '#ff5500' // 地图 hover 颜色
                            }
                        },
                        joinBy: ['name', 'name'],
                        dataLabels: {
                            align: 'center',
                            enabled: true,
                            allowOverlap: false,
                            style: {
                                color: '#002F65', // 字体颜色
                                fontSize: '14px',
                                fontWeight: 'normal',
                                textOutline: '1px #FFFFFF' // 描边颜色
                            },
                            formatter: function () {
                                var max = 20
                                    , color = this.point.value < max ? 'black' : 'white';
                                //console.log(this);
                                //return '<span style="color: ' + color + '">' + this.point.properties['postal-code'] + '</span>';      
                                //return '<span style="color: ' + color + '">' + this.point.series.mapData.properties.name + '</span>';   

                                if (this.point.name == 'Norfolk Island' || this.point.name == undefined || this.point.name == 'Bounty Islands' || this.point.name == 'The Snares') {
                                } else if (this.series.mapTitle == 'Australia') {
                                    if (this.point['hc-a2'] == 'CT') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px;">ACT</span><br>';
                                    } else if (this.point['hc-a2'] == 'NS') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px; ">NSW</span><br>';
                                    } else if (this.point['hc-a2'] == 'QL') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">QLD</span><br>';
                                    } else if (this.point['hc-a2'] == 'TS') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">TAS</span><br>';
                                    } else if (this.point['hc-a2'] == 'VI') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">VIC</span><br>';
                                    } else {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">' + this.point['hc-a2'] + '</span><br>';
                                    }
                                } else if (this.series.mapMap.Dublin) {
                                    var point = this.point;
                                    if (this.key == 'Mid-East') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px;">ME</span><br>';
                                    } else if (this.key == 'South-West') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px; ">SW</span><br>';
                                    } else if (this.key == 'South-East') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">SE</span><br>';
                                    } else if (this.key == 'Midland') {
                                        window.setTimeout(function () {
                                            point.dataLabel.attr({
                                                x: 535
                                            });
                                        });
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">MD</span><br>';
                                    } else if (this.key == 'Mid-West') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">MW</span><br>';
                                    } else if (this.key == 'Border') {
                                        window.setTimeout(function () {
                                            point.dataLabel.attr({
                                                y: 175
                                            });
                                        });
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">BO</span><br>';
                                    } else if (this.key == 'West') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">W</span><br>';
                                    } else if (this.key == 'Dublin') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">DU</span><br>';
                                    } else {
                                        return '';
                                    }
                                } else if (this.series.mapMap.Scotland) {
                                    if (this.key == 'Scotland') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px;">SCT</span><br>';
                                    } else if (this.key == 'Wales') {
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px; ">WAL</span><br>';
                                    } else if (this.key == 'East Midlands') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">EMD</span><br>';
                                    } else if (this.key == 'South West') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">SW</span><br>';
                                    } else if (this.key == 'Northern Ireland') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">NIR</span><br>';
                                    } else if (this.key == 'Yorkshire') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">YKS</span><br>';
                                    } else if (this.key == 'North East') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">NE</span><br>';
                                    } else if (this.key == 'North West') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">NW</span><br>';
                                    } else if (this.key == 'South East') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">SE</span><br>';
                                    } else if (this.key == 'West Midlands') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">WMD</span><br>';
                                    } else if (this.key == 'East of England') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">‎UKH</span><br>';
                                    } else if (this.key == 'London') {
                                        return '<span style="color: #002F65; font-weight:bold; font-size:12px; ">‎LDN</span><br>';
                                    } else {
                                        return '';
                                    }
                                } else if (this.series.mapTitle == 'United States of America' || this.series.mapTitle == 'Canada' || this.series.mapTitle == 'China with Hong Kong, Macau, and Taiwan' || this.series.mapTitle == 'New Zealand' || this.series.mapTitle == 'Germany') {
                                    // console.log(this.key, this);
                                    try {
                                        // console.log('城市', this.point.name, obj2[this.point.name], this.point.properties['hc-a2']);
                                        // console.log(this.point.name);
                                        let label = obj[this.point.name];
                                        let number = obj2[label] != undefined ? `: ${obj2[label]}` : '';
                                        let trueLabel = obj2[label] != undefined ? label : '';
                                        console.log("number", obj2[label]);
                                        return '<span style="color: #002F65; font-weight:bold;font-size:12px;">' + label + number + '</span><br>';
                                    } catch (err) {
                                        // console.log('not rendering', this.point.name);
                                    }
                                } else {
                                    return '<span style="color: #002F65; font - weight:bold; font - size:12px; ">' + this.point.name + '</span><br>';
                                }
                            },
                        },
                    },
                },
            };

            if (options.yAxis && options.yAxis.length === 1)
                options.yAxis = options.yAxis[0];
            if (options.xAxis && options.xAxis.length === 1)
                options.xAxis = options.xAxis[0];
            if (options.zAxis && options.zAxis.length === 1)
                options.zAxis = options.zAxis[0];

            Highcharts.merge(true, options, optionsNew);

            if (options && (options.lang || options.global)) {

                Highcharts.setOptions({
                    global: options.global || {},
                    lang: options.lang || {}
                });

            }
            if (1 == 2) {
                Highcharts.setOptions({
                    lang: {
                        decimalPoint: ',',
                        thousandsSep: '.',
                        viewFullscreen: 'Im Vollbildmodus anzeigen',
                        printChart: 'Grafik drucken',
                        downloadPNG: 'PNG-Datei herunterladen',
                        downloadCSV: 'CSV-Datei herunterladen',
                        viewData: 'Datentabelle anzeigen',
                        resetZoom: 'Zoom zurücksetzen',
                        loading: 'Wird geladen …'
                    }
                });
            }

            if ("BusinessConcentration" == "IndustryOutlook" || "BusinessConcentration" == "IndustryTradeBalance") {
                Highcharts.setOptions({
                    lang: {
                        numericSymbols: null
                    }
                });
            }

            var chart = new Highcharts.mapChart('vis-BusinessConcentration', options);

            if (chart) {
                if (chart.options.exporting.buttons.contextButton.menuItems.length == 3) {
                    chart.options.exporting.buttons.contextButton.menuItems[2].text = 'View Data'.toUpperCase();
                }
            }

        }
    }

};
CreateMap(obj, myTitle, myTuli)


let highchartsnamexizang = document.querySelector('.highcharts-name-xizang');
// 修改藏南地图
highchartsnamexizang.attributes[1].value = "M 3390 4059 L 3366 4057 L 3367 4027 L 3331 3974 L 3322 4015 L 3297 4012 L 3295 3963 L 3276 3945 L 3281 3889 L 3247 3853 L 3212 3880 L 3195 3848 L 3171 3837 L 3125 3892 L 3102 3897 L 3091 3928 L 3064 3914 L 3044 3904 L 3042 3884 L 3021 3843 L 2996 3741 L 2937 3712 L 2874 3716 L 2827 3754 L 2785 3792 L 2722 3788 L 2617 3767 L 2507 3708 L 2435 3644 L 2368 3573 L 2271 3564 L 2186 3577 L 2127 3619 L 2064 3644 L 2009 3708 L 1945 3888 L 1878 3905 L 1887 3940 L 1843 3963 L 1821 3989 L 1778 3968 L 1701 4005 L 1660 4008 L 1687 4040 L 1620 4079 L 1547 4075 L 1522 4054 L 1482 4049 L 1429 3997 L 1405 3987 L 1379 3950 L 1363 3948 L 1338 3912 L 1343 3888 L 1322 3888 L 1302 3912 L 1300 3944 L 1333 4006 L 1331 4041 L 1294 4072 L 1244 4052 L 1191 4052 L 1189 4033 L 1133 4053 L 1110 4034 L 1072 4047 L 1039 4045 L 998 4057 L 978 4086 L 924 4114 L 912 4136 L 888 4137 L 860 4100 L 818 4128 L 814 4164 L 794 4149 L 797 4115 L 769 4110 L 754 4175 L 738 4188 L 731 4219 L 712 4204 L 678 4220 L 660 4215 L 610 4238 L 614 4263 L 638 4293 L 618 4309 L 588 4291 L 543 4315 L 533 4338 L 504 4352 L 491 4384 L 469 4397 L 474 4425 L 457 4478 L 417 4494 L 383 4489 L 368 4476 L 342 4488 L 318 4560 L 292 4597 L 274 4590 L 258 4612 L 231 4617 L 185 4686 L 161 4710 L 115 4734 L 123 4758 L 116 4794 L 58 4812 L 25 4832 L 0 4818 L -16 4831 L -40 4781 L -70 4757 L -88 4764 L -101 4821 L -135 4844 L -143 4862 L -211 4912 L -239 4921 L -221 4955 L -250 4976 L -286 5024 L -336 5030 L -365 5056 L -380 5082 L -389 5131 L -409 5161 L -431 5139 L -476 5153 L -474 5193 L -447 5209 L -467 5252 L -443 5292 L -484 5363 L -476 5404 L -484 5432 L -434 5433 L -416 5442 L -414 5401 L -392 5371 L -361 5368 L -349 5389 L -317 5386 L -272 5412 L -262 5434 L -283 5487 L -265 5532 L -333 5581 L -357 5643 L -345 5685 L -340 5763 L -288 5783 L -285 5812 L -234 5824 L -176 5818 L -125 5798 L -83 5848 L -85 5904 L -50 5919 L -53 5936 L -15 5967 L 24 6019 L 50 5989 L 116 5962 L 136 5945 L 155 5963 L 179 5941 L 207 5939 L 238 5914 L 269 5906 L 326 5912 L 347 5937 L 389 5952 L 422 5979 L 472 5960 L 515 5957 L 513 5914 L 533 5892 L 561 5889 L 617 5864 L 674 5856 L 697 5861 L 739 5847 L 811 5874 L 852 5876 L 883 5891 L 927 5897 L 972 5890 L 1000 5862 L 1033 5880 L 1072 5873 L 1106 5894 L 1139 5945 L 1188 5960 L 1327 5956 L 1358 5968 L 1398 5951 L 1465 5952 L 1481 5960 L 1567 5951 L 1610 5925 L 1632 5923 L 1653 5899 L 1701 5886 L 1779 5832 L 1748 5830 L 1731 5817 L 1736 5791 L 1791 5770 L 1761 5700 L 1766 5684 L 1717 5668 L 1707 5640 L 1724 5605 L 1718 5578 L 1759 5565 L 1763 5546 L 1741 5524 L 1751 5437 L 1734 5400 L 1702 5380 L 1715 5336 L 1738 5312 L 1750 5266 L 1779 5249 L 1786 5208 L 1804 5179 L 1825 5174 L 1864 5139 L 1890 5132 L 1921 5150 L 1956 5149 L 1970 5166 L 2003 5161 L 2029 5098 L 2077 5066 L 2104 5034 L 2146 5033 L 2147 5005 L 2195 5004 L 2229 4992 L 2297 4982 L 2299 4965 L 2335 4960 L 2387 4920 L 2431 4927 L 2456 4906 L 2500 4897 L 2542 4906 L 2596 4930 L 2658 4866 L 2657 4845 L 2677 4826 L 2714 4817 L 2742 4780 L 2725 4750 L 2731 4716 L 2746 4699 L 2790 4695 L 2860 4676 L 2871 4640 L 2885 4646 L 2884 4682 L 2873 4693 L 2901 4719 L 2937 4680 L 2996 4665 L 2990 4721 L 3046 4730 L 3066 4724 L 3093 4737 L 3096 4766 L 3118 4776 L 3124 4831 L 3174 4812 L 3193 4833 L 3248 4810 L 3282 4781 L 3283 4758 L 3322 4693 L 3313 4655 L 3340 4603 L 3391 4542 L 3366 4517 L 3343 4537 L 3333 4506 L 3368 4462 L 3360 4442 L 3392 4404 L 3381 4386 L 3387 4340 L 3385 4268 L 3394 4215 L 3375 4157 L 3384 4136 L 3383 4079 L 3390 4059 L 3390 4059 Z"

// 修改地图颜色
let mapBaseColor = document.querySelectorAll('.highcharts-point');
console.log(mapBaseColor.length);

// mapBaseColor.forEach(element => {
//     console.log(element.attributes[0]);
//     element.attributes[0].value = "#ff5500";
// });

// 查询 html 上的字符