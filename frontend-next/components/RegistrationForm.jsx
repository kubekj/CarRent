import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { authService } from '../services/auth.service';
import { useState } from 'react';
import { errorHandler } from '../common/error-handler';

const RegistrationForm = (props) => {
    const { onRegistrationHandler } = props;

    const phoneRegExp = /^(\+48){0,1}\d{9}$/

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Imię jest wymagane'),
        lastname: Yup.string().required('Nazwisko jest wymagane'),
        email: Yup.string().email('Nieprawidłowy format email').required('Email jest wymagany'),
        phone: Yup.string().matches(phoneRegExp, 'Nieprawidłowy format numeru telefonu').required('Telefon jest wymagany'),
        password: Yup.string().min(6, 'Hasło musi posiadać conajmniej 6 znaków').required('Hasło jest wymagane'),
        repPassword: Yup.string().required('Pole jest wymagane').when(
            'password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')], 'Hasła muszą się zgadzać') : field
        )
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ firstname, lastname, email, phone, password, repPassword }) {
        const data = {
            username: firstname+' '+lastname,
            email: email,
            phone: phone,
            password: password
        }
        return authService.register(data)
            .then(() => {
                onRegistrationHandler();
            })
            .catch(err => {
                if (err.response.data.error.status === 400) {
                    errorHandler(err, "Błąd rejestracji")
                } else {
                    errorHandler(err)
                }
            });
    }

    return( 
        <>
            <div className="fields">
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
                        <input type="text" {...register('phone')} placeholder="Telefon"></input>
                        <span className="invalid-feedback">{errors.phone?.message}</span>
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
            <input disabled={formState.isSubmitting} form="registrationForm" type="submit" value="Zarejestruj się" className="rButton"></input>
        </>
    );
};

export default RegistrationForm;