// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command


// 云函数入口函数
exports.main=async(event,context)=>{
    try{
        console.log(123)
        return await db.collection('news').doc(event.new_id).update({
            data: {
                npinglun: _.unshift({
                    ncontent: event.ncontent, 

                    id:event.id,
                    date:event.date,
                    time:event.time
                })
            }
        })
    } catch (e) {
        console.log(e)
    }
}