const postmodel = require("../models/post.model")
const Imagekit = require("@imagekit/nodejs");
const {toFile} = require("@imagekit/nodejs")


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createpostcontroller(req,res) {
    console.log(req.file)
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),
    "file"),
    fileName: "test"
    })
    res.send(file)
    
}

module.exports = {
    createpostcontroller
}

