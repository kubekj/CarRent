import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Link from 'next/link';
import { authService } from '../services/auth.service';
import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Head from 'next/head';

const Login = () => {
    // const [loginFailed, setLoginFailed] = useState(false);
    const router = useRouter();

    // const validationSchema = Yup.object().shape({
    //     username: Yup.string().email('Nieprawiłowy format email').required('Email jest wymagany'),
    //     password: Yup.string().required('Password is required')
    // });

    // const formOptions = { resolver: yupResolver(validationSchema) };

    // const { register, handleSubmit, formState } = useForm(formOptions);
    // const { errors } = formState;

    // function onSubmit({ username, password }) {
    //     const data = {
    //         email: username,
    //         password: password
    //     }
    //     return authService.login(data)
    //         .then(() => {
    //             // get return url from query parameters or default to '/'
    //             const returnUrl = router.query.returnUrl || '/';
    //             router.push(returnUrl);
    //         })
    //         .catch(err => {
    //             setLoginFailed(true);
    //         });
    // }

    return( 
        <>
        <Head>
            <title>Logowanie</title>
        </Head>
        <div className="section">
            <div className="loginSection">
                <h2>Logowanie</h2>
                <p>Wypełnij ponizsze dane aby sie zalogować. Nie masz jeszcze konta?</p>
                <Link href="/registration">Zarejestruj się</Link>
                <LoginForm onLoginHandler={() => {
                    const returnUrl = router.query.returnUrl || '/';
                    router.push(returnUrl);
                }}/>
                {/* <div className="fields">
                    <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-field">
                            <input type="text" {...register('username')} className="email" placeholder="Email"></input>
                            <span className="invalid-feedback">{errors.username?.message}</span>
                        </div>
                        <div className="form-field">
                            <input type="password" {...register('password')} className="password" placeholder="Hasło"></input>
                            <span className="invalid-feedback">{errors.password?.message}</span>
                        </div>
                    </form>
                </div>
                {loginFailed &&
                <div className="invalid-feedback">Błąd logowania</div>
                }
                <input disabled={formState.isSubmitting} form="loginForm" type="submit" value="Zaloguj się" className="linButton"></input> */}
            </div>
        </div>
        </>
    )
};

export default Login