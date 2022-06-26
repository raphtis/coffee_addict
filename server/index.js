const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const app = express();

// USE EXPRESS/JSON TO GET DATA INTO JSON FORMAT
app.use(express.json());
app.use(cors());


// ROUTES
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


// CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECT,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to Coffee Addict DB!!!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log('Server connected!!!'))