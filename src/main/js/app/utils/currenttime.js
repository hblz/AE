'use strict';
import moment from 'moment';

export default {

  /**
   * @param  {string}  time 时间
   * @return {string}  格式“yyyy-MM-dd HH:MM:SS”
   */
  getFormatDate: function (date) {
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },

  /**
   * @param  {string}  time 时间 ,转成当前的时区的时间
   * @return {string}  格式“yyyy-MM-dd HH:MM:SS”
   */
  getFormatDateStr: function (date) {
    if(!date){
      return date;
    }
    date = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return date;
  },
  /**
 * 获取开始时间
 * @return {number}
 */
  getBeginTime: (time = null, format) => {
    return format ? (time ? moment(time) : moment())
      .startOf('day').format(format) : (time ? moment(time) : moment())
      .startOf('day').valueOf()
  },

/**
 * 获取结束时间
 * @return {number}
 */
  getEndTime: (time = null, format) => {
    return format ? (time ? moment(time) : moment())
      .endOf('day').format(format) : (time ? moment(time) : moment())
      .endOf('day').valueOf()
  }
}
