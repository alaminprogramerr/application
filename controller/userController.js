
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const userModel = require('../model/userModel')




const register= (req, res)=>{
    console.log(req.body)
    const {name , email , password, contactnumber ,description} = req.body
    console.log(name, email, password, contactnumber, description)
    if(!name ||!email||!password||!contactnumber||!description){
        return res.status(400).json({massage:"Please  Fillup all Required Data"})
    }
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            return res.status(400).json({massage:"This  Email Already Exist"})
        }
        bcrypt.hash(password, 13, (err,hash)=>{
            new userModel({
                name:name,
                email:email,
                password:hash,
                contactnumber:contactnumber,
                description:description
            })
            .save()
            .then(user=>{
                console.log(user)
                res.json({massage:'Registered Successfull !'})
            })
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server error occurd"})
    })    
}

const login=(req, res)=>{
    const {email, password} = req.body
    if(!email||!password){
        return res.status(400).json({error:"Please Provide Email and Password"})
    }
    userModel.findOne({email:email})
    .then(user=>{
        
        if(!user){
            return res.status(400).json({error:"User Not Exist "})
        }
        
        bcrypt.compare(req.body.password ,user.password,(err,success)=>{
            if(err){
                console.log(err)
                return res.status(500).json({error:"Server error occurd "})
            }
            if(!success){
                return res.status(400).json({error:"Password Does Not Match"})
            }
            const token = jwt.sign({
                name:user.name,
                email:user.email,
                contactnumber:user.contactnumber,
                description:user.description
            },'secret',{expiresIn:'2h'}) 
            res.status(200).json(token)
        })  
    })

    
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server error occurd"})
    })
}

module.exports={
    register,
    login
}