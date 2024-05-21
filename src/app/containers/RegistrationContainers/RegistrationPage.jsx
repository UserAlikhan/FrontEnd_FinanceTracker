import React, { useState } from 'react'
import TRADE_IMG from '../../../images/trade.png'
import GOOGLE_IMG from '../../../images/google_image.png'
import { Link, useNavigate } from 'react-router-dom'
import UsersService from '../../services/users/index'

function RegistrationPage() {
    const navigate = useNavigate()

    const [formState, setFormState] = useState({ username: '', email: '', password: '' })

    const handleInputChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await UsersService.signUp(formState.email, formState.password, formState.username)
            if (response)  {
                navigate('/login')
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

            {/* main form */}
            <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
                <h1 className='w-full text-xl mx-auto max-w-[80%] text-[#060606] font-semibold mr-auto'>Finance Tracker</h1>
                
                <div className=' w-full flex flex-col max-w-[80%]'>
                    {/* header text */}
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className=' text-3xl font-semibold mb-2'>Sign Up</h3>
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
                                value={formState.username}
                                onChange={handleInputChange}
                            />

                            <input
                                type='email'
                                id='email'
                                name='email'
                                placeholder='Email'
                                className=' w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                value={formState.email}
                                onChange={handleInputChange}
                            />

                            <input
                                type='password'
                                id='password'
                                name='password'
                                placeholder='Password'
                                className=' w-full text-[#060606] py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                value={formState.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Buttons */}
                        <div className='w-full flex flex-col my-4'>
                            <button className=' w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                                Sign Up
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
                        Sign Up With Google
                    </div> */}
                </div>
                
                {/* bottom text */}
                <div className='w-full flex items-center justify-center'>
                    <p className=' text-sm font-normal text-[#060606]'>
                        Already have an account? 
                        <span className=' font-semibold underline underline-offset-2 cursor-pointer'><Link to={'/login'}> Sign in</Link></span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage