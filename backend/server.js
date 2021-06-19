const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./Middlewares/errorMiddleware');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(notFound);
// app.use(errorHandler);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {userNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("Mongodb database established successfully");
})

const jobsRouter = require('./routes/jobs');
//const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
//const seekerRouter = require('./routes/seekerRoutes');

app.use('/jobs', jobsRouter);
//app.use('/users', usersRouter);
app.use('/company',companyRouter);
//app.use('/seeker',seekerRouter);

 

app.listen(port, () =>{
    console.log(`server is running in PORT: ${port}`);
});