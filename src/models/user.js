const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,   //monadiko email     
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if (value <0){
                throw new Error("Age must be a positive number")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if (!validator.isLength(value,{min:6})){
                throw new Error("Password must be at least 6 characters")
            }
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can not contain word 'Password'")
            }
        } 
                  
       // isLength(value [{min:6, max: undefined}])
    },
    tokens :[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('Tasks',{
    ref: 'Tasks',
    localField:'_id',
    foreignField:'owner'
}
)

//gia na mh fainontai password kai token -postman
 userSchema.methods.toJSON = function(){
    const user = this   
    const userObject =user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
 }

userSchema.methods.generateAuthToken =async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials =async (email, password)=>{
    const user  =await User.findOne({email:email})

    if(!user){
        throw new Error ('Unable to Log in')
    }

    const isMatch = await bcrypt.compare(password,user.password)
   
    if(!isMatch){
        throw new Error ('Unable to Log in')
    }

    return user
}


/*
    statics function can be use anywhere from the User.function 
    while methods can only be used after an instance of a User.

    statics can be use like this: User.staticfunction()

    while method need to be used like this:

    const user = new User

    user.method()



    User is a class and user is an instance of the class.
*/


//[=================================MIDDLEWARES==========================================
           
//Before creating or updating a user the password will be hashed
            userSchema.pre('save',async function (next){
                const user = this
                //console.log('Just before saving!')

                if(user.isModified('password')){
                    user.password = await bcrypt.hash(user.password, 8)
                }

                next()
            })


            //DELETE USER TASKS when user deletes his profile


//[=================================MIDDLEWARES==========================================
            userSchema.pre('remove',async function (next){
                const user = this
                await Task.deleteMany({owner:user._id})
                next()
            })


 // DEFINE MODEL
const User =mongoose.model('User',userSchema)

module.exports= User















    // //data for Insert -CREATE INSTANCE
    //     const me = new User ({
    //         name:'Mike',
    //         email:'mike@hotmail.com',
    //         password:'PASSWORD'
    //     })

    // //Save
    //     me.save()
    //     .then(()=>{
    //         console.log(me)
    //     })
    //     .catch((error)=>{ 
    //         console.log('Error',error)
    //     })