export function lineData(xAxisData, seriesData) {
  return {
    tooltip: {
      trigger: 'axis',
      extraCssText: 'width:100px;height:65px;',
      formatter: `
      <div>
        <div
          style='
            color: #758a99;
            font-size: 13px;
          '
        >
          {b}
        </div>
        <div style='display:flex;justify-content:space-between; margin-top: 5px;'>
          <div
            style='
              display: inline-block;   
              color: #177cb0;
            '
            >●</div>
          <span>{c}</span>
        </div>
        
      </div>
      `,
      textStyle: {
        align: 'center',
        fontFamily: 'sans-serif',
      },
    },
    grid: {
      x: '50',
      y: '8',
      x2: '30',
      y2: '50',
    },
    dataZoom: {
      type: 'slider',
      start: 0,
      end: 100,
      bottom: '5',
      height: 20,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: { show: false },
      nameLocation: 'middle',
    },
    yAxis: {
      type: 'value',
      minInterval: 1000,
    },
    series: [
      {
        showSymbol: false,
        data: seriesData,
        type: 'line',
        lineStyle: {
          shadowColor: '#e9f1f6',
          shadowOffsetY: 5,
          shadowBlur: 2,
        },
      },
    ],
  }
}


export function pieData(pieData) {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: pieData
      }
    ]
  }
}

export function barData(xAxisData, seriesData) {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: seriesData
      }
    ]
  }
}






export function userData() {
  return {
    title: {
      text: '电影推荐度 TOP10',
      textStyle: {
        fontSize: 17
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      position: ['120', '150']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          'Boys', 
          'Shadowlands',
          'Sirens', 
          'Germinal', 
          'Ghost', 
          'Pretty Woman', 
          'The Pallbearer', 
          'Jane Eyre',
          'Heavy',
          'Emma'
        ],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval:0,//代表显示所有x轴标签显示
          rotate:45, //代表逆时针旋转45度
          color: '#000'
        }

      },
      
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: '#000'
        }
      },
    ],
    series: [
      {
        name: '推荐度',
        type: 'bar',
        barWidth: '30%',
        data: [0.92, 0.85, 0.83, 0.82, 0.79, 0.79, 0.75, 0.74, 0.74, 0.71]
      }
    ]
  }
}
