import React, { PropTypes } from 'react'
import Charts from 'components/echarts'
import i18n from 'i18n'
/**
 * 父组件需出入chartData（必须）,yNames两个props
 * eg:
 * let chartData = []
 *  chartData.push({
        names: names1,
        xDatas: xDatas,
        yDatas: [data1, data2, data3] // 3条折线
      })
      chartData.push({
        names: names2,
        xDatas: xDatas,
        yDatas: [data3, data4, data5]
      })
 *   let opt = {
 *     chartData：chartData // 数据数组， 同一页面需要多少个图表那么charData数组就是多少个；同一个图表需要多条折线更改yDatas数组即可
 *     yNames: ['个'，'元'] //表格Y轴单位
 *   }
 */
class ChartComponent extends React.Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired,
    yNames: PropTypes.array,
    titles: PropTypes.array
  }
  constructor () {
    super()
    this.state = {}
  }
  _getLine = (items) => {
    let opts = []
    items.names.map(function (item, key) {
      opts.push(<Charts.Line key={key} name={item} data={items.yDatas[key]}/>)
    })
    return opts
  }
  render () {
    const t = i18n.getFixedT(null, 'chart')
    const _self = this
    return (
      <div className='chart-div'>
        {
          this.props.chartData.length !== 0 ? Object.entries(this.props.chartData).map(function (item, key) {
            return (
              <div key={key}>
                <span className='chart-title'>{_self.props.titles !== undefined && _self.props.titles[key] !== undefined ? _self.props.titles[key] : ''}</span>
                <Charts key={key}
                  tooltip={{trigger: 'axis'}}
                  legend={{
                    data: item[1].names
                  }}
                  xAxis={[
                    {
                      type: 'category',
                      boundaryGap: false,
                      data: item[1].xDatas
                    }
                  ]}
                  yAxis={[
                    {
                      name: _self.props.yNames !== undefined && _self.props.yNames[key] !== undefined ? _self.props.yNames[key] : '',
                      type: 'value',
                      axisLabel: {
                        formatter: '{value}'
                      }
                    }
                  ]}
                  noDataLoadingOption = {{
                    text: t('noData'),
                    effect: 'bubble'
                  }}
                >
                {_self._getLine(item[1])}
                </Charts>
              </div>
            )
          }) : <Charts
            tooltip={{trigger: 'axis'}}
            legend={{
              data: []
            }}
            xAxis={[
              {
                type: 'category',
                boundaryGap: false,
                data: []
              }
            ]}
            yAxis={[
              {
                name: '',
                type: 'value',
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ]}
            noDataLoadingOption = {{
              text: t('noData'),
              effect: 'bubble'
            }}
          >
          <Charts.Line name={''} data={[]}/>
          </Charts>
        }
      </div>
    )
  }
}
export default ChartComponent
