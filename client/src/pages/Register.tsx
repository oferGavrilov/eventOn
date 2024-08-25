import { RegisterForm } from 'models/user.model'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'


const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();

    const onSubmit = (data: RegisterForm) => {
        console.log(data)
    }

    const selectedRole = watch('role');

    return (
        <section className='h-screen bg-gray-100 w-full flex items-center justify-center'>
            <div className='bg-white w-full max-w-lg p-6 -mt-10 shadow-lg rounded-lg'>
                <div className='text-center mb-4'>
                    <h2 className='text-[#8dc2fa] text-2xl font-bold'>Sign up,</h2>
                    <span className='block text-lg'>to start planning</span>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <input
                            type='text'
                            placeholder='First Name'
                            className='w-full px-3 py-2 border rounded'
                            {...register('firstName', { required: 'First Name is required' })}
                        />
                        {errors.firstName && <p className='text-red-500 text-sm'>{errors.firstName.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='text'
                            placeholder='Last Name'
                            className='w-full px-3 py-2 border rounded'
                            {...register('lastName', { required: 'Last Name is required' })}
                        />
                        {errors.lastName && <p className='text-red-500 text-sm'>{errors.lastName.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full px-3 py-2 border rounded'
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full px-3 py-2 border rounded'
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                        />
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            className='w-full px-3 py-2 border rounded'
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === watch('password') || 'Passwords do not match'
                            })}
                        />
                        {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <input
                            type='text'
                            placeholder='Phone'
                            className='w-full px-3 py-2 border rounded'
                            {...register('phone', { required: 'Phone is required' })}
                        />
                        {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <select
                            className='w-full px-3 py-2 border rounded'
                            {...register('role', { required: 'Role is required' })}
                        >
                            <option value=''>Select Role</option>
                            <option value='supplier'>Supplier</option>
                            <option value='eventPlanner'>Event Planner</option>
                        </select>
                        {errors.role && <p className='text-red-500 text-sm'>{errors.role.message}</p>}
                    </div>

                    {selectedRole === 'supplier' && (
                        <div className='mb-4'>
                            <select
                                className='w-full px-3 py-2 border rounded'
                                {...register('category', { required: 'Category is required for suppliers' })}
                            >
                                <option value=''>Select Category</option>
                                <option value='photography'>Photography</option>
                                <option value='videography'>Videography</option>
                                <option value='catering'>Catering</option>
                                <option value='decor'>Decor</option>
                                <option value='music'>Music</option>
                                <option value='entertainment'>Entertainment</option>
                                <option value='transport'>Transport</option>
                                <option value='venue'>Venue</option>
                            </select>
                            {errors.category && <p className='text-red-500 text-sm'>{errors.category.message}</p>}
                        </div>
                    )}

                    <button type='submit' className='auth-submit' disabled={Object.keys(errors).length > 0}>
                        Register
                    </button>
                </form>

                <div className='mt-4 text-center'>
                    <span>Or continue with</span>
                    <div className='flex justify-center gap-4 mt-4'>
                        <span>G</span>
                        <span>F</span>
                    </div>
                </div>

                <div className='mt-4 text-center'>
                    <span>Already have an account?</span>
                    <Link to='/login' className='auth-link ml-1 text-sm'>Login</Link>
                </div>

            </div>
        </section>
    );
}

export default Register