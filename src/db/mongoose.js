const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL) 




    


    //         // //Challenge

    //         const Task =mongoose.model('Tasks',{
    //             description:{
    //                 type:String,
    //                 required:true,
    //                 trim:true
    //             },
    //             completed:{
    //                 type:Boolean,
    //                 default:false,
    //             }
    //         })


    // //1 - challenge
    //             const work = new Task({
    //                 description:"Wash yourself",
    //                 //completed:false
    //             })

    //             work.save()
    //             .then(()=>{
    //                 console.log(work)
    //             })
    //             .catch((error)=>{
    //                 console.log('Error',error)
    //             })