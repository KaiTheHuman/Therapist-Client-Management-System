const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllTherapists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const result= await db.query('SELECT * FROM therapists'); //try getting all users. await= wait for query to finish before next step
    console.log(result);
    res.json(result); //send result back as a JSON
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

const getTherapists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, name, title, email, location, min_Year, available} = req.query; //get parameters
    let query = 'SELECT * FROM therapists WHERE 1=1'; //start query string 
    let queryParams = [];

    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(name){
      query += ' AND name = ?';
      queryParams.push(name);
    }

    if(title){
      query += ' AND title = ?';
      queryParams.push(title);
    }

    if(email){
      query += ' AND email = ?';
      queryParams.push(email);
    }

    if(location){
      query += ' AND location = ?';
      queryParams.push(location);
    }

    if(min_Year){
      query += ' AND years_of_expirience >= ?';
      queryParams.push(parseInt(min_Year));
    }

    if(available !== "ALL" && available){
      query += ' AND available = ?';
      queryParams.push(available);
    }
    console.log(query);
    console.log(name);

    const result = await db.query(query, queryParams); //sends request
    res.json(result); //send results back as a JSON file
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-------------------------------CREATE---------------------------------------

const createTherapists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { name, title, email, location, min_Year, available} = req.query; //get variables

   
    let query = 'INSERT INTO `therapists` (`name`';
    let queryParams = [];

    if(title){ //if vaiables exist add them
      query += ', `title`';
    }
    if(email){ //if vaiables exist add them
      query += ', `email`';
    }
    if(location){ //if vaiables exist add them
      query += ', `location`';
    }
    if(min_Year)
    {
      query += ', `years_of_expirience`'
    }
    if(available){ //if vaiables exist add them
      query += ', `available`';
    }
    
      query += ') VALUES (?'
      queryParams.push(name);
    

    if(title){
      query += " ,? ";
      queryParams.push(title);
    }
    if(email){
      query += " ,? ";
      queryParams.push(email);
    }
    if(location){
      query += " ,? ";
      queryParams.push(location);
    }

    if(min_Year){
      query += " ,? ";
      queryParams.push(parseInt(min_Year));
    }
    console.log("available value",available);
    if(available){
      query += " ,? ";
      queryParams.push(available);
    }
   
      query += " ) ";
    

    console.log(query);

    const result = await db.query(query, queryParams); //sends request
    console.log(result);
    console.log(result.data);
    res.json(result); //send back result
  
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-----------------------------DELETE---------------------------------------------

const deleteTherapists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id} = req.query; //get vairiables
    let query = 'Delete FROM `therapists` WHERE id = ?';
    let queryParams = [];

      queryParams.push(parseInt(id));

    console.log(query);

      /*const [album] = await db.query('SELECT album_list FROM artists WHERE id = ?', id) //see if theres any albums connected to artist
      if(album)
      {
         await db.query('UPDATE Albums SET artist = NULL WHERE artist = ?', [ id]) //delete artistid from album 
      }*/


    const result = await db.query(query, queryParams); //send request
    console.log(result);
    console.log(result.data);
    res.json(result); //send result
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//----------------------------------------------UPDATE------------------------------------------------------------

const updateTherapists= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { id, title, name, email, location, year, available} = req.query;
    let query = 'UPDATE `therapists` SET ';
    let queryParams = [];
    console.log(id, title, name, email, location, year, available)

    if(name){ //Update TO varaibles first added if they exist
      query += '`name` = ?';
      queryParams.push(name);
    }
    if(title){
      query += ', `title` = ?';
      queryParams.push(title);
    }

    if(email){
     query += ', `email` = ?';
      queryParams.push(email);
    }
    if(location){
      query += ', `location` = ?';
      queryParams.push(location);
    }
    if(year){
      query += ', `years_of_expirience` = ?';
      queryParams.push(parseInt(year));
    }
    if(available){
      query += ', `available` = ?';
      queryParams.push(available);
    }



    query+=" WHERE `id` = ? " //paramter variables added now
    queryParams.push(parseInt(id));

    
    console.log(query);


    const result = await db.query(query, queryParams);
    console.log(result);
    console.log(result.data);
    res.json(result);
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { //export everything
    getAllTherapists,
    getTherapists,
    createTherapists,
    deleteTherapists,
    updateTherapists,
  };




