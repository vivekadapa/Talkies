import { React, useState } from 'react'
import { FcClapperboard } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass] = useState("");
    const [errorRepeatPass, setErrorRepeatPass] = useState("");
    const [response, setResponse] = useState("");
    const [register,setRegister] = useState(false);


    const navigate = useNavigate();

    function validateEmail(e) {
        const emailregx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (e.target.value === "") {
            setErrorEmail("Can't be Empty");
            return false;
        }

        else if (!emailregx.test(e.target.value)) {
            setErrorEmail("Invalid Email")
            return false;
        }

        else {
            setErrorEmail("");
            return true;
        }
    }

    function validatePass(e) {
        if (e.target.value === "") {
            setErrorPass("Can't be Empty");
            return false;
        }

        else if (e.target.value.length < 6) {
            setErrorPass("Should be atleast 6 characters");
            return false;
        }

        else {
            setErrorPass("");
            return true;
        }
    }

    function validateRepeatPass(e) {
        if (e.target.value !== password) {
            setErrorRepeatPass("Try Again")
            return false;
        }
        else {
            setErrorRepeatPass("");
            return true;
        }
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleRepeatPass(e) {
        setRepeatPass(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (errorEmail === "" && errorPass === "" && errorRepeatPass === "" && email !== "" && password !== "" && repeatPass !== "") {
            const configuration = {
                method: "post",
                url: "https://talkiees.onrender.com/signup",
                data: {
                    email,
                    password
                }
            }

            try {
                const result = await axios(configuration);
                setRegister(true);
                navigate('/login');
                console.log(result);
            } catch (error) {
                console.log(error);
                setResponse(error.response.data.message);
            }
            console.log("Submitted");
        }
        else {
            console.log("Not submitted");
        }

    }


    return (
        <div className='bg-bgdarkb min-h-screen min-w-screen flex flex-col justify-center items-center'>
            <div className='max-[480px]:w-5/6 w-[400px] max-[421px]:w-full'>
                <FcClapperboard className='clap text-4xl my-8 mx-auto' />
                <div className='px-8 max-[301px]:p-2 py-4 bg-bgblue rounded-2xl shadow-2xl font-thin'>
                    <h1 className='p-4 text-3xl text-white'>Register</h1>
                    <form action="" className='relative p-4 max-[361px]:p-0 flex flex-col gap-6'>
                        <input type="text" placeholder='Email Address'
                            className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${errorEmail ? 'border-redcol' : 'border-slate-300'}`}
                            onChange={handleEmail} onKeyUp={validateEmail}
                        />

                        <span className='absolute text-sm right-0 translate-y-1/2 text-redcol'>{errorEmail}</span>
                        <input type="password" placeholder='Password' className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${errorPass ? 'border-redcol' : 'border-slate-300'}`}
                            onChange={handlePassword}
                            onKeyUp={validatePass}
                        />
                        <span className='absolute text-sm top-20 right-0 translate-y-1/2 text-redcol'>{errorPass}</span>
                        <input type="password" placeholder='Repeat Password' className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${errorRepeatPass ? 'border-redcol' : 'border-slate-300'}`}
                            onChange={handleRepeatPass}
                            onKeyUp={validateRepeatPass}
                        />
                        <span className='absolute text-sm top-36 right-0 translate-y-1/2 text-redcol'>{errorRepeatPass}</span>
                        <button type='submit' className='bg-redcol text-white hover:transition-all hover:ease-in hover:duration-150 p-2 rounded hover:text-redcol hover:bg-white'
                            onClick={(e) => handleSubmit(e)}
                        >Create an account</button>
                        <p className={`text-red-400 rounded text-center py-1 bg-slate-500/25 ${response ? 'block':'hidden'} `}>{response}</p>
                        <p className={`text-green-400 rounded text-center py-1 bg-slate-500/25 ${register ? 'block':'hidden'} `}>User successfully registered</p>
                        <p className='text-sm text-center text-white'>Already have an account? <a href='/' className='text-redcol hover:border-b-2 border-red-500'>Login</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp   