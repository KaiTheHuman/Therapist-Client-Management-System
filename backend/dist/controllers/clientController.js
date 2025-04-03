
const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllClients= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const result= await db.query('SELECT * FROM clients'); //try getting all users. await= wait for query to finish before next step
    console.log(result);
    res.json(result); //send result back as a JSON
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

const getClients= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, name, email, phone, appRepeat} = req.query; //get parameters
    let query = 'SELECT * FROM clients WHERE 1=1'; //start query string 
    let queryParams = [];

    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(name){
      query += ' AND name = ?';
      queryParams.push(name);
    }

    if(email){
      query += ' AND email = ?';
      queryParams.push(email);
    }

    if(phone){
      query += ' AND phone = ?';
      queryParams.push(parseInt(phone));
    }

    if(appRepeat !== "ALL" && appRepeat){
      query += ' AND frequency_of_appointments = ?';
      queryParams.push(appRepeat);
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

const createClients= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { name, email, phone, appRepeat} = req.query; //get variables

   
    let query = 'INSERT INTO `clients` (`name`';
    let queryParams = [];

    if(email){ //if vaiables exist add them
      query += ', `email`';
    }
    if(phone){ //if vaiables exist add them
      query += ', `phone`';
    }
    if(appRepeat){ //if vaiables exist add them
      query += ', `frequency_of_appointments`';
    }
    
      query += ') VALUES (?'
      queryParams.push(name);
    

    if(email){
      query += " ,? ";
      queryParams.push(email);
    }
    if(phone){
      query += " ,? ";
      queryParams.push(parseInt(phone));
    }

    if(appRepeat){
      query += " ,? ";
      queryParams.push(appRepeat);
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

const deleteClients= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id} = req.query; //get vairiables
    let query = 'Delete FROM `clients` WHERE id = ?';
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

const updateClients= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
        const { id, name, email, phone, appRepeat} = req.query;
        let query = 'UPDATE `clients` SET ';
        let queryParams = [];
    
        if(name){ //Update TO varaibles first added if they exist
          query += '`name` = ?';
          queryParams.push(name);
        }
        if(email){
          query += ', `email` = ?';
          queryParams.push(email);
        }
    
        if( phone){
         query += ', `phone` = ?';
          queryParams.push( parseInt(phone));
        }
        if(appRepeat){
          query += ', `frequency_of_appointments` = ?';
          queryParams.push(appRepeat);
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
    getAllClients,
    getClients,
    createClients,
    deleteClients,
    updateClients,
  };











/*const db = require('../../db.js'); //import database connection, needed to execute queries.

//----------------------------------SEARCH-------------------------------------------------

const getAllSongs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const result= await db.query('SELECT songs.*, Albums.album_name FROM songs LEFT JOIN Albums ON songs.album = Albums.id WHERE 1=1'); //try getting all users. await= wait for query to finish before next step
      console.log(result);
      res.json(result); //send result back as a JSON
    } catch (err) {
      console.error(err); //if error, log it
      res.status(500).send('Internal Server Error');
    }
  };
  
const getSongs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const {id,name, album, min_year, max_year, albumID} = req.query; //get variables
      let query = `
        SELECT songs.*, Albums.album_name 
        FROM songs 
        LEFT JOIN Albums ON songs.album = Albums.id 
        WHERE 1=1
      `; //query includes album_name in case youre searching using that
      let queryParams = [];

      if(id){ //add variables if they exist
        query += ' AND songs.id >= ?';
        queryParams.push(parseInt(id));
      }
  
      if(name){
        query += ' AND songs.song_name = ?';
        queryParams.push(name);
      }
  
      if(album){
        query += ' AND Albums.album_name = ?';
        queryParams.push(album);
      }
  
      if(min_year){
        query += ' AND songs.release_year >= ?';
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        query += ' AND songs.release_year <= ?';
        queryParams.push(parseInt(max_year));
      }

      if(albumID){
        query +=' AND songs.album = ?';
        queryParams.push(albumID);
      }
  
      console.log(query);
      console.log(name);
  
      const result = await db.query(query, queryParams);
      res.json(result);
    } catch (err) {
      console.error(err); //if error, log it
      res.status(500).send('Internal Server Error');
    }
  };

  //--------------------------------CREATE-------------------------------------------------------

const createSongs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {newName, newAlbumID, new_year} = req.query; //variables

    let query = 'INSERT INTO `songs` (`song_name`';
    let queryParams = [];

    if(newAlbumID){ //add vairables if they exist
      query += ', `album`';
    }
    if(new_year)
        {
          query += ', `release_year`) VALUES'
        }
    else{
      query += ') VALUES'
    }

  
      query += " (? ";
      queryParams.push(newName);
    

    if(newAlbumID){
      query += " ,? ";
      queryParams.push(newAlbumID);
    }
    if(new_year){
        query += " ,?) ";
        queryParams.push(parseInt(new_year));
      }
    else{
      query += " ) ";
    }

    console.log(query);

    const result = await db.query(query, queryParams);
    console.log(result);
    console.log(result.data);

    if(newAlbumID){ //if song has a album with it
      const [album] = await db.query('SELECT song_list, artist FROM Albums WHERE id= ?' , [newAlbumID]); //get song_list and artist from connected Album
      let songList= album.song_list ? JSON.parse(album.song_list) : []; //extract song_list
      songList.push({ //push new info into song_list
        song_name: newName,
        release_year: new_year ? parseInt(new_year) : null,
      })
      console.log("songlist ",songList)
      console.log("added to album ",newAlbumID)
      await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [JSON.stringify(songList), newAlbumID]); //update albums song_list

      if(album.artist){ //get album has a connected artist
        const [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [album.artist]); //get songlist from artist
      let songList= artist.song_list ? JSON.parse(artist.song_list) : []; // extract songlist
      songList.push({ //psh new info to song_list
        song_name: newName,
        album: newAlbumID,
        release_year: new_year ? parseInt(new_year) : null,
      })
  
      await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [JSON.stringify(songList), album.artist]); //add song to artists song_list
      console.log("songlist ",songList)
      console.log("added to ",album.artist)


      }
    }

    res.json(result); //send back result
  
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//---------------------------------DELETE-----------------------------------------

const deleteSongs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, delName, delAlbumID, min_year, max_year, delIDs, delIDsAl} = req.query;
    let query = 'Delete FROM `songs` WHERE';
    let queryParams = [];
    let conditions =[];

    if(id){ //add conditions if the exist
      conditions.push(' id = ?');
      queryParams.push(parseInt(id));
    }
    if(delName){
      conditions.push(' song_name = ?');
      queryParams.push(delName);
    }

    if(delAlbumID){
      conditions.push(' album = ?');
      queryParams.push(delAlbumID);
    }

    if(min_year){
        conditions.push(' release_year >= ?');
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        conditions.push(' release_year  <= ?');
        queryParams.push(parseInt(max_year));
      }

    query += conditions.join(' AND');
    console.log(query);

    for(let i=0; i<delIDs.length; i++ ){ //go through each to be deleted song
      if(Array.isArray(delIDsAl) &&delIDsAl[i]){ //if song has a related album
        let [album] = await db.query('SELECT song_list, artist FROM Albums WHERE id= ?' , [delIDsAl[i]]); //get songlist

        if(album && album.song_list){

          let songList= album.song_list ? JSON.parse(album.song_list) : [];

          let songIndex = songList.findIndex(song => song.song_name === delName) //get index where song is located
  
          if(songIndex !== -1) //if song is on list
            {
              songList.splice(songIndex, 1); //get rid of song
              
              let updatedList = songList.length>0 ? JSON.stringify(songList) : null; //create an updated list without song
              if(updatedList === null) //if updatedList is null set list as null
              {
                await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [updatedList, delIDsAl[i]])
              }
              else{ //replace old song_list with new
                await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [JSON.stringify(updatedList), delIDsAl[i]])
              }
              console.log("song list:", songList, "removed from ", delIDsAl[i], "turned into ", updatedList)
      
            }
            console.log("albums artist ", album.artist)

            if(album.artist){ //if album has an artist connected
              let [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [album.artist]); //get artists song_list
            let songList= artist.song_list ? JSON.parse(artist.song_list) : [];
            let songIndex = songList.findIndex(song => song.song_name === delName) //get index where song is on list
            if(songIndex !== -1)
              {
                songList.splice(songIndex, 1); // get rid of song on songlist
                
                let updatedList = songList.length>0 ? JSON.stringify(songList) : null; //creted updated list
                if(updatedList === null) //if updated list is null, get rid of list
                {
                  await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [updatedList, album.artist])
                }
                else{ //else add new song_list
                  await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [JSON.stringify(updatedList), album.artist])
                }
        
              }
            
          }  
        }


        

      }
      

    }



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

//-------------------------------------------UPDATE--------------------------------------------
 
const updateSongs= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, upName, min_year, max_year, upToName, upToYear, upToAlbumID, IDs, IDsAl, year, upAlbumID} = req.query;
    let query = 'UPDATE `songs` SET ';
    let queryParams = [];
    let updateFields = [];

    if(upToName){ //add variables if they exist
      updateFields.push('`song_name` = ?');
      queryParams.push(upToName);
    }
    if(upToAlbumID){
      updateFields.push('`album` = ?');
      queryParams.push(upToAlbumID);
    }
    if(upToYear){
        updateFields.push('`release_year` = ?');
        queryParams.push(parseInt(upToYear));
      }

    if (updateFields.length > 0) {
      query += updateFields.join(', ') + ' '; // Join the update fields with commas
    } 

    query+=" WHERE 1 = 1 "

    if(id){ //add parameters if exist
      query += ' AND `id` = ?';
      queryParams.push(parseInt(id));
    }
    if(upName){
      query += ' AND `song_name` = ?';
      queryParams.push(upName);
    }

    if(upAlbumID){
      query += '  AND `album` = ?';
      queryParams.push(upAlbumID);
    }

    
    if(min_year){
        query += ' AND `release_year` >= ?';
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        query += ' AND `release_year` <= ?';
        queryParams.push(parseInt(max_year));
      }
    console.log("HERES THE QUERY", query, queryParams);

    console.log(query);


    const result = await db.query(query, queryParams);
    console.log(result);

    console.log("IDsAl:", IDsAl);
console.log("IDs:", IDs);
      if(upToAlbumID){ //if changing album
        for(let i=0; i<IDs.length; i++ ){ //go through all updated songs
          //------------------Delete Song off old song_list-------------------------
          if(Array.isArray(IDsAl) && IDsAl[i]){ //if song has album
            let [album] = await db.query('SELECT song_list, artists FROM Albums WHERE id= ?' , [IDsAl[i]]); //get songlist from old album
            if(album && album.song_list){ 
              let songList= album.song_list ? JSON.parse(album.song_list) : [];
              let songIndex = songList.findIndex(song => song.song_name === upName) //get index
              if(songIndex !== -1)
                {
                   songList.splice(songIndex, 1); //delete song off list
                            let updatedList = songList.length>0 ? JSON.stringify(songList) : null; //updated List
                            if(updatedList === null)
                              {
                                await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [updatedList, IDsAl[i]])
                              }
                  else{
                    await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [JSON.stringify(updatedList), IDsAl[i]])
                  }
          
                }

                if(album.artist){ //if album also connected to an artist
                  let [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [album.artist]); //get songlist
                let songList= artist.song_list ? JSON.parse(artist.song_list) : [];
                let songIndex = songList.findIndex(song => song.song_name === upName) //index
                if(songIndex !== -1)
                  {
                    songList.splice(songIndex, 1); //delete
                    
                    let updatedList = songList.length>0 ? JSON.stringify(songList) : null; //new list
                    if(updatedList === null)
                    {
                      await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [updatedList, album.artist])
                    }
                    else{
                      await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [JSON.stringify(updatedList), album.artist])
                    }
            
                  }
                
              }  
      
            }
          }
          //-----------------------------ADD song to new list--------------------------------------------
          let [album] = await db.query('SELECT song_list, artist FROM Albums WHERE id= ?' , [upToAlbumID]); //get songlist from new album
          let songList= album.song_list ? JSON.parse(album.song_list) : [];
          let songData ={ //add new songdata if it exists, else old songdata
            song_name: upToName || upName
          }
          if (upToYear) {
            songData.release_year = parseInt(upToYear);
          } else if (Array.isArray(year) && year.length > j && year[i] !== undefined) {
            songData.release_year = parseInt(year[j]);
          }
          songList.push(songData); //push data to list
          await db.query('UPDATE Albums SET song_list = ? WHERE id= ?', [JSON.stringify(songList), upToAlbumID]); //add new song to songlist

          if(album.artist){ //if album has an artist attached to it
            let [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [album.artist]); //get songlist
          let songList= artist.song_list ? JSON.parse(artist.song_list) : [];
          let songData ={ //add songdata
            song_name: upToName || upName
          }
          if (upToYear) {
            songData.release_year = parseInt(upToYear);
          } else if (Array.isArray(year) && year.length > j && year[i] !== undefined) {
            songData.release_year = parseInt(year[j]);
          }
          songList.push(songData);
          await db.query('UPDATE artists SET song_list = ? WHERE id= ?', [JSON.stringify(songList), album.artist]); //add new songs to list
          
        }  

        }

      }
      //-------------IF NOT CHANGING ALBUM, UPDATE LIST---------------------------------
      else if((upToName || upToYear ) && Array.isArray(IDsAl))
      {
         for (let i = 0; i < IDs.length; i++) { //loop through songs
          if(IDsAl[i]) //if they have an album attached
          {
            const [album] = await db.query('SELECT song_list, artist FROM Albums WHERE id= ?', [IDsAl[i]]); //get song_list from album
            if (album && album.song_list) {
              let songList = JSON.parse(album.song_list);
              let songIndex = songList.findIndex(song => song.song_name === upName); //get index
        
              if (songIndex !== -1) {
                if (upToName) songList[songIndex].song_name = upToName; //update song in songlist
                if (upToYear) songList[songIndex].release_year = parseInt(upToYear);
        
                await db.query('UPDATE Albums SET song_list = ? WHERE id = ?', [JSON.stringify(songList), IDsAl[i]]);
              }

              if(album.artist){ //if album has an artist attached
                let [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [album.artist]);//get song_list
              let songList= artist.song_list ? JSON.parse(artist.song_list) : [];
              let songIndex = songList.findIndex(song => song.song_name === upName); //get index

              if (songIndex !== -1) { 
                if (upToName) songList[songIndex].song_name = upToName;//update songlist
                if (upToYear) songList[songIndex].release_year = parseInt(upToYear);
              await db.query('UPDATE artists SET song_list = ? WHERE id= ?', [JSON.stringify(songList), album.artist]);
              }
              
            }  
            }

          }
          
          }
      }


   


    console.log(result.data);
    res.json(result);
  }
   catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
    getAllSongs,
    getSongs,
    createSongs,
    deleteSongs,
    updateSongs,
  };*/

