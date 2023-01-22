import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import valid from 'card-validator';

const CreditCardForm = (props) => {
    const { onSubmitHandler } = props;
  
    const cardValidationSchema = Yup.object().shape({
        creditCardNumber: Yup.string().test('card-test',
                                            'Nieprawidłowy numer karty',
                                            value => valid.number(value).isValid)
                                            .required(),
        cvv: Yup.string().test('cvv-test',
                              'Błędny numer CVV',
                              value => valid.cvv(value).isValid)
                              .required(),
        firstname: Yup.string().required('Imię jest wymagane'),
        lastname: Yup.string().required('Nazwisko jest wymagane'),
        expirationDate: Yup.string().test('date-test',
                                          'Nieprawidłowa data ważności',
                                          value => valid.expirationDate(value).isValid)
                                          .required()
    });
  
    const cardFormOptions = { resolver: yupResolver(cardValidationSchema) };
  
    const { register, handleSubmit, formState } = useForm(cardFormOptions);
    const { errors } = formState;

    return( 
        <>
            <form id="paymentForm" className="paymentForm" onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className="form-paymentField">
                        <input type="text" {...register('firstname')} placeholder="Imię"></input>
                        <span className="invalid-feedback-payment">{errors.firstname?.message}</span>
                    </div>
                    <div className="form-paymentField">
                        <input type="text" {...register('lastname')} placeholder="Nazwisko"></input>
                        <span className="invalid-feedback-payment">{errors.lastname?.message}</span>
                    </div>
                    <div className="form-paymentField">
                        <input type="text" {...register('creditCardNumber')} placeholder="Nr Karty"></input>
                        <span className="invalid-feedback-payment">{errors.creditCardNumber?.message}</span>
                    </div>
                    <div className="flexFields">
                      <div className="form-paymentField">
                          <input type="text" {...register('expirationDate')} placeholder="Data wazności"></input>
                          <span className="invalid-feedback-payment">{errors.expirationDate?.message}</span>
                      </div>
                      <div className="form-paymentField">
                          <input type="text" {...register('cvv')} placeholder="CVV"></input>
                          <span className="invalid-feedback-payment-CVV">{errors.cvv?.message}</span>
                      </div>
                    </div>
                  </form>
        </>
    )
}

export default CreditCardForm;