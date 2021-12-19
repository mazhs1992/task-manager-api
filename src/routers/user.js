const express = require ('express')
const sharp = require('sharp')
const router = new express.Router()
const multer = require('multer')


const auth = require('../middleware/auth')
const User =require('../models/user')
const {sendWelcomeEmail , sendCancelationEmail} = require('../emails/account')


//----------------------  CREATE USER-------------------------------------
router.post('/users', async (req,res)=>{       
        //  res.send('Testing!') //In postman if you press post you can see "Testing" 89 video
    const user = new User(req.body)    
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name) 
        const token= await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)   
    }        
})

//---------------------------  LOGIN  ----------------------------------
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})
//---------------------------  LOGOUT  ----------------------------------
  //otan briskei diaforetika gurmaei true ara mpainoyn ston pinaka alliws false
  router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//challebge logout all tokens
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

//----------------------  SEE ALL USERS-------------------------------------

router.get('/users/me', auth,async(req,res) =>{

    res.send(req.user)
    // try{
    // const users = await User.find({})
    // res.send(users)
    // }catch(e){
    //     res.status(500).send()
    // }  

})

//----------------------  SEE ONE USER-------------------------------------    

    // router.get('/users/:id', async (req,res)=>{
    //     const _id =req.params.id

    //     try {
    //         const user =await User.findById(_id)
    //         if(!user){
    //             return res.status(404).send()
    //         }   
    //         res.send(user)     
    //     } catch (e) {
    //         res.status(500).send()
    //     }

    // })


//----------------------  UPDATE user by id-------------------------------------    


router.patch('/users/me',auth, async (req,res)=>{
    //pernei ta kleidia apo to body (name,age...)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password','age']

    // elenxei ena ena ta kleidia an uparxoyn ston allowedupdates . an to brei gyrnaei true alliws false 
    // Sto telos an ola true gyrnaei true an estw kai ena false gyrnaei false --98 video
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({ error:'Invalid updates!'})
    }
    try {
        //const user = await User.findById(req.params.id)
        //or
        const user = req.user
      
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        
        await user.save()

        //const user =await User.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true})
        //we found no user
        if(!user){
            return res.status(404).send() 
        }
        res.send(user)  
    } catch (e) {
        //this is useless because we know the user exists
        res.status(400).send(e) 
    }
})


//----------------------  DELETE user by id-------------------------------------   

router.delete('/users/me',auth,async (req,res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send() 
        // }
        //OR
        
        await req.user.remove()
        res.send(req.user)
        sendCancelationEmail(req.user.email,req.user.name) 
    } catch (e) {
        res.status(500).send()
    }
})


//----------------------  UPLOAD PROFILE PICTURE-------------------------------------   

const upload = multer({
   // dest:'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(cb(new Error('Please upload a Image ')))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'), async(req,res)=>{
    const buffer =  await sharp(req.file.buffer).resize({ width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
   await req.user.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({error: error.message})
})


router.delete('/users/me/avatar',auth, async(req,res)=>{
    if(!(req.user.avatar === undefined)){
        req.user.avatar= undefined
         await req.user.save()    
        res.send('Profile picture Deleted successfully')
    }else{
        res.send('You must first have a profile picture in order to delete one')
    }
    
})

router.get('/users/:id/avatar', async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports=router