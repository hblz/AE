import React, { PropTypes } from 'react'
import autobind from 'core-decorators/lib/autobind'
import { Form, DatePicker, Button, Icon, Col, message } from 'antd'
import moment from 'moment'
import i18n from 'i18n'
const FormItem = Form.Item
const ButtonGroup = Button.Group

const YESTERDAY = moment().subtract(1, 'd').format('YYYY-MM-DD')
const TODAY = moment().format('YYYY-MM-DD')
const WEEKAGO = moment().subtract(7, 'd').format('YYYY-MM-DD')
const MONTHAGO = moment().subtract(30, 'd').format('YYYY-MM-DD')
/*    使用说明
  需传入的props如下,以下参数都是必传
  eg:
  let opt = {
    changeTimeCondition: func,// 条件更改后执行的方法
    searchParams: {
      timeSoltTypes: [1,2,3,4] // 需要显示的时间段  1:昨天，2:今天,3:最近7天,4:最近30天,
      timeSlotType: 1,当前作用时间段// 1:昨天，2:今天,3:最近7天,4:最近30天,
      type: 1, // 1:按时，2：按天
      hideType: 2, // 隐藏按钮 1:按时，2：按天, 3: 两者都隐藏, 4: 两者都显示
    }
  }
  */

class TimeComponent extends React.Component {
  static propTypes = {
    searchParams: PropTypes.object.isRequired,
    changeTimeCondition: PropTypes.func
  }
  constructor () {
    super()
    this.state = {
    }
    this.t = i18n.getFixedT(null, 'chart')
  }
  @autobind
  onDatepickerChange (field, value) {
    let startTemp = this.props.searchParams.beginTime
    let endTemp = this.props.searchParams.endTime
    if (field === 'beginTime') {
      startTemp = value === null ? value : moment(value).format('YYYY-MM-DD')
      if (!value === null && !moment(startTemp).isSame(moment(endTemp)) && !moment(startTemp).isBefore(moment(endTemp))) {
        const { t } = this
        message.error(t('beginltEnd'))
        return
      }
    } else if (field === 'endTime') {
      endTemp = value === null ? value : moment(value).format('YYYY-MM-DD')
    }
    let afterOneYear = moment(startTemp).add(moment.duration(1, 'y'))
    if (moment(this.props.searchParams.endTime).isAfter(afterOneYear)) {
      //  超过一年择将日期设置为一年后的日期
      endTemp = afterOneYear.format('YYYY-MM-DD')
    }
    let hideType = 4
    let tempTimeSlotType = this.timeSlotType(startTemp, endTemp)
    if (value === null) {
      hideType = this.props.searchParams.hideType
    } else {
      if (tempTimeSlotType === 1 || tempTimeSlotType === 2) {
        hideType = 2
      }
    }
    let option = {
      beginTime: startTemp,
      endTime: endTemp,
      timeSlotType: tempTimeSlotType,
      hideType: hideType,
      type: tempTimeSlotType === 4 || typeof (tempTimeSlotType) === 'undefined' ? 2 : 1
    }
    this.props.changeTimeCondition(option)
  }
  @autobind
  timeSlotType (start, end) {
    let type = undefined
    if (start === end && start === YESTERDAY) {
      type = 1
    } else if (start === end && start === TODAY) {
      type = 2
    } else if (start >= WEEKAGO && end <= TODAY) {
      type = 3
    } else if (start >= MONTHAGO && end <= TODAY) {
      type = 4
    }
    return type
  }
  // 时间段点击事件
  @autobind
  timeSlotChange (v, e) {
    let startTemp = TODAY
    let endTemp = TODAY
    let type = 1
    let hideType = 4
    if (v === 1) {
      startTemp = YESTERDAY
      endTemp = YESTERDAY
      hideType = 2
    } else if (v === 2) {
      startTemp = TODAY
      hideType = 2
    } else if (v === 3) {
      startTemp = WEEKAGO
    } else if (v === 4) {
      startTemp = MONTHAGO
      type = 2
    }
    let option = {
      beginTime: startTemp,
      endTime: endTemp,
      timeSlotType: v,
      hideType: hideType,
      type: type
    }
    this.props.changeTimeCondition(option)
  }
  @autobind
  disabledStartDate (startValue) {
    if (!startValue || !this.props.searchParams.endTime) {
      return false
    }
    if (this.props.searchParams.endTime < TODAY) {
      return startValue.getTime() > moment().hour(23).minute(59).second(59)
    }
    return startValue.getTime() > moment().hour(23).minute(59).second(59) || startValue.getTime() > moment(this.props.searchParams.endTime)
  }
  @autobind
  disabledEndDate (endValue) {
    if (!endValue || !this.props.searchParams.beginTime) {
      return false
    }
    return endValue.getTime() > moment().hour(23).minute(59).second(59) || endValue.getTime() < moment(this.props.searchParams.beginTime)
  }
  @autobind
  typeChange (v, e) {
    let tempTimeSlotType = this.timeSlotType(this.props.searchParams.beginTime, this.props.searchParams.endTime)
    let hideType = 4
    if (tempTimeSlotType === 1 || tempTimeSlotType === 2) {
      hideType = 2
    }
    let option = {
      beginTime: this.props.searchParams.beginTime,
      endTime: this.props.searchParams.endTime,
      timeSlotType: this.props.searchParams.timeSlotType,
      hideType: hideType,
      type: v
    }
    this.props.changeTimeCondition(option)
  }
  _getHideType = () => {
    const { t } = this
    return this.props.searchParams.hideType === 2 ? <Form inline>
          <FormItem>
            <ButtonGroup>
              <Button className={this.props.searchParams.type === 1 ? 'time-button selected' : 'time-button'} type='ghost' onClick={this.typeChange.bind(this, 1)}>
                <Icon type='clock-circle-o' />{t('byHour')}
              </Button>
            </ButtonGroup>
          </FormItem>
        </Form> : this.props.searchParams.hideType === 1 ? <Form inline>
          <FormItem>
            <ButtonGroup>
              <Button className={this.props.searchParams.type === 2 ? 'time-button selected' : 'time-button'} type='ghost' onClick={this.typeChange.bind(this, 2)}>
                <Icon type='calendar' />{t('byDay')}
              </Button>
            </ButtonGroup>
          </FormItem>
        </Form> : this.props.searchParams.hideType === 4 ? <Form inline>
          <FormItem>
            <ButtonGroup>
              <Button className={this.props.searchParams.type === 1 ? 'time-button selected' : 'time-button'} type='ghost' onClick={this.typeChange.bind(this, 1)}>
                <Icon type='clock-circle-o' />{t('byHour')}
              </Button>
              <Button className={this.props.searchParams.type === 2 ? 'time-button selected' : 'time-button'} type='ghost' onClick={this.typeChange.bind(this, 2)}>
                <Icon type='calendar' />{t('byDay')}
              </Button>
            </ButtonGroup>
          </FormItem>
        </Form> : <Form inline>{}</Form>
  }
  _getTimeSole = () => {
    if (this.props.searchParams.timeSlotTypes.length === 0) {
      return null
    }
    const { t } = this
    const types = ['', t('yesterday'), t('today'), t('last7days'), t('last30Days')]
    let array = []
    for (let [k, v] of Object.entries(this.props.searchParams.timeSlotTypes)) {
      array.push(<FormItem key={k}>
            <a href='javascript://' className={this.props.searchParams.timeSlotType !== v ? 'time-not-active' : ''} onClick={this.timeSlotChange.bind(this, v)}>{types[v]}</a>
          </FormItem>)
    }
    return array
  }
  render () {
    const { t } = this
    return (
      <div className='chart-time'>
        <Form inline>
          <FormItem>
            <span>{t('selectTime')}</span>
          </FormItem>
          {
            this._getTimeSole()
          }
          <FormItem>
            <span className='margin-left-3em'>{t('customDate')}</span>
          </FormItem>
          <FormItem>
            <Col>
              <DatePicker disabledDate={this.disabledStartDate}
              value={this.props.searchParams.beginTime}
              format='yyyy-MM-dd'
              placeholder={t('startDate')}
              onChange={this.onDatepickerChange.bind(this, 'beginTime')}/>
            </Col>
          </FormItem>
          <FormItem>
            <span>{t('to')}</span>
          </FormItem>
          <FormItem>
            <Col>
              <DatePicker disabledDate={this.disabledEndDate}
              value={this.props.searchParams.endTime}
              format='yyyy-MM-dd'
              placeholder={t('endDate')}
              onChange={this.onDatepickerChange.bind(this, 'endTime')}/>
            </Col>
          </FormItem>
        </Form>
          {
           this._getHideType()
          }
      </div>
    )
  }
}
export default TimeComponent
