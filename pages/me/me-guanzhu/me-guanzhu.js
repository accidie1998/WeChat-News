// pages/me/me-guanzhu/me-guanzhu.js
import {
  DBPost
} from '../../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var dbPost = new DBPost();
    this.setData({
      recommendList: dbPost.getAllpostData()
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
  onShow: function() {},

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
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认取消关注！',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('用户点击确定');
          var recommendId = event.currentTarget.dataset.recommendId;
          console.log(recommendId);
          that.dbPost = new DBPost(recommendId);
          var newData = that.dbPost.follow();
          //重新渲染并绑定所有数据
          that.bindRecommendData();
        } else {//这里是点击了取消以后
          console.log('用户点击取消');
          return;
        }
      }
    })
  },

  /**
   * 重新渲染并绑定所有数据
   */
  bindRecommendData: function(event) {
    var dbPost = new DBPost();
    this.setData({
      recommendList: dbPost.getAllpostData()
    })
  }
})