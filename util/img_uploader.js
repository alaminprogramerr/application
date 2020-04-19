const multer = require('multer')

const storage=multer.diskStorage({
	destination:function(req, file , cb){
		cb(null , './client/src/uploads')
	},
	filename:function(req, file , cb){
		cb(null , Date.now().toString()+'-'+file.originalname )
	}
})
const upload=multer({
	storage:storage,
	fileFilter:function(req, file, cb){
		if(file.mimetype==='image/jpeg' ||file.mimetype==='image/png'){
			cb(null , true)
		}else{
			cb(null , false)
		}
	},
	limits:{fileSize:1024*1024*5}
})

module.exports= upload