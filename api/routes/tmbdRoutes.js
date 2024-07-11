const express = require('express')
const router = express.Router();
const { getTrendingMovies, getTopRatedMovies, searchMovie, getMovieDetails, getTvDetails, getTvCastDetails, getMovieCastDetails,getMoviesByLanguage, getTrendingTv, getTopRatedTv } = require('../controllers/tmdbController');


router.get('/trendingmovies', getTrendingMovies)
router.get('/topratedmovies', getTopRatedMovies)
router.get('/searchmovie/:query', searchMovie)
router.get('/movie/:id', getMovieDetails)
router.get('/tv/:id', getTvDetails)

router.get('/tv/castdetails/:id', getTvCastDetails)
router.get('/movie/castdetails/:id', getMovieCastDetails)

router.get('/moviesByLang/:lang',getMoviesByLanguage)

router.get('/trendingtv',getTrendingTv)
router.get('/topratedtv',getTopRatedTv)


module.exports = router