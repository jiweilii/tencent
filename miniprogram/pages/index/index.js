// pages/news/news.js
const db = wx.cloud.database({
    enc: "environment-g9s3l"
})
Page({
  data: {
    list: []
  },

  onLoad: function (options) {
    db.collection("news").get()
      .then(res => {
        this.setData({
          list: res.data
        })
        // console.log(res.data)
      })
  },

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

  }
})