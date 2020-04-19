const applicationModel = require('../model/applicationModel')


// get data 
const readApplication=(req,res)=>{
    applicationModel.find()
    .then(applications=>{
        res.status(200).json(applications)
    })
    .catch(err=>{
        return res.status(500).json({massage:"Server error occurd in DB"})
    })
}
// edit data
const createApplication=(req,res)=>{
    
    // profilePicture:req.file.filename,
    // picturePath:req.file.path
    console.log('working')
    if(!req.body.title || !req.file || !req.body.description|| !req.file){
        return res.status(400).json({massage:"Pls fillup all required data !"})
    }
    const {title , description} = req.body
    const img= req.file.filename
    console.log(title, img, description)
    new applicationModel({
        title:title,
        img:img,
        description:description
    }).save()
    .then(application=>{
        console.log(application)
        res.json({massage:'Applicatin added successfull !'})
    })
    .catch(err=>{
        return res.status(500).json({massage:"Server err occurd"})
    })
}
// delete data
const deleteApplication=(req,res)=>{
    const id = req.params.id
    applicationModel.findByIdAndDelete(id)
    .then(deleted=>{
        console.log(deleted)
        return res.status(200).json({massage:"Application deleted successfull !"})
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"Server err occurd"})
    })
}

// update data
const editApplication=(req,res)=>{
    console.log(req.body)
    const{title,description,id}=req.body
    if(!title|| !description || !id){
        return res.status(500).json({massage:"Pls enter required information "})
    }
    applicationModel.findOne({_id:id})
    .then(application=>{
        application.title=title
        application.description=description
        application.save()
        .then(updated=>{
            console.log(updated)
            return res.status(200).json({massage:"Application updated successfull !"})
        })
        .catch(err=>{
            console.log(err)
            return res.status(500).json({massage:"Server err occurd"})
        })

    })
}

const getSingle=(req, res)=>{
    const id= req.params.id
    applicationModel.findOne({_id:id})
    .then(application=>{
        if(!application){
            return res.status(200).json({massage:"Application not exist "})
        }
        return res.status(200).json(application)
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({massage:"server error occurd"})
    })
}
module.exports={
    createApplication,
    readApplication,
    deleteApplication,
    editApplication,
    getSingle
}