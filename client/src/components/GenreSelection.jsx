import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenreSelection = ({ setStep }) => {

    const token = localStorage.getItem("jwt_token")
    const [genre, setGenre] = useState([]);
    const navigate = useNavigate()
    function handleChange(e) {
        if (e.target.checked) {
            setGenre([...genre, e.target.value]);
        } else {
            setGenre(genre.filter((item) => item !== e.target.value));
        }
    }


    async function handleSubmit() {
        try {
            const response = await axios.request({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/user/addgenre`,
                data: genre,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log(response)
            if (response.status === 201) {
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='flex flex-col gap-4'>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Choose Your Genre:</h3>
            <ul className="grid w-full gap-6 max-[450px]:grid-cols-1 max-[760px]:grid-cols-2 grid-cols-3">
                <li>
                    <input type="checkbox" id="action-option" value="28-Action" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="action-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Action</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="adventure-option" value="12-Adventure" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="adventure-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Adventure</div>
                        </div>
                    </label>
                </li>

                {/* <li>
                    <input type="checkbox" id="animation-option" value="16-Animation" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="animation-option" className={`inline-flex items-center justify-between
                     w-full p-5 text-gray-500 bg-white border-2
                      border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300
                       dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600
                        dark:peer-checked:text-gray-300 peer-checked:text-gray-600
                         hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800
                          dark:hover:bg-gray-700 `}>
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Animation</div>
                        </div>
                    </label>
                </li> */}

                <li>
                    <input type="checkbox" id="comedy-option" value="35-Comedy" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="comedy-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Comedy</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="crime-option" value="80-Crime" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="crime-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Crime</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="documentary-option" value="99-Documentary" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="documentary-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Documentary</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="drama-option" value="18-Drama" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="drama-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Drama</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="family-option" value="10751-Family" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="family-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Family</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="fantasy-option" value="14-Fantasy" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="fantasy-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Fantasy</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="history-option" value="36-History" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="history-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">History</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="horror-option" value="27-Horror" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="horror-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Horror</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="music-option" value="10402-Music" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="music-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Music</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="mystery-option" value="9648-Mystery" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="mystery-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Mystery</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="romance-option" value="10749-Romance" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="romance-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Romance</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="science-fiction-option" value="878-Science-Fiction" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="science-fiction-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Science Fiction</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="thriller-option" value="53-Thriller" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="thriller-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Thriller</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="tv-movie-option" value="10770-TV-Movie" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="tv-movie-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">TV Movie</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="war-option" value="10752-War" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="war-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">War</div>
                        </div>
                    </label>
                </li>

                <li>
                    <input type="checkbox" id="western-option" value="37-Western" onChange={(e) => handleChange(e)} className="hidden peer" />
                    <label htmlFor="western-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-redcol hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <div className="w-full text-lg font-semibold">Western</div>
                        </div>
                    </label>
                </li>
            </ul>
            <button onClick={handleSubmit} className='bg-redcol px-4 py-2 rounded-lg hover:scale-105 transition-all duration-200 ease-in'>Next</button>
        </div>
    )
}

export default GenreSelection