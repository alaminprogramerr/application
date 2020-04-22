const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const userModel = require('../model/userModel')




const register= (req, res)=>{
    console.log(req.file)
    console.log(req.body)
    const {name , email , password, contactnumber ,description} = req.body
    const img= req.file
    var error={}
    if(!name){
        error.name="Enter Name"
    }
    if(!email){
        error.email="Enter Email"
    }
    if(!password){
        error.password="Enter Password"
    } 
    if(!contactnumber){
        error.contactnumber="Enter Contact Number"
    } 
    if(!description){
        error.description="Enter Description"
    } 
    if(!req.file){
        error.file="Select Image"
    }
    console.log(error)
    if(!name ||!email||!password||!contactnumber||!description || !img){
        console.log(error)
        return res.status(400).json(error)
    }
    userModel.findOne({email:email})
    .then(user=>{
        if(user){
            error.massage='This  Email Already Exist'
            return res.status(400).json(error)
        }
        bcrypt.hash(password, 13, (err,hash)=>{
            new userModel({
                name:name,
                email:email,
                password:hash,
                contactnumber:contactnumber,
                description:description,
                img:img.filename,
                privete:false,
                bookmark:[]
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
                description:user.description,
                img:user.img,
                id:user._id
            },'secret',{expiresIn:'2h'}) 
            res.status(200).json(token)
        })  
    })

    
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server error occurd"})
    })
}
const allUser=(req, res)=>{
    userModel.find()
    .then(users=>{
        return res.json(users)
    })
    .catch(err=>{
        res.status(500).json({massage:"Server error occurd"})
    })
}
const bookmarkedUser=(req, res)=>{
    var userID= req.body.userID
    userModel.findOne({_id:userID})
    .then(user=>{
        userModel.find()
        .then(allUsers=>{
            var markUser=[]
            allUsers.map(singleUserFromAllUser=>{
                console.log('4')
                user.bookmark.map(singleUserFromBookmarked=>{
                    console.log(singleUserFromAllUser._id ,singleUserFromBookmarked._id)
                    console.log(singleUserFromAllUser._id ==singleUserFromBookmarked._id)
                })
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({massage:"Server error occurd"})
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"server error occurd"})
    })
}
const unBookmarkedUser=(req, res)=>{
    var addedUser=[]
    var userID= req.body.userID
    userModel.findOne({_id:userID})
    .then(user=>{
        userModel.find()
        .then(allUsers=>{
            var markUser=[]
            allUsers.map(single=>{
                user.bookmark.map(id=>{
                    if(id!==single._id){
                        addedUser.push(single)
                    }
                })
            })
            res.status(200).json(addedUser)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({massage:"Server error occurd"})
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({massage:"server error occurd"})
    })
}
const addBookmark=(req, res)=>{
    let bookmarkID= req.body.bookmarkID
    let userID=req.body.userID
    userModel.findById(userID)
    .then(user=>{
        userModel.findById(bookmarkID)
        .then(added=>{
            let addable=true
            user.bookmark.map(single=>{
                console.log(single._id, bookmarkID)
                if(single._id==bookmarkID){
                    addable=false
                    console.log('false')
                }
            })
            console.log('addable', addable)
            if(addable){
                user.bookmark=[...user.bookmark,added ]
            }
            user.save()
            .then(updated=>{
                // console.log(updated)
                res.status(200).json({massage:"Added Success !!!"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({massage:"server error "})
        })
    })
}
module.exports={
    register,
    login,
    allUser,
    addBookmark,
    bookmarkedUser,
    unBookmarkedUser
}