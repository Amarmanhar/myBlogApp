const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const postRouter = require('./router/posts');
const authRouter = require('./router/auth');
const usersRouter = require('./router/users');
const multer = require('multer');

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST","GET","DELETE", "PUT"],
    credentials: true
}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/blogged/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({storage});

app.post('/api/upload', upload.single('file' ), function(req, res){
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) =>{
    res.send('hello from server');
})

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', usersRouter);


app.listen(2000, ()=>{
    console.log(`server is running on 2000`);
})