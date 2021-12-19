const express = require ('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task =require('../models/task')




//post get 90+ video

 //---------------------- CREATE TASK-------------------------------------      

 router.post('/tasks', auth,   async (req,res)=>{  
   
    //const task = new Task(req.body)
    const task =  new Task({
        ...req.body,
        owner : req.user._id
    })
    console.log(task)
   try {
       await task.save()
       res.status(201).send(task)
   } catch (e) {
       res.status(400).send(e)
   }       
})

//----------------------  SEE ALL tasks------------------------------------   

// GΕΤ / tasks?sortBy=createdAt:desc,asc
router.get('/tasks',auth, async (req,res) =>{
    const match = {}
    const sort={
          //1 asc  or -1 desc
    }
        if (req.query.completed){
            match.completed = req.query.completed==='true'
        }

        if (req.query.sortBy){
            const parts=req.query.sortBy.split(':')
            sort[parts[0]]= parts[1]==='desc'? -1 : 1 //if (parts[1]==='desc') --> -1
                                    

        }
        
       try {
         //1. const tasks=   await Task.find({owner:req.user._id})
         //2.await req.user.populate('Tasks')
         //3
         await req.user.populate({
             path:'Tasks',
             match,
             options:{
                 limit:parseInt(req.query.limit),
                 skip: parseInt(req.query.skip ),
                 sort                 
             }
            })
          res.send(req.user.Tasks)
        
       } catch (e) {
           res.status(500).send()
       }
      
   })

   //---------------------- SEE ONE Task-------------------------------------   

   router.get('/tasks/:id', auth, async(req,res)=>{
   const _id =req.params.id
   try {    
        const task = await  Task.findOne({_id, owner: req.user._id})
       
       if(!task){
           return res.status(404).send()
       }
       res.send(task)
   } catch (e) {
       res.status(500).send()
   }
})


//----------------------  UPDATE task by id-------------------------------------    


router.patch('/tasks/:id', auth,async (req,res)=>{

   const updates = Object.keys(req.body)
   const allowedUpdates = ['description','completed']
   const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

   if(!isValidOperation){
       return res.status(400).send({ error:'Invalid updates!'})
   }

   try {
        const task =await Task.findOne({_id:req.params.id, owner:req.user._id})      
       updates.forEach((update)=> task[update] = req.body[update])
       await task.save()
        //const task =await Task.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
       //we found no user
       if(!task){
           return res.status(404).send() 
       }
       updates.forEach((update)=> task[update] = req.body[update])
       await task.save()
       res.send(task)  
   } catch (e) {
       res.status(400).send(e) 
   }
})


//----------------------  DELETE task by id-------------------------------------   

router.delete('/tasks/:id',auth,async (req,res)=>{
    
   try {  
       const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
      
       if(!task){
           return res.status(404).send() 
       }
       res.send(task)
   } catch (e) {
       res.status(500).send()
   }
})



module.exports=router