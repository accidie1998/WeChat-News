class DBPost {
  constructor(recommendId) {
    this.storageKeyName = "recommendList";
    this.recommendId = recommendId;
  }
  /*得到全部文章信息*/
  getAllpostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').recommendlist;
      this.execeSetStorageSync(res);
    }
    return res;
  }
  /*初始化缓存数据*/
  execeSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }

  /**获取指定id号的文章数据 */
  getRecommendItemById() {
    var recommendsData = this.getAllpostData();
    var len = recommendsData.length;
    for (var i = 0; i < len; i++) {
      if (this.recommendId == recommendsData[i].recommendId) {
        return {
          index: i,
          data: recommendsData[i]
        }
      }
    }
  }

  //更新本地的点赞、评论信息、收藏、关注
  updateRecommendData(category, newComment) {
    var itemData = this.getRecommendItemById(),
      recommendData = itemData.data,
      allRecommendData = this.getAllpostData();
    switch (category) {
      case 'follow':
        //处理关注
        if (!recommendData.followStatus) {
          //如果当前状态是未关注
          recommendData.followStatus = true;
          recommendData.followedStatus = true;
        } else {
          //如果当前状态是关注
          recommendData.followStatus = false;
          recommendData.followedStatus = false;
        }
        break;
      case 'collect':
        //处理收藏
        if (!recommendData.collectionStatus) {
          //如果当前状态是未收藏
          recommendData.collectionNum++;
          recommendData.collectionStatus = true;
        } else {
          //如果当前状态是收藏
          recommendData.collectionNum--;
          recommendData.collectionStatus = false;
        }
        break;
      case 'up':
        if (!recommendData.upStatus) {
          recommendData.upNum++;
          recommendData.upStatus = true;
        } else {
          recommendData.upNum--;
          recommendData.upStatus = false;
        }
        break;
      case 'comment':
        recommendData.comments.push(newComment);
        recommendData.commentNum++;
        break;
      default:
        break;
    }
    //更新缓存数据库
    allRecommendData[itemData.index] = recommendData;
    this.execeSetStorageSync(allRecommendData);
    return recommendData;
  }
  //关注
  follow() {
    return this.updateRecommendData('follow');
  }

  //收藏
  collect() {
    return this.updateRecommendData('collect');
  }


  //点赞
  up() {
    return this.updateRecommendData('up');
  }

  /*发表评论*/
  newComment(newComment) {
    this.updateRecommendData('comment', newComment);
  }

  //获取文章的评论数据
  getCommentData() {
    var itemData = this.getRecommendItemById().data;
    itemData.comments.sort(this.compareWithTime); //按时间降序
    var len = itemData.comments.length,
      comment;
    var util = require('../utils/util.js');
    for (var i = 0; i < len; i++) {
      // 将comment中的时间戳转换成可阅读格式
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }
  compareWithTime(value1, value2) {
    return parseFloat(value2.create_time) - parseFloat(value1.create_time);
  }
};


class DBVideo {
  constructor(videoId) {
    this.storageKeyName = "videoList";
    this.videoId = videoId;
  }
  /*得到全部文章信息*/
  getAllvideoData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').videolist;
      this.execeSetStorageSync(res);
    }
    return res;
  }
};
export {
  DBPost,
  DBVideo
};