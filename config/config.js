const crypto = require('crypto')
const path = require('path')
const multer = require('multer')

const userimagesstorage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/images/uploads/userimages')
    },
    filename:function(req, file, cb){
        crypto.randomBytes(14, function(err, buff){
            let fnn = buff.toString('hex')+path.extname(file.originalname);
            cb(null, fnn)
        })
    }
})


const reviewstorage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/images/uploads/reviewimages')
    },
    filename:function(req, file, cb){
        crypto.randomBytes(14, function(err, buff){
            let fnn = buff.toString('hex')+path.extname(file.originalname);
            cb(null, fnn)
        })
    }
})

const productstorage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './public/images/uploads/productimages')
    },
    filename:function(req, file, cb){
        crypto.randomBytes(14, function(err, buff){
            let fnn = buff.toString('hex')+path.extname(file.originalname);
            cb(null, fnn)
        })
    }
})




module.exports = {userimagesstorage, productstorage,reviewstorage};