module.exports = app => {
    const express = require('express')
    const router = express.Router({
      mergeParams:true   //合并url参数
    })
 

    router.post('/',async (req,res) => {
      const model = await  req.Model.create(req.body)
      res.send(model)
    })

    router.delete('/:id',async (req,res) => {
      const model = await req.Model.findByIdAndDelete(req.params.id,req.body)
      res.send({
        success:true
      })
    })

    router.put('/:id',async (req,res) => {
      const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })

    router.get('/',async (req,res) => {
      const quryOptions = {}
      if(req.Model.modelName === 'Category'){
        quryOptions.populate ='parent'
      }
      const items = await  req.Model.find().setOptions(quryOptions).limit(10)
      res.send(items)
    })

    router.get('/:id',async (req,res) => {
      
      const model = await  req.Model.findById(req.params.id)
      res.send(model)
    })



    app.use('/admin/api/res/:resource',async(req,res,next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
      
    },router)


    const path = require('path')
    const multer = require('multer')
    const upload = multer({dest:path.join(__dirname + '/../../uploads')})
    app.post('/admin/api/upload',upload.single('file'),async(req,res) => {
      const file = req.file
      file.url = `http://localhost:3000/uploads/${file.filename}`
    
      res.send(file)
    })
}