import React, { useState } from 'react'
import {FcClapperboard} from 'react-icons/fc'



const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorEmail,setErrorEmail] = useState("");
    const [errorPass,setErrorPass] = useState("");
    
    function validateEmail(e){
        if(e.target.value === ""){
            setErrorEmail("Can't be Empty");
            return false;
        }
        else{
            setErrorEmail("");
            return true;
        }
    }

    function validatePass(e){
        if(e.target.value === ""){
            setErrorPass("Can't be Empty");
            return false;
        }
        else{
            setErrorPass("");
            return true;
        }
    }

    function handleEmail(e){ 
        setEmail(e.target.value); 
    }

    function handlePassword(e){
        setPassword(e.target.value);
        console.log(password);
    }

    function handleSubmit(e){
        e.preventDefault();
        if(email === "" && password === ""){
            console.log("Not submitted");
        }
        else{
            console.log("Submitted");
        }
        
    }


  return (
    <div className='bg-bgdarkb min-h-screen min-w-screen flex flex-col justify-center items-center'>
        <div className='max-[480px]:w-5/6 w-[400px] max-[421px]:w-full'>
            <FcClapperboard className='clap text-4xl my-8 mx-auto' />
            <div className='px-8 max-[301px]:p-2 py-4 bg-bgblue rounded-2xl shadow-2xl font-thin'>
                <h1 className='p-4 text-3xl text-white'>Login</h1>
                <form action="" className='relative p-4 max-[361px]:p-0 flex flex-col gap-6'>
                    <input type="text" placeholder='Email Address' 
                    className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${errorEmail ? 'border-redcol' : 'border-slate-300'}`} 
                    onChange={handleEmail}  onKeyUp={validateEmail}
                    />

                    <span className='absolute text-sm right-0 translate-y-1/2 text-redcol'>{errorEmail}</span>
                    <input type="text" placeholder='Password' className={`block bg-bgblue px-4 py-2 outline-none text-white border-b-2  ${errorPass ? 'border-redcol' : 'border-slate-300'}`}
                    onChange={handlePassword}
                    onKeyUp={validatePass}
                    />
                     <span className='absolute text-sm top-20 right-0 translate-y-1/2 text-redcol'>{errorPass}</span>
                    <button type='submit' className='bg-redcol text-white hover:transition-all hover:ease-in hover:duration-150 p-2 rounded hover:text-redcol hover:bg-white'
                    onClick={handleSubmit}
                    >Login to your account</button>
                    <p className='text-sm text-center text-white'>Don't have an account? <a href='/' className='text-redcol hover:border-b-2 border-red-500'>Sign Up</a></p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
