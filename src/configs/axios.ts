import axios, { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-hot-toast';

export const API = axios.create({
    baseURL: 'http://localhost:3000',
});

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if ((error as AxiosError).response?.status === StatusCodes.FORBIDDEN) {
            toast.error('Refresh timeout!');
        }
        return Promise.reject((error as AxiosError).response?.data);
    },
);
