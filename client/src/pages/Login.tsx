import { LoginForm } from 'models/user.model';
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Login = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = (data) => {
        console.log(data)
    }

    return (
        <section className='h-screen bg-gray-100 w-full flex items-center justify-center'>
            <div className='bg-white w-1/2 max-w-lg p-8 -mt-20 shadow-lg rounded-lg'>
                <img src="logo.png" alt="Logo" className='w-24 mb-4 mx-auto' />
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div>
                        <input type="email" placeholder='Email' className='auth-input' {...register('email', { required: 'Email is required' })} />
                        {errors.email && <span className='auth-error'>{errors.email.message}</span>}
                    </div>
                    <div className='relative mb-4'>
                        <input type="password" placeholder='Password' className='auth-input' {...register('password', { required: 'Password is required' })} />
                        {errors.password && <span className='auth-error'>{errors.password.message}</span>}
                        <Link to='/forgot-password' className='auth-link absolute right-0 -bottom-5'>Forgot password?</Link>
                    </div>

                    <button type="submit" className='auth-submit' disabled={Object.keys(errors).length > 0}>Login</button>
                </form>

                <div className='mt-4 text-center'>
                    <span>Or continue with</span>
                    <div className='flex justify-center gap-4 mt-4'>
                        <span>G</span>
                        <span>F</span>
                    </div>
                </div>

                <div className='mt-4 text-center'>
                    <span>Don't have an account?</span>
                    <Link to='/register' className='auth-link ml-1 text-sm'>Register</Link>
                </div>
            </div>
        </section>
    )
}

export default Login