const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH FUNTIONS-----------------------------------------

const getAllSessions= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const result= await db.query('SELECT * FROM sessions'); //try getting all users. await= wait for query to finish before next step
    console.log(result);
    res.json(result); //send result back as a JSON
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

const getSessions= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, therapist, client, minDate,maxDate, minLength, maxLength} = req.query; //get parameters
    let query = 'SELECT * FROM sessions WHERE 1=1'; //start query string 
    let queryParams = [];


    if(id){ //add variables if they exist
      query += ' AND id = ?';
      queryParams.push(parseInt(id));
    }

    if(therapist){
      query += ' AND therapist_id = ?';
      queryParams.push(parseInt(therapist));
    }

    if(client){
      query += ' AND client_id = ?';
      queryParams.push(parseInt(client));
    }

    if(minDate){
      let newDate = new Date(minDate);
      newDate.setUTCHours(0, 0, 0, 0);
      newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
      newDate = newDate.toISOString().split('T')[0];
      query += ' AND date >= ?';
      queryParams.push(newDate);
    }
    if(maxDate){
      let newDate = new Date(maxDate);
      newDate.setUTCHours(0, 0, 0, 0);
      newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
      newDate = newDate.toISOString().split('T')[0];
      query += ' AND date <= ?';
      queryParams.push(newDate);
    }

    if(minLength){
      query += ' AND length >= ?';
      queryParams.push(parseInt(minLength));
    }

    if(maxLength){
      query += ' AND length <= ?';
      queryParams.push(parseInt(maxLength));
    }
    console.log(query);

    const result = await db.query(query, queryParams); //sends request
    res.json(result); //send results back as a JSON file
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-------------------------------CREATE---------------------------------------

const createSessions= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { therapist, client, notes, date, length} = req.query; //get variables

   
    let query = 'INSERT INTO `sessions` (`therapist_id`, `client_id` ';
    let queryParams = [];

    if(notes){ //if vaiables exist add them
      query += ', `notes`';
    }
    if(date){ //if vaiables exist add them
      query += ', `date`';
    }
    if(length){ //if vaiables exist add them
      query += ', `length`';
    }
    
      query += ') VALUES (?'
      queryParams.push(therapist);
      query += ' ,? '
      queryParams.push(client);

    if(notes){
      query += " ,? ";
      queryParams.push(notes);
    }
    if(date){
      let newDate = new Date(date);
      newDate.setUTCHours(0, 0, 0, 0);
      newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
      newDate = newDate.toISOString().split('T')[0];
      query += " ,? ";
      queryParams.push(newDate);
    }
    if(length){
      query += " ,? ";
      queryParams.push(length);
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

const deleteSessions= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const {id} = req.query; //get vairiables
      let query = 'Delete FROM `sessions` WHERE id = ?';
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

const updateSessions= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const { id, therapist_id, client_id, date, notes, length} = req.query;
    let query = 'UPDATE `sessions` SET ';
    let queryParams = [];

    if(therapist_id){ //Update TO varaibles first added if they exist
      query += '`therapist_id` = ?';
      queryParams.push(parseInt(therapist_id));
    }
    if(client_id){
      query += ', `client_id` = ?';
      queryParams.push(parseInt(client_id));
    }

      
    if( date){
      let newDate = new Date(date);
      newDate.setUTCHours(0, 0, 0, 0);
      newDate = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()+1));
      newDate = newDate.toISOString().split('T')[0];
     query += ', `date` = ?';
      queryParams.push( newDate);
    }
    if(length){
      query += ', `length` = ?';
      queryParams.push(parseInt(length));
    }
    if(notes){
      query += ', `notes` = ?';
      queryParams.push(notes);
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
    getAllSessions,
    getSessions,
    createSessions,
    deleteSessions,
    updateSessions,
  };












