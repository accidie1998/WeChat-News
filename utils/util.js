/*
 *根据客户端的时间信息得到发表评论的时间格式
 *多少分钟前，多少小时前，然后是昨天，然后再是月日
 * Para :
 * recordTime - {float} 时间戳
 * yearsFlag -{bool} 是否要年份
 */
function getDiffTime(recordTime, yearsFlag) {
  if (recordTime) {
    recordTime = new Date(parseFloat(recordTime) * 1000);
    var minute = 1000 * 60,
      hour = minute * 60,
      day = hour * 24,
      now = new Date(),
      diff = now - recordTime;
    var result = '';
    if (diff < 0) {
      return result;
    }
    var weekR = diff / (7 * day);
    var dayC = diff / day;
    var hourC = diff / hour;
    var minC = diff / minute;
    if (weekR >= 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (dayC == 1 || (hourC < 24 && recordTime.getDate() != now.getDate())) {
      result = '昨天' + recordTime.format('hh:mm');
      return result;
    }
    else if (dayC > 1) {
      var formate = 'MM-dd hh:mm';
      if (yearsFlag) {
        formate = 'yyyy-MM-dd hh:mm';
      }
      return recordTime.format(formate);
    }
    else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前';
      return result;
    }
    else if (minC >= 1) {
      result = parseInt(minC) + '分钟前';
      return result;
    } else {
      result = '刚刚';
      return result;
    }
  }
  return '';
}


module.exports = {
  getDiffTime: getDiffTime,
}
