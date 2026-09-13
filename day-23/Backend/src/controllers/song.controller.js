const songmodel = require("../models/song.model")
const storageservice = require("../service/storage.service")
const id3 = require("node-id3")


async function uploadsong(req, res){

    const songbuffer = req.file.buffer
    const {mood} = req.body

    const tags = id3.read(songbuffer)

    const [songFile, posterFile] = await Promise.all([
        storageservice.uploadFile({
            buffer:songbuffer,
            filename:tags.title + ".mp3",
            folder: "/co/moodify/songs"
        }),
        storageservice.uploadFile({
            buffer:tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/co/moodify/posters"
        })
    ])

    const song = await songmodel.create({
        title: tags.title,
        url: songFile.url,
        posterurl: posterFile.url,
        mood
    })
    res.status(201).json({
        message:"song creates successfully.",
        song
    })
}

async function getsong(req, res){
    const {mood} = req.query
  console.log("MOOD FROM FRONTEND:", mood);

    const song = await songmodel.findOne({
        mood,
    })


      console.log("MATCHING SONGS:", song);


    res.status(201).json({
        message:"song fetched successfully.",
        song
    })
}

module.exports = {
    uploadsong,
    getsong
}