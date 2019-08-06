const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// Initialize an app
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs"); // sees what View Engine is being used
app.set("views", viewsPath); // seeing templates
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(publicPath)); // using static files

// routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Dmitriy Shin"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Dmitriy Shin"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "We are here to help",
    name: "Dmitriy Shin"
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({
      error: "Search term must be provided"
    });
  } else {
    res.send({
      products: []
    });
  }
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "Address must be provided..."
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      else {
        console.log(
          `Location: ${location}\nLatitude: ${latitude}\nLongitude: ${longitude}`
        );

        forecast(latitude, longitude, (error, forecast) => {
          if (error) return res.send({ error });
          else {
            res.send({
              location,
              forecast
            });
          }
        });
      }
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Help article not found...",
    title: "404"
  });
});

app.get("*", (req, res) =>
  res.render("404", { errorMessage: "Page Not Found...", title: "404" })
);

app.listen(port, _ => console.log(`Server is up on port ${port}`));
