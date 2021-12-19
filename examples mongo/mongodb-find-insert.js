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
    //--------------------------------------------FIND------------------------------------------------------

                //FIND-ONE
                            //db.collection('users').findOne({name:'Jen'},(error,user) =>{
                            // db.collection('users').findOne({ _id: new ObjectId('61b283c6a0e52fee4d7f934d')},(error,user) =>{
                            
                            //         //if it doesn t find a match it returns null
                            //     if(error){
                            //         return console.log('Unable to insert user!')
                            //     }
                            //     console.log(user)
                            // })


                    //FIND
                        //ToArray
                            // db.collection('users').find({age:27}).toArray((error,users) =>{
                            //     console.log(users)
                                
                            // })

                        //count
                            // db.collection('users').find({age:27}).count((error,users) =>{
                            //     console.log(users)
                                    
                            // })


                    //challenge find -findone
                            // //1
                            // db.collection('tasks').findOne({ _id: new ObjectId('61b31465d57a359564146029')},(error,user) =>{   
                            //     if(error){
                            //             return console.log('Unable to insert user!')
                            //         }
                            //     console.log(user)
                            // })
                            // //2
                            // db.collection('tasks').find({completed : false}).toArray((error,users) =>{
                            //     console.log(users)
                            // })


 //--------------------------------------------INSERT------------------------------------------------------
                    //INSERT-ONE
                            // db.collection('users').insertOne({
                            //     _id:id,
                            //     name:'Vikram',
                            //     age: 26
                            // },(error,result) => {
                            //         if(error){
                            //             return console.log('Unable to insert user!')
                            //         }
                            //         console.log(result.insertedId.toString())
                            // })

                        //INSERT MANY
                                // db.collection('users').insertMany([
                                //     {
                                //         name:'Jen',
                                //         age:28
                                //     },
                                //     {
                                //         name:'Papas',
                                //         age:31
                                //     }
                                // ], (error,result)=>{
                                //     if(error){
                                //         return console.log('Unable to insert documents!')
                                //     }
                                //     console.log(result.insertedIds)
                                // })

           



            
})

