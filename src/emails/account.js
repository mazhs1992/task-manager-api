

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'hotmail',
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.PASS_EMAIL
    }
})


function send(){
    transporter.sendMail(options, function(err,info){
        if(err){
            console.log(err)
            return
        }
        console.log("Sent"+ info.response)
    })
}



const sendWelcomeEmail = (email,name) =>{
    options = {
        from: 'node1992testAppJS@hotmail.com',
        to:email,
        subject:'Thanks for joining in!',
        text:`Welcome to the app,${name}. \n Let me know how you get along with the app!!`
    }    
    send()
}

const sendCancelationEmail = (email,name) =>{
    options = {
        from: 'node1992testAppJS@hotmail.com',
        to:email,
        subject:'Please Help us Grow!',
        text:`Dear ,${name}. We are very sorry to hear you deleted your account. \n We would really appreciate if you could inform us about the reasons you decided to do so, so we can improve our company!! \n\n Best Regards!`
    }    
    send()
}

 
module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}




/*
const sendgridAPI = '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'

sgMail.setApiKey(sendgridAPI)

sgMail.send({
    to: 'baggos92maz@gmail.com',
    from:'baggos92maz@gmail.com',
    subject:'This is my First email!',
    text:' I hope this on gets too you.',
    
})
*/