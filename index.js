import express from 'express';
import * as dotenv from 'dotenv' 
dotenv.config()
import mongoose from 'mongoose';
import Post from './Post.js';
import router from './router.js';
import fileUpload from 'express-fileupload';
const PORT = process.env.PORT || 5050;
const DB_URL = process.env.DB_URL;
const app = express();
// //преобразовать json формат для post запроса
app.use(express.json());
app.use('/api', router)
app.use(express.static('static'))
app.use(fileUpload({}))
const startApp = async () => {
    try{
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true})
        app.listen(PORT, ()=> console.log('listening on port '+PORT));
    } catch(e){
        console.log(e);
    }
}
startApp()
import cors from 'cors'
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.options('*', cors()) // //query -> localhost:5050/?test=123&query=afsasf&third=true
// app.get('/', (req, res) => {
//     console.log(req.query)
//     res.status(200).json('Server working')
// });

// app.post('/',  (req, res) => {
//     console.log(req.body)
//     res.status(200).json('Server working')
// })
