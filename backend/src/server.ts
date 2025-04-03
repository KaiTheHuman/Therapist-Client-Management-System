import express, { Request, Response } from 'express'; //we want requests and responses from express
import routes from "./routes/index"; //import index, this is our main router



const app = express(); //create express app
const PORT = process.env.PORT || 3000; //checks to see if theres a PORT set, if not sets it to 3000

app.use(express.json()); //parses any incoming JSON specifically any POST and PUT requests. this also makes sure that req.body has parsed JSON data


app.get('/', (req: Request, res: Response) => {  //app.get request to '/' (so to the blank localhost:3000 page),
    res.send('Welcome'); //sends the text welcome
});

app.listen(PORT, () => { //starts the express server on PORT, logging the message below
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/', routes); //tells express to use the imported routes from ./routes/index, so that theyre all available in the URL bar as (for example) /music