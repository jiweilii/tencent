// pages/home/home.js
Page({

	data: {
		show: true,
		details:[],
		sex:"",
		xianshi:false,
        userId:"",
        signature:"",
        pinglunList:[]
	},
	getUserInfo(event) {
		console.log(event.detail);
		this.setData({
			details:event.detail,
			xianshi:true,
            signature: event.detail.signature
		})
		if(event.detail.userInfo.gender==1){
			this.setData({
				sex: "男"
			})
		}else{
			this.setData({
				sex: "女"
			})
		}
    },
	onClose() {
		this.setData({ close: false });
	},

	onLoad: function (options) {
        
	},

	onReady: function () {
		
	},
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