import { authService } from "../services/auth.service";
import axios from 'axios';
import getConfig from "next/config";
import { toast } from 'react-toastify';

const { publicRuntimeConfig } = getConfig();

export const axiosWrapper = {
    get,
    post,
    put
};

async function get(url) {
    console.log(authHeader(url));
    const instance = axios.create({
        baseURL: publicRuntimeConfig.apiUrl,
        timeout: 5000,
        headers: authHeader(url)
    });
    return instance.get(url).then(handleResponse);
}

async function post(url, body) {
    const instance = axios.create({
        baseURL: publicRuntimeConfig.apiUrl,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(url)
        }
      });
    return instance.post(url, body).then(handleResponse);
}

async function put(url, body, id) {
    const instance = axios.create({
        baseURL: publicRuntimeConfig.apiUrl,
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(url)
        }
      });
    return instance.put(url+'/'+id, body).then(handleResponse);
}

function authHeader(url) {
    const user = authService.userValue;
    const isLoggedIn = user && user.token;
    if (isLoggedIn) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    const data = response.data;
    
    if (response.status !== 200) {
        console.log(response);
        if ([401, 403].includes(response.status) && userService.userValue) {
            toast.error('Operacja się nie powiodła')
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}