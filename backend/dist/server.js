
const express = require('express'); //import express
const cors = require('cors'); //prevents cors errors
const clientRoutes = require('./routes/clientRoute'); //import all our routes
const sessionRoutes = require('./routes/sessionRoute');
const therapistRoutes = require('./routes/therapistRoute');
const app = express(); // create express app

app.use(cors());
app.use(express.json());
app.use('/clients', clientRoutes); //use Routes when user uses axios with /___
app.use('/sessions', sessionRoutes);
app.use('/therapists', therapistRoutes);

app.listen(3000, () => { //set up port
  console.log('Server is running on port 3000');
});