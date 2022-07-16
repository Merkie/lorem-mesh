import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
app.use(express.static("public"));
const port = 9087;

export const getAllFilesInDirectory = (dir: string) => {
  let files: string[] = [];
  fs.readdirSync(dir).forEach((file) => {
    if (file.includes("png")) files.push('/'+dir+'/'+file);
  });
  return files;
};

// Full gradients
const cool_gradients_full: string[] = getAllFilesInDirectory("public/images/cool");
const warm_gradients_full: string[] = getAllFilesInDirectory("public/images/warm");
const iridescent_gradients_full: string[] = getAllFilesInDirectory(
  "public/images/iridescent"
);

// Thumbnail gradients
const cool_gradients_thumbnail: string[] = getAllFilesInDirectory("public/images/cool_thumbnail");
const warm_gradients_thumbnail: string[] = getAllFilesInDirectory("public/images/warm_thumbnail");
const iridescent_gradients_thumbnail: string[] = getAllFilesInDirectory(
  "public/images/iridescent_thumbnail"
);

// Tiny gradients
const cool_gradients_tiny: string[] = getAllFilesInDirectory("public/images/cool_tiny");
const warm_gradients_tiny: string[] = getAllFilesInDirectory("public/images/warm_tiny");
const iridescent_gradients_tiny: string[] = getAllFilesInDirectory(
  "public/images/iridescent_tiny"
);

// random choice
function sample(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

// define a route handler for the default home page
app.get("/", (req: Request, res: Response) => {
  // render the index template
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API route
app.get("/api/:color?/:size?", (req: Request, res: Response) => {
  const color = req.params.color || "random";
  const size = req.params.size || "full";
  var list: string[] = [];

  // TODO: Perhaps there is a better way to accomplish this?
  if(color == "random") {
    if(size == "full") {
      list = cool_gradients_full.concat(warm_gradients_full, iridescent_gradients_full);
    } else if(size == "thumbnail") {
        list = cool_gradients_thumbnail.concat(warm_gradients_thumbnail, iridescent_gradients_thumbnail);
    } else if(size == "tiny") {
        list = cool_gradients_tiny.concat(warm_gradients_tiny, iridescent_gradients_tiny);
    }
  } else if(color == "cool") {
    if(size == "full") {
      list = cool_gradients_full;
    } else if(size == "thumbnail") {
        list = cool_gradients_thumbnail;
    } else if(size == "tiny") {
        list = cool_gradients_tiny;
    }
  } else if(color == "warm") {
    if(size == "full") {
      list = warm_gradients_full;
    } else if(size == "thumbnail") {
        list = warm_gradients_thumbnail;
    } else if(size == "tiny") {
        list = warm_gradients_tiny;
    }
  }
  
  // If all goes well send the file but if not send a little error
  if(list.length > 0) {
    res.sendFile(path.join(__dirname.substring(0, __dirname.length - 5), sample(list)));
  } else {
    res.send("No gradients found");
  }
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
