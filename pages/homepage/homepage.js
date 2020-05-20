// pages/homepage/homepage.js

import { DBPost } from'../../db/DBPost.js'
import { DBVideo } from '../../db/DBPost.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    controlRecommendFlag: true,
    controlVideoFlag: false,
    videoIndex: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbPost = new DBPost();
    var dbVideo = new DBVideo();
    this.setData({
      recommendList: dbPost.getAllpostData(),
      videoList: dbVideo.getAllvideoData()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 控制切换页推荐
   */
  onRecommendTap: function (event) {
    if (this.data.controlRecommendFlag){
      return;
    }else{
      this.data.controlRecommendFlag = true;
      this.data.controlVideoFlag = false;
    }
    this.setData({
      controlRecommendFlag: this.data.controlRecommendFlag,
      controlVideoFlag:this.data.controlVideoFlag
    })
  },
  /**
 * 控制切换页视频
 */
  onVideoTap: function (event) {
    if (this.data.controlVideoFlag) {
      return;
    } else {
      this.data.controlRecommendFlag = false;
      this.data.controlVideoFlag = true;
    }
    this.setData({
      controlRecommendFlag: this.data.controlRecommendFlag,
      controlVideoFlag: this.data.controlVideoFlag
    })
  },
  /**
   * 跳转到文章详细界面
   */
  onTapToDetail: function (event) {
    var recommendId = event.currentTarget.dataset.recommendId;
    console.log(recommendId);
    wx.navigateTo({
      url: '../recommend-detail/recommend-detail?id=' + recommendId,
    })
  },
  //播放视频
  onVideoPlayTap: function (event) {
    var index = event.currentTarget.dataset['index'];
    console.log("index=" + index);
    console.log("this.data.videoIndex=" + this.data.videoIndex);
    if (!this.data.videoIndex) { // 没有播放时播放视频
      this.setData({
        videoIndex: index
      })
      var videoContext = wx.createVideoContext('video' + index)
      console.log("videoContext=" + videoContext);
      videoContext.play()
    } else {
      //停止正在播放的视频
      var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex)
      videoContextPrev.stop()
      //将点击视频进行播放
      this.setData({
        videoIndex: index
      })
      var videoContextCurrent = wx.createVideoContext('video' + index)
      videoContextCurrent.play()
    }
  },
})