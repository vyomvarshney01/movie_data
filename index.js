const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

const cors = require('cors');

const { getAllMovies, getMovieById } = require('./controllers');
app.use(cors());
app.use(express.json());

// Endpoint to get all movies

app.get('/movies', async (req, res) => {
  try {
    const movies = getAllMovies();
    if (movies.length === 0) {
      res.status(400).json('No movie details found');
    }
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get movie detalls by id
app.get('/movies/details/:id', async (req, res) => {
  try {
    let movie = getMovieById(parseInt(req.params.id));
    if (movie.length === 0) {
      res.status(400).json('No movie detail found by this id');
    }
    res.status(200).json({
      movie,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
