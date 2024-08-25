import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <header>
            <nav className='flex justify-between items-center bg-primary text-white p-2'>
                <div>
                    <Link to='/'>
                        <img src='logo.png' alt='logo' className='w-12'/>
                    </Link>
                </div>

                <div className='flex gap-4'>
                    <Link to='/'>Home</Link>
                    <Link to='/events'>Events</Link>
                    <Link to='/services'>Services</Link>
                    <Link to='/profile'>Profile</Link>
                    <Link to='/inquiries'>Inquiries</Link>
                </div>

                <div className='flex gap-4'>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header