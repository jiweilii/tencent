// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
    try {
        // console.log(123)
        return await db.collection('my').doc(event.user_id).update({
            data: {
                npinglun: _.unshift({
                    ncontent: event.ncontent,
                    new_id: event.new_id,
                    date: event.date,
                    time: event.time,
                    id:event.id                  
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}

// console.log("这是myxiugai")