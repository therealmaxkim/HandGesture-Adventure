const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const text = require('./text.json');
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// Special piece for running with webpack dev server
if (process.env.NODE_ENV === "development") {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }));
}
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/app/start.html');
});


//A function that takes a json object and an html page and inserts json data to 
//the page, and returns the updated html file
function set_data(data, page) {
  for (var key in data) {
    page = page.replace(key, data[key]);
  }
  return page
}

//Directly place the user's name into the page.  
app.post('/set_name', function(req, res) {
  var name = req.body.name;
  let page = fs.readFileSync("app/index.html", "utf8");
  if (!(name == null)) {
    page = page.replace("%name%", name);
    fs.writeFileSync("app/index.html", page, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  }
  res.redirect('/start');
});

//determine the location the user is in, and fill in data from json about the current
//place. 
app.get("/:id", function(req, res) {
  const location = req.params.id;
  let page = fs.readFileSync("app/index.html", "utf8");
  page = set_data(text[location], page);
  res.send(page);
});

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
