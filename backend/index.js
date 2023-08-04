const express = require('express');
const connection = require('./configs/db');
const userRouter = require('./routes/user.routes');
const cors = require('cors');
const { authorization } = require('./middlewares/auth.middleware');
const storyRouter = require('./routes/story.routes');
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).send({msg: 'Welcome to Story Generator Backend'})
})

app.use('/user', userRouter);

app.use(authorization);

app.use('/story', storyRouter);

app.listen(port, ()=>{
    connection();
    console.log(`App running on port: ${port}`);
})
