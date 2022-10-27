const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true,   useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB connection successfully");
});

const divisionalOffice = require('./routes/divisionalOffice.js');
app.use('/divisionalOffice', divisionalOffice);

const school = require('./routes/school.js');
app.use('/school', school);

const book_request_from_deo = require('./routes/book_request_to_deo.js');
app.use('/book_request_from_deo', book_request_from_deo);

const book_request_from_school = require('./routes/book_request_from_school.js');
app.use('/book_request_from_school', book_request_from_school);

const announcement = require('./routes/announcement.js');
app.use('/announcement', announcement);

const book_reject_reason = require('./routes/book_reject_reason.js');
app.use('/book_reject_reason', book_reject_reason);

const private_user = require('./routes/private_user.js');
app.use('/private_user', private_user);

const book_shop = require('./routes/book_shop.js');
app.use('/book_shop', book_shop);

const subject = require('./routes/subject.js');
app.use('/subject', subject);

const auth = require('./routes/auth.js');
app.use('/auth', auth);

const book_request_from_shop = require('./routes/book_request_from_shop.js');
app.use('/book_request_from_shop', book_request_from_shop);

const book_Store = require('./routes/book_Store.js');
app.use('/book_Store', book_Store);

const book_buy = require('./routes/book_buy.js');
app.use('/book_buy', book_buy);

app.listen(port,() =>{
    console.log(`Server is running on port: ${port}`);
});