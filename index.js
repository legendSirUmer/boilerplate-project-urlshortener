import 'dotenv/config';
import Url from "./urlschema.js";
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(express.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', async function(req,res){

  const url = req.body.url;

  

  console.log('url form body '+url);
  let returned_url  = await urlShortner(url);
  console.log(returned_url);
  res.json({ original_url: url, short_url: returned_url });

});

app.get('/api/shorturl/:shortUrl',async function(req, res) {
  const shortUrl = req.params.shortUrl.trim();

  console.log('shortUrl from params: ' + shortUrl);

  let redirect_url = await Url.findOne({short_url : shortUrl});
  console.log('fetched object: ' + redirect_url);
  redirect_url = redirect_url.orignam_url;
  console.log('redirecting to: ' + redirect_url);
  res.redirect(redirect_url);


});




app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


async function urlShortner(url){
    var new_url = new Url({
    orignam_url: url,
    short_url: Math.floor(Math.random() * 10000) // Random number for short URL
  });

  
  try {

      await new_url.save()
      console.log('URL saved successfully:', new_url);

  } catch (error) {

    console.error('Error saving URL:', error);
  }


  return new_url.short_url;

}