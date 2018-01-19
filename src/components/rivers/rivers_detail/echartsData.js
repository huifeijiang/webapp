export const setEchartOption = function(dom, type, temData, date, echarts){
    var yType = '';
    var data = [];
    var text = '流速';
    var max = 15;
    var markLine = {
        data: [
           {
                name: '标准值',
                yAxis: 99999,
                label:{
                    normal:{
                        show:true,
                        position:'middle',
                        formatter:'标准值:>{c}'
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#b22'
                    }
                }
            }
        ]
    }  
    for(let i = 0;i<temData.length;i++){
        if(temData[i] == null) temData[i] = 0;
    }        
    switch(type){
        case '流速':
            yType = 'M/S';  
            // data = [1.200, 0.124, 0.900,3.600, 1.200,12.600];  
            data = temData;
            max = 30;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            text = '流速';
            break;
        case '透明度':
            yType = 'cm';    
            // data = [25,25,10,8,8,9]; 
            data = temData; 
            markLine.data[0].yAxis =  25;
            max = 30;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            text = '透明度';
            break;
        case '溶解氧':
            yType = 'mg/L';   
            // data = [3.81,5.90,1.31,1.31,0.55,0.29];
            data = temData; 
            markLine.data[0].yAxis =  2;
            max = 10;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            text = '溶解氧';
            break;
        case '氧化还原电位':
            yType = 'mV';        
            // data = [367,475,411,454,387,223];
            data = temData; 
            markLine.data[0].yAxis =  50;
            text = '氧化还原电位';
            max = 500;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            break;
        case '氨氮':
            yType = 'mg/L';     
            // data = [5.69,6.24,17.28,6.99,20.81,11.56];
            data = temData; 
            markLine.data[0].yAxis =  8;
            markLine.data[0].label.normal.formatter = '标准值:<{c}'; 
            text = '氨氮';
            max = 25;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            break;
        case '化学需氧量':
            yType = 'mg/L';        
            // data = [26.6,12.4,34.5,41.5,45.4,50.5];
            data = temData; 
            markLine.data[0].yAxis =  40;
            markLine.data[0].label.normal.formatter = '标准值:<{c}'; 
            text = '化学需氧量';
            max = 55;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            break;
        case '总磷':
            yType = 'mg/L';     
            // data = [1.780,4.780,1.326,0.895,3.515,2.282];
            data = temData; 
            markLine.data[0].yAxis = 0.4;
            markLine.data[0].label.normal.formatter = '标准值:<{c}'; 
            text = '总磷';
            max = 5;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            break;
        case '氟化物':
            yType = 'mg/L';   
            // data = [1.20,0.60,1.70,0.50,1.27,0.57];
            data = temData; 
            markLine.data[0].yAxis = 1.5;
            markLine.data[0].label.normal.formatter = '标准值:<{c}'; 
            text = '氟化物';
            max = 2;
            for(let i = 0;i<temData.length;i++){
                max = Math.max(max,temData[i]);
            }
            break;
    }

    dom.setOption({
        title: {
            text: text,
            textStyle:{
              color:'#50A2D6'  
            },
            left:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
            name:'17年',
            type: 'category',
            nameRotate:45,
            nameLocation:'end',
            data: date,
            axisLine:{
                show:true,
                lineStyle:{
                    color:'#6a6e7b'
                }
            },
            axisTick:{
                show:false
            },
            axisLabel: {
                rotate: 45,
            },
        },
       
        yAxis: {
            max:max,
            name:yType,
            axisLine:{
                lineStyle:{
                    color:'#6a6e7b'
                }
            },
            splitLine:{
                lineStyle:{
                    color:'#6a6e7b',
                    type:'dashed'
                }
            },
             axisTick:{
                show:false
            }
        },
        series: [
            {
                name: '温度',
                type: 'line',
                itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default',
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                  offset: 0, color: 'rgba(48,170,253,1)' // 0% 处的颜色
                                }, {
                                  offset: .9, color: 'rgba(48,170,253,0)' // 100% 处的颜色
                                }], false)
                            }
                            
                        }
                        
                    },
                data: data,
                color:['#54A4D7'],
                markLine: markLine
            }
        ]
    })
};

