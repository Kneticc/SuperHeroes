import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import compression from 'compression';

dotenv.config();

const app = express();

app.use(compression());
app.use(cors());

const PORT = process.env.PORT || 3000;
const HEROES_API = 'https://superheroapi.com/api';

app.get('/search/:name', async (req, res) => {

  const { name } = req.params;
  const response = await axios.get(`${HEROES_API}/${process.env.TOKEN}/search/${name}`);

  const filteredHeroes = response.data.results.filter(hero => hero.name.toLowerCase().startsWith(name.toLowerCase()));

  res.json({ results: filteredHeroes.slice(0, 10) });

});

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${HEROES_API}/${process.env.TOKEN}/${id}`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: 'An error ocurred',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

