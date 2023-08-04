const { favoriteModel } = require('../models/favorite.model');

require('dotenv').config();
require('isomorphic-fetch');

const story = async (req, res)=>{
    try {
        let {genre} = req.body;
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers:{
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content:`Generate a short story of this genre: ${genre}`}],
                max_tokens: 800
            })
        });
        response = await response.json();
        const data = response.choices[0].message.content;
        res.status(200).send({story: data});
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error.message});
    }
}

const favoriteStory = async(req, res)=>{
    try{
        const {story, genre, userId} = req.body;
        const newfavorite = new favoriteModel({story, genre, userId});
        await newfavorite.save();
        res.status(200).send({msg: "Story saved as favorite"})
    }catch(err){
        console.log(err);
        res.status(500).send({msg: err.message});
    }
}

const allFavorite = async(req, res)=>{
    try{
        const {userId} = req.body;
        let allFavor = await favoriteModel.find({userId});
        res.status(200).send(allFavor);
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
}

module.exports = {
    story, favoriteStory, allFavorite
}
