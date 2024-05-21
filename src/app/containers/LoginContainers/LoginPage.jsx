import React, { useState } from 'react'
import TRADE_IMG from '../../../images/trade1.png'
import GOOGLE_IMG from '../../../images/google_image.png'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import UsersService from '../../services/users/index'

function LoginPage() {
    const navigate = useNavigate()

    const [formState, setFormState] = useState({ username: '', password: '' })

    const handleInputChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await UsersService.signIn(formState.username, formState.password)
            if (response)  {
                Cookies.set('access_token', response.access_token)
                console.log(response)
                navigate('/')
            }
        } catch (error) {
            console.error("Registration failed:", error.message)
        }
    }
    return (
        <div className=' w-full h-screen flex items-start'>
            {/* image */}
            <div className=' w-1/2 h-full flex flex-col'>
                {/* text on the image */}
                <div className=' absolute top-[20%] left-[15%] flex flex-col'>
                    <h1 className=' text-4xl text-white font-bold my-4'>Turn your ideas into reality</h1>
                    <p className=' text-xl text-white font-normal'>Start for free and get attractive offers from the community</p>
                </div>
                <img src={TRADE_IMG}
                    className=' w-full h-full object-cover'
                />
            </div>
            {/* login inputs */}
            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
                <h1 className='w-full text-xl mx-auto max-w-[80%] text-[#060606] font-semibold mr-auto'>Finance Tracker</h1>
                
                <div className=' w-full flex flex-col max-w-[80%]'>
                    {/* header text */}
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className=' text-3xl font-semibold mb-2'>Login</h3>
                        <p className=' text-base mb-2'>Welcome Back! Please enter your details.</p>
                    </div>

                    {/* inputs*/}
                    <form className='w-full mx-0 my-0 p-0' onSubmit={handleSubmit}>
                        <div className=' w-full flex flex-col'>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder='Username'
                                className=' w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                onChange={handleInputChange}
                            />

                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                className=' w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* remember me panel */}
                        <div className=' w-full flex items-center justify-between'>
                            <div className='w-full flex items-center'>
                                <input type='checkbox' className='w-4 h-4 mr-2' />
                                <p className=' text-sm'>Remeber me for 30 days</p>
                            </div>

                            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password?</p>
                        </div>

                        {/* Buttons */}
                        <div className='w-full flex flex-col my-4'>
                            <button type='submit' className=' w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                                Log In
                            </button>
                        </div>
                    </form>

                    {/* sign in with google */}
                    {/* <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className=' text-lg absolute text-black/80 bg-[#f5f5f5]'> or </p>
                    </div> */}

                    {/* sign in with google button */}
                    {/* <div className=' w-full text-[#060606] my-2 font-semibold bg-[#f5f5f5] border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                        <img src={GOOGLE_IMG} className=' h-7 w-7 mr-2'/>
                        Sign In With Google
                    </div> */}
                </div>
                {/* bottom text */}
                <div className='w-full flex items-center justify-center'>
                    <p className=' text-sm font-normal text-[#060606]'>
                        Don`t have an account? 
                        <span className=' font-semibold underline underline-offset-2 cursor-pointer'><Link to={'/registration'}> Sign up for free</Link></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage