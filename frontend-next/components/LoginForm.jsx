import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from '../services/auth.service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { errorHandler } from '../common/error-handler';

const LoginForm = (props) => {
    const { onLoginHandler } = props;

    // const [loginFailed, setLoginFailed] = useState(false);

    const validationSchema = Yup.object().shape({
        username: Yup.string().email('Nieprawiłowy format Email').required('Email jest wymagany'),
        password: Yup.string().required('Hasło jest wymagane')
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        const data = {
            email: username,
            password: password
        }
        const x = authService.login(data)
            .then(() => {
                onLoginHandler();
                // const returnUrl = router.query.returnUrl || '/';
                // router.push(returnUrl);
            })
            .catch(err => {
                //console.log(err)
                // setLoginFailed(true);
                //toast.error("Błąd logowania");
                if (err.response.data.error.status === 400) {
                    errorHandler(err, "Nieprawidłowy email lub hasło")
                } else {
                    errorHandler(err)
                }
            });
    }

    return( 
        <>
            <div className="fields">
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
            {/* {loginFailed &&
            <div className="invalid-feedback">Błąd logowania</div>
            } */}
            <input disabled={formState.isSubmitting} form="loginForm" type="submit" value="Zaloguj się" className="linButton"></input>
        </>
    )
}

export default LoginForm;