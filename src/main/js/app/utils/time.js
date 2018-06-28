import moment from 'moment'

const API_TIME_FORMATTER = 'YYYY-MM-DDTHH:mm:ss'

export default {
  name: 'time',

  /**
   * 按 API 要求格式化时间
   * @param {string} time 时间
   * @return {string}
   */
  getAPITime (time) {
    return moment(time).format(API_TIME_FORMATTER)
  },

  /**
   * 获取一天的开始时间，eg：2017-05-19 00:00:00
   * @return {number}
   */
  getStartOfDay (time = null) {
    return (time ? moment(time) : moment())
      .startOf('day').valueOf()
  },

  /**
   * 获取结束时间，eg：2017-05-19 23:59:59
   * @return {number}
   */
  getEndOfDay (time = null) {
    return (time ? moment(time) : moment())
      .endOf('day').valueOf()
  },

  /**
   * 获取半年前时间
   * @return {number}
   */
  getHalfAYearAgo () {
    return moment().subtract(6, 'months')
      .hour(0).minute(0).second(0).valueOf()
  }
}
