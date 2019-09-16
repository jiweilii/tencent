// pages/pinglun/pinglun.js
const db = wx.cloud.database({
    enc: "environment-g9s3l"
})
Page({
    data: {
        content: "",
        // 每条新闻的_id
        new_id: "",
        list:[],
        date:"",
        time:"",
        // 每个用户的_id
        user_id:"",
        // 微信用户的id
        id:""
    },
    // 获得现在的日期时间
    getdate:function(){
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        if (month < 10) {
            month = '0' + month;
        };
        if (day < 10) {
            day = '0' + day;
        };
        //  如果需要时分秒，就放开
        var h = now.getHours();
        var m = now.getMinutes();
        if(m<10){
            m='0'+m;
        }
        if (s < 10) {
            s = '0' + s;
        }
        var s = now.getSeconds();
        var date = year + '-' + month + '-' + day
        var time = " " + h + ":" + m + ":" + s;
        this.setData({
            date:date,
            time:time,
        })
    },
    // 提交评论按钮的事件
    submit:function(){
        // 调用时间函数，获得当前时间
        this.getdate();
        db.collection("my").where({id:this.data.id}).get().then(res => {
            // this.data.user_id=res.data[0]._id;
            console.log(res);
            if (res.data.length==0){
                db.collection("my").add({    
                    data:{
                        id:this.data.id
                    }
                   }).then(res=>{
                    console.log(this)
                    console.log(this.data.content)
                    this.setData({
                        user_id: res._id
                    })
                       // 调用云函数myxiugai
                       wx.cloud.callFunction({
                           name: "myxiugai",
                           data: {
                               user_id: this.data.user_id,
                               new_id: this.data.new_id,
                               ncontent: this.data.content,
                               date: this.data.date,
                               time: this.data.time,
                               id: this.data.id
                           }
                       })
                           .then(res => {
                               console.log(this.data.id);
                               console.log(this.data.user_id);
                               console.log(this.data.new_id);
                               console.log(res)
                               console.log("000调用原函数myxiugaic成功");
                               this.setData({
                                   content: ""
                               })
                           })
                    // console.log(this.data.content)
                })
            }else{
                this.setData({
                    user_id: res.data[0]._id
                })
            // 调用云函数myxiugai
            wx.cloud.callFunction({
                name: "myxiugai",
                data: {
                    user_id: this.data.user_id,
                    new_id: this.data.new_id,
                    ncontent: this.data.content,
                    date: this.data.date,
                    time: this.data.time,
                    id: this.data.id
                }
            })
                .then(res => {
                    console.log(res)
                    console.log("111调用原函数myxiugaic成功");
                    this.setData({
                        content: ""
                    })
                })
            }
            console.log(this.data.user_id);
        })
        // 调用云函数xiugai
        wx.cloud.callFunction({
            name:"xiugai",
            data:{
                new_id:this.data.new_id,
                ncontent:this.data.content,
                id:this.data.id,
                date:this.data.date,
                time:this.data.time
            }
        })
        .then(res => {
        // 提交评论之后，重新加载界面
        this.search(this.data.new_id);
        })
        .catch(err => { console.log(err) });
    },
    // 监听内容改变
    onContentChange:function(options){
        this.setData({
            content:options.detail
        })
    },
    // 显示评论函数
    search: function (i) {
        db.collection('news').orderBy('time', 'desc').where({
            _id: i
        }).get()
        .then(res=>{
             console.log(res)
            //  console.log(res.data[0].npinglun)
            if(res.data[0].npinglun){
                this.setData({list:res.data[0].npinglun})
            }
        })
        .catch(err => { console.log(err) })
    },
    onLoad:function(options){
        this.data.new_id=options._id;
        this.search(this.data.new_id);
        wx.getUserInfo({
            withCredentials: true,
            lang: '',
            success: res=> {
                this.setData({
                    id:res.signature
                })
            },
            fail: function(res) {},
            complete: function(res) {},
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

    }
})