import { LoginForm, RegisterForm } from "models/user.model";
import axios from "axios";

const BASE_URL = process.env.NODE_ENV === 'production' ?
    'https://production.com/api/auth' :
    'http://localhost:4000/api/auth';

export const authService = {
    login,
    register,
}

async function register(data: RegisterForm): Promise<{ message: string }> {
    try {
        const response = await axios.post(`${BASE_URL}/register`, data);
        console.log('register', response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function login({ email, password }: LoginForm): Promise<{ message: string }> {
    try {
        const response = await axios.post(`${BASE_URL}/login`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}