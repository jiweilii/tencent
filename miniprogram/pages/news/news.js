// pages/news/news.js
const db = wx.cloud.database({
    enc: "environment-g9s3l"
})

Page({
    data: {
        list: [],
    },
    jump: function (e) {
        // console.log(e.target.dataset.id)
            // console.log(this.data.list)
        wx.navigateTo({ url: `/pages/pinglun/pinglun?_id=` + e.target.dataset._id })
    },
    onLoad: function (options) {
        //var a = res.data[1].nid
        db.collection("news").get()
            .then(res => {
                // console.log(res.data)
                this.setData({
                    list: res.data,
                })
                // console.log(this.data.list)

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


    },
    // shareFriend:function(){
    //     this.onShareAppMessage();
    // }
})