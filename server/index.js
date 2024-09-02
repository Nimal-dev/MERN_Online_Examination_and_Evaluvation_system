const express = require('express');
const db = require('./config/db');
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');
// const path = require('path'); // Import the path module

const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

const port = 4000;


const authRouter = require('./Routes/AuthRouter');
const teacherRouter = require('./Routes/TeacherRouter');
const adminRouter = require('./Routes/AdminRouter');
const studentRouter = require('./Routes/StudentRouter');
const notifyRouter = require('./Routes/NotificationRouter');

db();

app.get('/', (req, res) => { res.send('Loaded'); });
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/notify', notifyRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => { console.log('Server Is Running'); });