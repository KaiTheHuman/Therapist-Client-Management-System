const mysql = require('mysql'); //imports mySQL
const dbConf = {
    user: '',// Input your username here
    password: '',// Input your database password here
    host: '',  // Input your database host here
    database: ''// Input your database name here
}; // connects to database 

const db = mysql.createConnection(dbConf); //create connection to mySQL
db.connect(); //connect to database
console.log("Have live database connection"); //this is sent so we know it connected correctly

module.exports = { //export query function, so that we dont need to reconnect for every query
  query: (text, params) =>{
    return new Promise((resolve, reject) =>
    {
      db.query(text, params, (err, results)=>{ //text=SQL query as a string "SELECT * FROM artists WHERE id=1"
        //params is an array of values to safly insert into the query. callback then processes the results
        if(err)
        {
            console.warn(err); //if theres an error, log it
            return reject(err);
        }
        console.log(results); //log results
        console.log("results have reached db.js"); 
        resolve(results);
      })

    })
  }
};