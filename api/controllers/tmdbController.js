const axios = require('axios')
const redisClient = require('../redis')
const User = require('../models/userModel')

exports.getTrendingMovies = async (req, res) => {
    const cacheKey = 'trendingMovies';

    try {
        const cachedMovies = await redisClient.get(cacheKey);
        if (cachedMovies) {
            return res.status(200).json({
                data: JSON.parse(cachedMovies),
                success: true,
                message: "Data fetched from cache"
            });
        }
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
        // const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&with_genres=${genreSting}`)
        // console.log(response)
        await redisClient.setEx(cacheKey, 24 * 3600, JSON.stringify(response.data));

        res.status(200).json({
            data: response.data,
            success: true,
            message: "Data fetched from API"
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


exports.getTopRatedMovies = async (req, res) => {
    const cacheKey = 'topRatedMovies';
    try {

        console.log(req.user)
        const user = await User.findOne({ email: req.user.userEmail })
        console.log(user);
        let genreSting = "";
        for (let i = 0; i < user.genres.length; i++) {
            genreSting = genreSting + user.genres[i].split('-')[0] + `${i == user.genres.length - 1 ? "" : ","}`
        }
        // const cachedMovies = await redisClient.get(cacheKey);
        // if (cachedMovies) {
        //     return res.status(200).json({
        //         data: JSON.parse(cachedMovies),
        //         success: true,
        //         message: "Data fetched from cache"
        //     });
        // }

        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&page=5&with_genres=${genreSting}`)
        await redisClient.setEx(cacheKey, 24 * 3600, JSON.stringify(response.data));

        res.status(200).json({
            data: response.data,
            success: true,
            message: "Data fetched from API"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching top-rated movies"
        });
    }
};

exports.getTrendingTv = async (req, res) => {
    const cacheKey = 'trendingTv';
    try {
        const cachedTv = await redisClient.get(cacheKey);
        if (cachedTv) {
            return res.status(200).json({
                data: JSON.parse(cachedTv),
                success: true,
                message: "Data fetched from cache"
            });
        }

        const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}&language=en-US`);
        await redisClient.setEx(cacheKey, 24 * 3600, JSON.stringify(response.data));

        res.status(200).json({
            data: response.data,
            success: true,
            message: "Data fetched from API"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching trending TV shows"
        });
    }
};

exports.getTopRatedTv = async (req, res) => {
    const cacheKey = 'topRatedTv';
    try {
        const cachedTv = await redisClient.get(cacheKey);
        if (cachedTv) {
            return res.status(200).json({
                data: JSON.parse(cachedTv),
                success: true,
                message: "Data fetched from cache"
            });
        }

        const response = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`);
        await redisClient.setEx(cacheKey, 24 * 3600, JSON.stringify(response.data));

        res.status(200).json({
            data: response.data,
            success: true,
            message: "Data fetched from API"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error fetching top-rated TV shows"
        });
    }
};


exports.searchMovie = async (req, res) => {
    try {
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${req.params.query}`,
            method: 'get'
        })
        res.status(200).json({
            data: movies.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


exports.getMovieDetails = async (req, res) => {
    const cacheKey = "movieId" + req.params.id;
    try {
        const cachedMovie = await redisClient.get(cacheKey);
        if (cachedMovie) {
            return res.status(200).json({
                data: JSON.parse(cachedMovie),
                success: true,
                message: "Data fetched from cache"
            });
        }
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`,
            method: 'get'
        })
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(movies.data));
        res.status(200).json({
            data: movies.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}

exports.getTvDetails = async (req, res) => {
    try {
        const tv = await axios.request({
            url: `https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`,
            method: 'get'
        })
        res.status(200).json({
            data: tv.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}



exports.getMovieCastDetails = async (req, res) => {
    try {
        const cast = await axios.request({
            url: `https://api.themoviedb.org/3/movie/${req.params.id}/credits?api_key=${process.env.API_KEY}`,
            method: 'get'
        })
        res.status(200).json({
            data: cast.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


exports.getTvCastDetails = async (req, res) => {
    try {
        const cast = await axios.request({
            url: `https://api.themoviedb.org/3/tv/${req.params.id}/credits?api_key=${process.env.API_KEY}`,
            method: 'get'
        })
        res.status(200).json({
            data: cast.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


exports.getMoviesByLanguage = async (req, res) => {
    try {
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_original_language=${req.params.lang}`,
            method: 'get'
        })
        res.status(200).json({
            data: movies.data,
            success: true
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}