//CRUD create read update delete

//THIS
    // const mongodb= require('mongodb')
    // const MongoClient = mongodb.MongoClient
    // const ObjectId = mongodb.ObjectId
//OR THAT
const {MongoClient,ObjectId}=require('mongodb')


const connectionURL ='mongodb://127.0.0.1:27017' // video 75
const databaseName = 'task-manager'

const id = new ObjectId()

//console.log(id.id)
//console.log(id.toString())
//console.log(id.getTimestamp())

MongoClient.connect(connectionURL,{ useNewUrlParser :true}, (error,client) =>{
    if (error) {
        return console.log('Unable to connect to database!')
    } 
   // console.log('Connected to database!')

   const db = client.db(databaseName)
    
   //--------------------------------- UPDATE ----------------------------------------------
            // const updatePromise = db.collection('users').updateOne({
            //     _id: new ObjectId("61b283c6a0e52fee4d7f934d")
            // },{
            //     $set: {
            //         name : "PAPARAS"
            //     }
            // })

            // updatePromise.then((result) => {
            //         console.log(result)
            // }).catch((error) => {
            //     console.log(error)
            // })

 //--------------------------------- UPDATE  MANY----------------------------------------------
            // db.collection('tasks').updateMany(
            //     {completed: false},
            //     {$set:{completed:true}})
            //     .then((result) => {
            //                 console.log(result.modifiedCount)
            //     })
            //     .catch((error) => {
            //             console.log(error)
            //     })

 //--------------------------------- DELETE MANY----------------------------------------------
            // db.collection('users')
            //     .deleteMany({age:27})
            //     .then((result) => {
            //          console.log(result)
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //    })
            
//--------------------------------- DELETE ONE----------------------------------------------
  
       db.collection('users')
        .deleteOne({name:"Papas"})
        .then((result) => {
             console.log(result)
        })
        .catch((error) => {
            console.log(error)
       })
    
            
})

