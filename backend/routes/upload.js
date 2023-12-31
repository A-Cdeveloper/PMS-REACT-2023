const express = require('express')
const verifyToken = require('../authMw')

const router = express.Router()

router.post('/', verifyToken, (req, res) => {
  // Log the files to the console
  if (!req.files) return res.status(400).json({ message: 'File not selected' })

  const { image } = req.files
  const { name: imageName } = image
  const filename = `${Math.floor(Math.random() * 10000)}-${imageName}`

  // If no image submitted, exit
  if (!/^image/.test(image.mimetype))
    return res.status(400).json({ message: 'File extension not alowed' })
  // // Move the uploaded image to our upload folder
  image.mv(process.cwd() + '/public/' + filename)
  //   // // All good
  res.status(200).json({ filename, message: 'Upload image success' })
})

module.exports = router