/*const db = require('../../db.js'); //import database connection, needed to execute queries.

//-----------------------SEARCH---------------------------------------------------

const getAllAlbums= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const result= await db.query('SELECT Albums.*, artists.artist_name FROM Albums LEFT JOIN artists ON Albums.artist = artists.id'); //try getting all users. await= wait for query to finish before next step
      console.log(result);
      res.json(result); //send result back as a JSON
    } catch (err) {
      console.error(err); //if error, log it
      res.status(500).send('Internal Server Error');
    }
  };
  
const getAlbums= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
    try {
      const {id, name, artist, min_listeners, max_listeners, min_year, max_year, artistID} = req.query;
      let query = `
        SELECT Albums.*, artists.artist_name 
        FROM Albums 
        LEFT JOIN artists ON Albums.artist = artists.id 
        WHERE 1=1
      `; //join Albums.artist in case were searching by artist name
      let queryParams = [];
      if(id){ //add variables if exist
        query += ' AND Albums.id = ?';
        queryParams.push(id);
      }
  
      if(name){
        query += ' AND Albums.album_name = ?';
        queryParams.push(name);
      }
  
      if(artist){
        query += ' AND artists.artist_name = ?';
        queryParams.push(artist);
      }

      if(artistID){
        query +=' AND Albums.artist = ?';
        queryParams.push(artistID);
      }
  
      if(min_listeners){
        query += ' AND Albums.number_of_listens >= ?';
        queryParams.push(parseInt(min_listeners));
      }
      if(max_listeners){
        query += ' AND Albums.number_of_listens <= ?';
        queryParams.push(parseInt(max_listeners));
      }
      if(min_year){
        query += ' AND Albums.release_year >= ?';
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        query += ' AND Albums.release_year <= ?';
        queryParams.push(parseInt(max_year));
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


const createAlbums= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {newName, newArtistID, listener_count, new_year} = req.query;

    let query = 'INSERT INTO `Albums` (`album_name`';
    let queryParams = [];

    if(newArtistID){ //add variables if they exist
      query += ', `artist`';
    }
    if(listener_count)
    {
      query += ', `number_of_listens`'
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
    

    if(newArtistID){
      query += " ,? ";
      queryParams.push(newArtistID);
    }

    if(listener_count){
      query += " ,? ";
      queryParams.push(parseInt(listener_count));
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

    if(newArtistID){ //if new album has an artist attached
      const [artist] = await db.query('SELECT album_list FROM artists WHERE id= ?' , [newArtistID]); //get album_list
      let albumList= artist.album_list ? JSON.parse(artist.album_list) : []; //extract list
      albumList.push({ //push values into lists
        album_name: newName,
        release_year: new_year ? parseInt(new_year) : null,
        number_of_listens: listener_count ? parseInt(listener_count) : null
      })
  
      await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [JSON.stringify(albumList), newArtistID]); //add to album_list
    }

    res.json(result);
  
  } catch (err) {
    console.error(err); //if error, log it
    res.status(500).send('Internal Server Error');
  }
};

//-------------------------------DELETE-------------------------------------------------

const deleteAlbums= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, delName, delArtistID, min_listeners, max_listeners, min_year, max_year, delIDs, delIDsArt} = req.query;
    let query = 'Delete FROM `Albums` WHERE';
    let queryParams = [];
    let conditions =[];

    if(id){ //add variables if exist
      conditions.push(' id = ?');
      queryParams.push(parseInt(id));
    }
    if(delName){
      conditions.push(' album_name = ?');
      queryParams.push(delName);
    }

    if(delArtistID){
      conditions.push(' artist = ?');
      queryParams.push(delArtistID);
    }

    if(min_listeners){
      conditions.push(' number_of_listens >= ?');
      queryParams.push(parseInt(min_listeners));
    }
    if(max_listeners){
      conditions.push(' number_of_listens  <= ?');
      queryParams.push(parseInt(max_listeners));
    }
    if(min_year){
        conditions.push(' release_year >= ?');
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        conditions.push(' release_year  <= ?');
        queryParams.push(parseInt(max_year));
      }

    query += conditions.join(' AND'); //puts AND between each condition
    console.log(query);
    console.log("ARRAY", Array.isArray(delIDsArt))

    for(let i=0; i<delIDs.length; i++ ){ //loop through albums
      if(Array.isArray(delIDsArt) && delIDsArt[i]){ //if album has an artist attached
        const [artist] = await db.query('SELECT album_list, song_list FROM artists WHERE id= ?' , [delIDsArt[i]]); //get album_list from artist

        if(artist && artist.album_list){

          let albumList= artist.album_list ? JSON.parse(artist.album_list) : [];
          const albumIndex = albumList.findIndex(album => album.album_name === delName) //get index for album
  
          if(albumIndex !== -1)
            {
              albumList.splice(albumIndex, 1); //delete album off list
              const updatedList = albumList.length>0 ? JSON.stringify(albumList) : null; //update list
              if(updatedList === null)
              {
                await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [updatedList, delIDsArt[i]])
              }
              else{
                await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [JSON.stringify(updatedList), delIDsArt[i]])
              }
              
      
            }
            console.log("ARTISTS SONG LIST", artist.songList)
            console.log("IDs of the Artsits linked to deleted album", delIDsArt)
            console.log("THIS deleted artist link ", delIDsArt[i])

            const [album] = await db.query('SELECT song_list FROM Albums WHERE id= ?' , [delIDs[i]]); //get song_list from album
            console.log("SONG LIST IN ARTIST ", artist.song_list)
            console.log("SONG LIST IN ALBUM ", album.song_list)

            if(album.song_list && artist.song_list) //if album has a song_list
            {
              let albumSongs = JSON.parse(album.song_list); //albums song_list
              let artistSongs = JSON.parse(artist.song_list); // artists song_list
              // Filter out songs that exist in albumSongs from artistSongs
              artistSongs = artistSongs.filter(artistSong => 
                !albumSongs.some(albumSong => albumSong.song_name === artistSong.song_name)
              );
              console.log("UPDATED SONGS ", artistSongs)
               
               const updatedSongs = artistSongs.length > 0 ? JSON.stringify(artistSongs) : null;
               console.log("UPDATED SONGS ", updatedSongs)

               // Update artist's song_list 
               if(updatedSongs == null)
                {
                  await db.query('UPDATE artists SET song_list = null WHERE id = ?', [ delIDsArt[i]])
                }
                else{
                  await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [JSON.stringify(updatedSongs), delIDsArt[i]])
                }

              
            }

            
        }

      }
      //if album has songs, delete album from songs
      const [songs] = await db.query('SELECT song_list FROM Albums WHERE id= ?' , [delIDs[i]]);
      if(songs){
      await db.query('UPDATE songs SET album = NULL WHERE album = ?', [ delIDs[i]])
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

//---------------------------UPDATE---------------------------------------------------

const updateAlbums= async (req, res) => { // go to homepage, async = queries dont need to happen all at once (allows us to use await)
  try {
    const {id, upName, upArtist, min_listeners, max_listeners, min_year, max_year, upToName, upToArtist, upToListeners, upToYear, upToArtistID, IDs, IDsArt, year, listens, upArtistID} = req.query;
    let query = 'UPDATE `Albums` SET ';
    let queryParams = [];
    let updateFields = [];

    if(upToName){ //if variables exist add them
      updateFields.push('`album_name` = ?');
      queryParams.push(upToName);
    }
    if(upToArtistID){
      updateFields.push('`artist` = ?');
      queryParams.push(upToArtistID);
    }

    if(upToListeners){
      updateFields.push('`number_of_listens` = ?');
      queryParams.push(parseInt(upToListeners));
    }
    if(upToYear){
        updateFields.push('`release_year` = ?');
        queryParams.push(parseInt(upToYear));
      }

    if (updateFields.length > 0) {
      query += updateFields.join(', ') + ' '; // Join the update fields with commas
    } 

    query+=" WHERE 1 = 1 "

    if(id){ //if parameters exist add them
      query += ' AND `id` = ?';
      queryParams.push(parseInt(id));
    }
    if(upName){
      query += ' AND `album_name` = ?';
      queryParams.push(upName);
    }

    if(upArtistID){
      query += '  AND `artist` = ?';
      queryParams.push(upArtistID);
    }

    if(min_listeners){
      query += ' AND `number_of_listens` >= ?';
      queryParams.push(parseInt(min_listeners));
    }
    if(max_listeners){
      query += ' AND `number_of_listens` <= ?';
      queryParams.push(parseInt(max_listeners));
    }
    if(min_year){
        query += ' AND `release_year` >= ?';
        queryParams.push(parseInt(min_year));
      }
      if(max_year){
        query += ' AND `release_year` <= ?';
        queryParams.push(parseInt(max_year));
      }
    console.log(query);


    const result = await db.query(query, queryParams);
    console.log(result);

    console.log("IDsArt:", IDsArt);
console.log("IDs:", IDs);
console.log("is array?", Array.isArray(IDsArt));



if(upToArtistID) //if being updated to a new Artist
{
  //-----------------delete off old artists list-----------------------------------------
  for(let i=0; i<IDs.length; i++) // loop through albums
    { 
      if(Array.isArray(IDsArt) &&IDsArt[i] ) //if album has linked artist
        {
      const [artist] = await db.query('SELECT album_list, song_list FROM artists WHERE id= ?' , [IDsArt[i]]); //get albumlist
      if(artist && artist.album_list){
        let albumList= artist.album_list ? JSON.parse(artist.album_list) : [];
      const albumIndex = albumList.findIndex(album => album.album_name === upName) //get index

      if(albumIndex !== -1)
        {
          albumList.splice(albumIndex, 1); //delete
          const updatedList = albumList.length>0 ? JSON.stringify(albumList) : null;//update list
          if(updatedList === null)
            {
              await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [updatedList, IDsArt[i]])
            }
            else{
              await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [JSON.stringify(updatedList), IDsArt[i]])
            }
  
        }
      
        const [album] = await db.query('SELECT song_list FROM Albums WHERE id= ?' , [IDs[i]]); //get song_list from album

        if(album.song_list && artist.song_list) //if album has a song_list
        {
          let albumSongs = JSON.parse(album.song_list); //albums song_list
          let artistSongs = JSON.parse(artist.song_list); // artists song_list
          // Filter out songs that exist in albumSongs from artistSongs
          artistSongs = artistSongs.filter(artistSong => 
            !albumSongs.some(albumSong => albumSong.song_name === artistSong.song_name)
          );
          console.log("UPDATED SONGS ", artistSongs)
           
           const updatedSongs = artistSongs.length > 0 ? JSON.stringify(artistSongs) : null;
           console.log("UPDATED SONGS ", updatedSongs)

           // Update artist's song_list 
           if(updatedSongs == null)
            {
              await db.query('UPDATE artists SET song_list = null WHERE id = ?', [ IDsArt[i]])
            }
            else{
              await db.query('UPDATE artists SET song_list = ? WHERE id = ?', [JSON.stringify(updatedSongs), IDsArt[i]])
            }

          
        }

      }
    }
    //--------------------------add to new album list--------------------------------------------------
    
      const [artist] = await db.query('SELECT album_list FROM artists WHERE id= ?' , [upToArtistID]); //get album_list from new artist
  let albumList= artist.album_list ? JSON.parse(artist.album_list) : [];
  let albumData = { //push new data if it exists, else old data
    album_name: upToName || upName
  };
  if (upToYear) {
    albumData.release_year = parseInt(upToYear);
  } else if (Array.isArray(year) && year.length > i && year[i] !== undefined) {
    albumData.release_year = parseInt(year[i]);
  }
  if (upToListeners) {
    albumData.number_of_listens = parseInt(upToListeners);
  } else if (Array.isArray(listens) && listens.length > i && listens[i] !== undefined) {
    albumData.number_of_listens = parseInt(listens[i]);
  }      
  albumList.push(albumData);

  await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [JSON.stringify(albumList), upToArtistID]); //add to list

  let [album] = await db.query('SELECT song_list FROM Albums WHERE id= ?' , [IDs[i]]);
  console.log("ALBUM -->",album)
  console.log("SONG LIST IN ALBUM -->",album.song_list)

if(album.song_list){ //if album has song_list
                  let [artist] = await db.query('SELECT song_list FROM artists WHERE id= ?' , [upToArtistID]); //get song_list from new artist
                          let songList= artist.song_list ? JSON.parse(artist.song_list) : [];
                          let albumSongList= album.song_list ? JSON.parse(album.song_list) : [];
                          songList = [... songList, ...albumSongList]; //add two lists together
                          await db.query('UPDATE artists SET song_list = ? WHERE id= ?', [JSON.stringify(songList), upToArtistID]);
                
              }  
  
    
  }
} 
//-----------------NO new artist, update list--------------------------------------------
else if ( (upToName || upToYear || upToListeners) && Array.isArray(IDsArt)) { 
  for (let i = 0; i < IDs.length; i++) { //go through Albums
    if(IDsArt[i]) //if album has attached artist
    {
      const [artist] = await db.query('SELECT album_list FROM artists WHERE id= ?', [IDsArt[i]]); //get album list from artist
    if (artist && artist.album_list) { 
      let albumList = JSON.parse(artist.album_list);
      let albumIndex = albumList.findIndex(album => album.album_name === upName);//get index of album in list

      if (albumIndex !== -1) { //update album to new values
        if (upToName) albumList[albumIndex].album_name = upToName;
        if (upToYear) albumList[albumIndex].release_year = parseInt(upToYear);
        if (upToListeners) albumList[albumIndex].number_of_listens = parseInt(upToListeners);

        await db.query('UPDATE artists SET album_list = ? WHERE id = ?', [JSON.stringify(albumList), IDsArt[i]]);
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
    getAllAlbums,
    getAlbums,
    createAlbums,
    deleteAlbums,
    updateAlbums,
  };

*/


