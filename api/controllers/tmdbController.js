const axios = require('axios')


exports.getTrendingMovies = async (req, res) => {
    try {
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`,
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


exports.getTopRatedMovies = async (req, res) => {
    try {
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=1`,
            method: 'get'
        })
        res.status(200).json({
            data: movies.data,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


exports.getTrendingTv = async (req, res) => {
    try {
        const tv = await axios.request({
            url: `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}&language=en-US`,
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

exports.getTopRatedTv = async (req, res) => {
    try {
        const tv = await axios.request({
            url: `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1`,
            method: 'get'
        })
        res.status(200).json({
            data: tv.data,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching movies"
        })
    }
}


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
    try {
        const movies = await axios.request({
            url: `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}&append_to_response=videos`,
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