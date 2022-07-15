import express, { Request, Response } from "express";

// import path from "path";
const app = express();
app.use(express.static('public'))
const port = 9087; // default port to listen

// Configure Express to use EJS

// define a route handler for the default home page
app.get( "/", ( req: Request, res: Response ) => {
    // render the index template
    res.send("Hello typescript!");
} );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );