// pages/recommend-detail/recommend-detail.js
import {
  DBPost
} from '../../db/DBPost.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyboardInputValue: '',
    //控制是否显示图片选择板
    sendMoreMsgFlag: false,
    //保存已选择的照片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var recommendId = options.id;
    console.log("recommendId=" + recommendId);
    this.dbPost = new DBPost(recommendId);
    this.recommendData = this.dbPost.getRecommendItemById().data;
    var comments = this.dbPost.getCommentData();
    console.log("comments=" + comments);
    // 绑定数据
    this.setData({
      recommend: this.recommendData,
      comments:comments
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 用户点击关注
   */
  onFollowTap: function(event) {
    var newData = this.dbPost.follow();
    this.setData({
      'recommend.followStatus': newData.followStatus
    })
    //交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "关注成功" : "已取消关注",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  /**
   * 用户点击点赞
   */
  onUpTap: function(event) {
    var newData = this.dbPost.up();
    this.setData({
      'recommend.upStatus': newData.upStatus,
      'recommend.upNum': newData.upNum
    })
  },

  /**
   * 用户点击收藏
   */
  onCollectTap: function(event) {
    //dbPost对象已在onLoad函数里被保存到了this变量中，无须再次实例化
    var newData = this.dbPost.collect();
    //重新绑定数据。注意，不要将整个newData全部作为setData的参数，
    //应当有选择地更新部分数据
    this.setData({
      'recommend.collectionStatus': newData.collectionStatus,
      'recommend.collectionNum': newData.collectionNum
    })
    //交互反馈
    wx.showToast({
      title: newData.collectionStatus ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },
  //获取用户输入数据
  bindCommentInput: function (event) {
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
  },

  /**
   * 用户点击发布评论
   */
  submitComment: function (event) {
    var imgs = this.data.chooseFiles;
    var newData = {
      avatar: "L.J.H.98",
      avatar_img: "/images/avatar/me.png",
      create_time: new Date().getTime() / 1000,
      content_txt: this.data.keyboardInputValue,
    };
    if (!newData.content_txt) {
      return;
    }
    //保存新评论到缓存数据库中
    this.dbPost.newComment(newData);

    //显示操作结果
    this.showCommentSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },
  //展示操作结果
  showCommentSuccessToast: function () {
    wx.showToast({
      title: '评论成功！',
      duration: 1000,
      icon: "success"
    })
  },
  //重新渲染并绑定所有评论
  bindCommentData: function () {
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments: comments
    })
  },
  //将所有相关的按钮状态，输入状态都回到初始化状态
  resetAllDefaultStatus: function () {
    //清空评论框
    this.setData({
      keyboardInputValue: '',
      chooseFiles: [],
      sendMoreMsgFlag: false
    });
  },
})