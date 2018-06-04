require('dotenv').config({
    path: '../.dev.env'
})

const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION
})

const S3 = new AWS.S3()

function uploadPhoto(req, res) {
    // console.log('photo in back', req.body.filename, process.env.AWS_ACCESSKEY)
    /*
        req.body = {
            file: (base64 encoded image),
            filename: (whatever the photo is called from the user),
            filetype: (file extension, eg. .png)
        }
    */
    let photo = req.body,
        buf = new Buffer(photo.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
        params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Body: buf,
            Key: photo.filename,
            ContentType: photo.filetype,
            ACL: 'public-read'
        }


    S3.upload(params, (err, data) => {
        let response, code
        err ? (response = err, code = 500) : (response = data, code = 200)
        res.status(code).send(response)
    })
}

module.exports = function (app) {
    app.post('/api/photoUpload', uploadPhoto)
}