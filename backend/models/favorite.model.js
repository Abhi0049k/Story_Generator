const mongoose = require("mongoose");


const favorSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

const favoriteModel = mongoose.model("favorStory" , favorSchema);

module.exports ={
    favoriteModel
}