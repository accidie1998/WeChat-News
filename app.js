//app.js


App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var storageData = wx.getStorageSync("recommendList");
    var storageData1 = wx.getStorageSync("videoList");
    if (!storageData) {
      var dataObj = require("data/data.js");
      wx.setStorageSync("recommendList", dataObj.recommendList)
    };
    if (!storageData1) {
      var dataObj = require("data/data.js");
      wx.setStorageSync("videoList", dataObj.videoList)
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
