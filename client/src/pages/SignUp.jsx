import React, { useState } from 'react'
import { FcClapperboard } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GenreSelection from '../components/GenreSelection';


const SignUp = () => {

    const [user, setUser] = useState({ email: "", password: "", repeatPassword: "" })
    const [error, setError] = useState({})
    const [response, setResponse] = useState("");
    const [register, setRegister] = useState(false);

    const [step, setStep] = useState(0);

    const navigate = useNavigate();

    function validateEmail(e) {
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const name = e.target.name;
        if (e.target.value === "") {
            console.log(error)
            setError((prev) => ({ ...prev, [name]: "Can't be Empty" }))
            return false;
        }

        else if (!emailregx.test(e.target.value)) {
            setError((prev) => ({ ...prev, [name]: "Invalid Email" }))
            return false;
        }

        else {
            setError((prev) => ({ ...prev, [name]: "" }))
            return true;
        }
    }

    function validatePass(e) {
        const name = e.target.name;
        console.log(name)
        if (e.target.value === "") {
            setError((prev) => ({ ...prev, [name]: "Can't be Empty" }))
            return false;
        }

        else if (e.target.value.length < 6) {
            // setErrorPass("Should be atleast 6 characters");
            setError((prev) => ({ ...prev, [name]: "Should be atleast 6 characters" }))
            return false;
        }

        else {
            setError((prev) => ({ ...prev, [name]: "" }))
            return true;
        }
    }

    function validateRepeatPass(e) {
        const name = e.target.name
        if (e.target.value !== user.password) {
            setError((prev) => ({ ...prev, [name]: "Try Again" }))
            return false;
        }
        else {
            setError((prev) => ({ ...prev, [name]: "" }))
            return true;
        }
    }

    function handleUser(e) {
        const name = e.target.name
        setUser((prev) => ({ ...prev, [name]: e.target.value }))
        // console.log(user)
    }

    async function handleSubmit(e) {
        setResponse("")
        const email = user.email;
        const password = user.password;
        e.preventDefault();
        if (error.email === "" && error.password === "" && error.repeatPassword === "" && user.email !== "" && user.password !== "" && user.repeatPass !== "") {
            const configuration = {
                method: "post",
                url: `${process.env.REACT_APP_API_URL}/auth/signup`,
                data: {
                    email,
                    password
                },
            }
            try {
                const result = await axios(configuration);
                if (result.data) {
                    setRegister(true);
                    localStorage.setItem("jwt_token", result.data.token)
                    setStep(step + 1)
                }
            } catch (error) {
                console.log(error);
                setResponse(error.response?.data?.message || "An error occurred");
            }
        }
    }


    return (
        <div className='bg-bgdarkb min-h-screen min-w-screen flex flex-col justify-center items-center'>
            {
                step === 0 ? (
                    <div className='max-[480px]:w-5/6 w-[400px] max-[421px]:w-full'>
                        <FcClapperboard className='clap text-4xl my-8 mx-auto' />
                        <div className='px-8 max-[301px]:p-2 py-4 bg-bgblue rounded-2xl shadow-2xl font-thin'>
                            <h1 className='p-4 text-3xl text-white'>Register</h1>
                            <form action="" className='relative p-4 max-[361px]:p-0 flex flex-col gap-6'>
                                <input type="text" placeholder='Email Address' name='email'
                                    className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${error.Email ? 'border-redcol' : 'border-slate-300'}`}
                                    onChange={(e) => { handleUser(e); validateEmail(e) }}
                                />

                                <span className='absolute text-sm right-0 translate-y-1/2 text-redcol'>{error.email}</span>
                                <input type="password" placeholder='Password' className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${error.Pass ? 'border-redcol' : 'border-slate-300'}`}
                                    name='password'
                                    onChange={(e) => handleUser(e)}
                                    onKeyUp={validatePass}
                                />
                                <span className='absolute text-sm top-20 right-0 translate-y-1/2 text-redcol'>{error.password}</span>
                                <input type="password" placeholder='Repeat Password' className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${error.RepeatPass ? 'border-redcol' : 'border-slate-300'}`}
                                    name='repeatPassword'
                                    onChange={(e) => handleUser(e)}
                                    onKeyUp={validateRepeatPass}
                                />
                                <span className='absolute text-sm top-36 right-0 translate-y-1/2 text-redcol'>{error.repeatPassword}</span>
                                <button type='submit' className='bg-redcol text-white hover:transition-all hover:ease-in hover:duration-150 p-2 rounded hover:text-redcol hover:bg-white'
                                    onClick={(e) => handleSubmit(e)}
                                >Create an account</button>
                                <p className={`text-red-400 rounded text-center py-1 bg-slate-500/25 ${response ? 'block' : 'hidden'} `}>{response}</p>
                                {/* <p className={`text-green-400 rounded text-center py-1 bg-slate-500/25 ${register ? 'block' : 'hidden'} `}>User successfully registered</p> */}
                                <p className='text-sm text-center text-white'>Already have an account? <Link to='/login' className='text-redcol hover:border-b-2 border-red-500'>Login</Link></p>
                            </form>
                        </div>
                    </div>
                ) : step == 1 ? (
                    <GenreSelection setStep={setStep} />
                ) : (
                    ""
                )
            }

        </div>
    )
}

export default SignUp   