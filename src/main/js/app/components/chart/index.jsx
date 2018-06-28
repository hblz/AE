import React from 'react'
import './i18n'
import LineChart from './components/lineChart'
import Time from './components/time'
import './static/styles/index.scss'

const Chart = class extends React.Component {
  static propTypes = {
    value: React.PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  state = {}

  render () {
    return <div>
    </div>
  }
}

Chart.LineChart = LineChart
Chart.Time = Time
export default Chart
