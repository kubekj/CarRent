import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from '../services/auth.service';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import Head from 'next/head';

const Registration = () => {

    // const [registrationFailed, setRegistrationFailed] = useState(false);
    const router = useRouter();

    // const validationSchema = Yup.object().shape({
    //     firstname: Yup.string().required('Imię jest wymagane'),
    //     lastname: Yup.string().required('Nazwisko jest wymagane'),
    //     email: Yup.string().email('Nieprawidłowy format email').required('Email jest wymagany'),
    //     password: Yup.string().min(6, 'Hasło musi posiadać conajmniej 6 znaków').required('Hasło jest wymagane'),
    //     repPassword: Yup.string().required('Pole jest wymagane').when(
    //         'password', (password, field) =>
    //             password ? field.required().oneOf([Yup.ref('password')], 'Hasła muszą się zgadzać') : field
    //     )
    // });

    // const formOptions = { resolver: yupResolver(validationSchema) };

    // const { register, handleSubmit, formState } = useForm(formOptions);
    // const { errors } = formState;

    // function onSubmit({ firstname, lastname, email, password, repPassword }) {
    //     const data = {
    //         username: firstname+' '+lastname,
    //         email: email,
    //         password: password
    //     }
    //     return authService.register(data)
    //         .then(() => {
    //             const returnUrl = router.query.returnUrl || '/';
    //             router.push(returnUrl);
    //         })
    //         .catch(err => {
    //             setRegistrationFailed(true);
    //         });
    // }

    return( 
        <>
            <Head>
                <title>Rejestracja</title>
            </Head>
            <div className="section">
                <div className="registrationSection">
                    <h2>Rejestacja</h2>
                    <p>Wypełnij ponizsze dane aby się zarejestrować.</p>
                    <RegistrationForm onRegistrationHandler={() => {
                        const returnUrl = router.query.returnUrl || '/';
                        router.push(returnUrl);
                    }}/>
                    {/* <div className="fields">
                        <form id="registrationForm" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-field">
                                <input type="text" {...register('firstname')} placeholder="Imię"></input>
                                <span className="invalid-feedback">{errors.firstname?.message}</span>
                            </div>
                            <div className="form-field">
                                <input type="text" {...register('lastname')} placeholder="Nazwisko"></input>
                                <span className="invalid-feedback">{errors.lastname?.message}</span>
                                </div>
                            <div className="form-field">
                                <input type="email" {...register('email')} placeholder="Email"></input>
                                <span className="invalid-feedback">{errors.email?.message}</span>
                                </div>
                            <div className="form-field">
                                <input type="password" {...register('password')} placeholder="Hasło"></input>
                                <span className="invalid-feedback">{errors.password?.message}</span>
                            </div>
                            <div className="form-field">
                                <input type="password" {...register('repPassword')} placeholder="Powtórz hasło"></input>
                                <span className="invalid-feedback">{errors.repPassword?.message}</span>
                            </div>      
                        </form>
                    </div>
                    {registrationFailed &&
                    <div className="invalid-feedback">Błąd rejestracji</div>
                    }
                    <input disabled={formState.isSubmitting} form="registrationForm" type="submit" value="Zarejestruj się" className="rButton"></input> */}
                </div>
            </div>
        </>
    );
};

export default Registration;