const express = require ('express')
require('./db/mongoose')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express() 
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})


const jwt =require('jsonwebtoken')
const Task = require('./models/task')




////////////   EXAMPLE MULTER -file upload  //////////////////
/*
        const multer = require('multer')
        const upload = multer({
            dest:'images',
            limits:{
                fileSize:1000000
            },
            fileFilter(req,file,cb){
                if(!file.originalname.match(/\.(doc|docx)$/)){
                    return cb(cb(new Error('Please upload a Word document ')))
                }
                // if(file.originalname.endsWith('.pdf')){
                //     return cb(cb(new Error('Please upload a PDF ')))
                // }
                cb(undefined,true)
                //cb(new Error('File must be '))
            }
        })
        app.post('/upload',upload.single('upload'),(req,res)=>{
            res.send()
        },(error,req,res,next) =>{
            res.status(400).send({error: error.message})
        })

*/
//////////////////////////////////////////////////////////////////
  



// const bcrypt = require('bcryptjs')

// const myFunction =async () =>{
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(hashedPassword)
    
//     const isMatch = await bcrypt.compare('Red12345!',hashedPassword)
//     console.log(isMatch)
// }

// myFunction()

// const User = require('./models/user')

// const main = async () =>{   
//     // const task = await Task.findById('61bdadf0c5029db8a304e9ee')
//     // await task.populate('owner')
//     // console.log(task)
//     //61bdacdcd375ba92c08f4ab5
//     const user = await User.findById('61bdacdcd375ba92c08f4ab5')
//     await user.populate('Tasks')
//     console.log(user.Tasks)
// }
// main()