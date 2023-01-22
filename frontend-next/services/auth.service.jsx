import { BehaviorSubject } from 'rxjs';
import jwtDecode from "jwt-decode";
import { axiosWrapper } from '../common/axios-wrapper';
import Router from 'next/router';

const userSubject = new BehaviorSubject((typeof window !== "undefined") && JSON.parse(localStorage.getItem('user')));

export const authService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    register,
    isAuthenticated,
    getCurrentUser,
    logout
};

function login(data) {
    return axiosWrapper.post('/api/auth/local', {
        identifier: data.email,
        password: data.password
    })
    .then(loginHandler);
};

function register(data) {
    return axiosWrapper.post('/api/auth/local/register', data)
    .then(loginHandler);
};

function loginHandler(response) {
    const data = {
        token: response.jwt,
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        phone: response.user.phone ? response.user.phone : ''
    }

    userSubject.next(data);
    localStorage.setItem('user', JSON.stringify(data));

    return response;
}

function getCurrentUser() {
    let user = (typeof window !== "undefined") && JSON.parse(localStorage.getItem('user'));
    if(user) {
        const tokenDecoded = jwtDecode(user.token);
        user.tokenExp = tokenDecoded.exp*1000;
    }
    return user;
}

function isAuthenticated() {
    const user = getCurrentUser();
    if (user && (Date.now() <= user.tokenExp)) {
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}