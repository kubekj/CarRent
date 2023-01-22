import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { carsService } from "../../../services/cars.service";
import LocationIcon from '../../../assets/icons/location-icon.png'
import CalendarIcon from '../../../assets/icons/calendar-icon.png'
import ClockIcon from '../../../assets/icons/clock-icon.png'
import { registerLocale } from 'react-datepicker'
import pl from 'date-fns/locale/pl'
import setHours from "date-fns/setHours";
import setMinutes from  "date-fns/setMinutes";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment"
import * as Yup from 'yup';
import DatePickerController from "../../../components/DatePickerController";
import { authService } from "../../../services/auth.service";
import RegistrationForm from "../../../components/RegistrationForm";
import LoginForm from "../../../components/LoginForm";
import Link from "next/link";
import CreditCardForm from "../../../components/CreditCardForm";
import { errorHandler } from "../../../common/error-handler";
import { toast } from 'react-toastify';
import Head from "next/head";

export default function Rental() {
    const router = useRouter();
    const {id} = router.query;
    const onTheSpotPayment = 'onTheSpot';
    const creditCardPayment = 'creditCard';

    // const timeMinVal = setHours(setMinutes(new Date(), 0), 9);
    // const timeMaxVal = setHours(setMinutes(new Date(), 0), 21);

    const pickUpTime = setHours(setMinutes(new Date(), 0), 12);
    const dropOffTime = setHours(setMinutes(new Date(), 0), 9);
    
    const pickUpMinDate = addDays(setHours(setMinutes(new Date(), 0), 12), 1)

    const [creditCardData, setCreditCardData] = useState({});
    const [personData, setPersonData] = useState({});
    const [reservationId, setReservationId] = useState(-1);
    const [dropOffMinDate, setDropOffMinDate] = useState(addDays(setHours(setMinutes(pickUpMinDate, 0), 9), 1));
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoginPageView, setIsLoginPageView] = useState(false);
    const [isPaymentPageView, setIsPaymentPageView] = useState(false);
    const [isPersonalDataPageView, setIsPersonalDataPageView] = useState(false);
    const [isSummaryPageView, setIsSummaryPageView] = useState(false);
    const [pickUpDate, setPickUpDate] = useState();
    const [dropOffDate, setDropOffDate] = useState();
    const [isReservationPaid, setIsReservationPaid] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('onTheSpot');
    const [datesFormErrorMessage, setDatesFormErrorMessage] = useState('');
    const [carSummaryData, setCarSummaryData] = useState({
      gallery: []
    });
    
    registerLocale('pl', pl);

    useEffect(() => {
        let mounted = true;
        carsService
          .getCarSummary(id)
          .then(car => {
            if(mounted) {
              setCarSummaryData(car);
              // if (car.reservations.length > 1) {
              //   car.reservations.reduce((accumulator, currentValue) => {
              //     const nextDateFrom = moment(currentValue.dateFrom);
              //     const currentDateTo = moment(accumulator.dateTo);
              //     if (nextDateFrom.diff(currentDateTo, 'days') > 1 && moment(pickUpDate).isSame(pickUpMinDate)) {
              //       setPickUpDate(currentDateTo.add(1, 'days').toDate());
              //     }
              //     return currentValue;
              //   })
              // } else if (car.reservations.length === 1) {
              //   if (moment().diff(car.reservations[0].dateFrom) > 0) {
              //     var dateOfPickUp = moment(car.reservations[0].dateTo);
              //     dateOfPickUp.add(1, 'days');
              //     dateOfPickUp.set({'hour': 12, 'minute': 0});
              //     setPickUpDate(dateOfPickUp.toDate());
              //   }
              // }
            }
          })
          .catch(err => {
            errorHandler(err);
          })
        return () => mounted = false;
      }, [id]);

    useEffect(() => {
      // if (!dropOffDate && pickUpDate) {
      //   setDropOffDate(moment(date).add(1, 'days').toISOString());
      //   return;
      // }

      if (!dropOffDate && !pickUpDate) return;

      setDropOffMinDate(addDays(pickUpDate, 1));
      if (pickUpDate >= dropOffDate || !dropOffDate) {
        setDropOffDate(addDays(pickUpDate, 1))
      }

      const rentalDays = moment(dropOffDate).diff(pickUpDate, 'days');
      // const rentalTimeMillis = dropOffDate.getTime() - pickUpDate.getTime();
      // const daysOfRental = Math.round(rentalTimeMillis/(1000*60*60*24));
      // const price = daysOfRental*carSummaryData.pricePerDay;

      setTotalPrice(rentalDays*carSummaryData.pricePerDay);
    }, [pickUpDate, dropOffDate, carSummaryData.pricePerDay]);

    const dateValidationSchema = Yup.object({
      dateOfPickUp: Yup
        .string()
        .nullable()
        .required("Pole jest wymagane")
        .test("dateFormatPickUp", "Data ma nieprawidłowy format", function (value) {
          return moment(value).isValid();
        }),
        // .test("pickUpDateInterference", "Data odbioru koliduje z inną rezerwacją", function (value) {
        //   let testPassed = true;
        //   carSummaryData.reservations?.forEach(res => {
        //     if (moment(value) > res.dateFrom) {
        //       testPassed = false;
        //     }
        //   })
        // }),
      dateOfDropOff: Yup
        .string()
        .nullable()
        .test("dateFormatDropOff", "Data ma nieprawidłowy format", function (value) {
          return moment(value).isValid();
        })
        .test("dateInterference", "Daty kolidują z inną rezerwacją", function (value) {
          let testPassed = true;
          carSummaryData.reservations?.forEach(res => {
            if (!(moment(value).isBefore(res.dateFrom) || moment(pickUpDate).isAfter(res.dateTo))) {
              testPassed = false;
              return;
            }
          })
          return testPassed;
        }),
    });

    const { handleSubmit, control } = useForm({
      resolver: yupResolver(dateValidationSchema)
    });

    const submitForm = (data) => {      
      const finalPickUpDate = moment(pickUpDate).hour(12).minute(0).toISOString();
      const finalDropOffDate = moment(dropOffDate).hour(9).minute(0).toISOString();

      // carSummaryData.reservations?.forEach(reservation => {
      //   if (!(moment(finalDropOffDate).isBefore(reservation.dateFrom) || moment(finalPickUpDate).isAfter(reservation.dateTo))) {
      //       setDatesFormErrorMessage('Daty wypożyczenia nachodzą na siebie');
      //       return;
      //   }
      // });

      carsService.createRawReservation({
        pickUpDate: finalPickUpDate,
        dropOffDate: finalDropOffDate,
        totalPrice: totalPrice,
        carId: id
      }).then(data => {
        setReservationId(data);
        setPickUpDate(finalPickUpDate);
        setDropOffDate(finalDropOffDate);
        if (!authService.isAuthenticated()){
          goToLoginPage();
        } else {
          goToPersonalDataPage();
        }
      })
      .catch(err => {
        errorHandler(err);
      })
    };

    // function setPickUpAndDropOffFirstDate(date) {
    //   setPickUpDate(date.toISOString());
    //   setDropOffDate(date);
    //   // setDropOffDate(moment(date).add(1, 'days').toISOString());
    //   console.log(dropOffDate)
    // }
    
    // function getPaymentType() {
    //   return isCreditCardPayment ? onTheSpotPayment : creditCardPayment;
    // }

    function isLoginView() {
      return isLoginPageView && !isPaymentPageView && !isSummaryPageView && !isPersonalDataPageView;
    }

    function isPaymentView() {
      return !isLoginPageView && isPaymentPageView && !isSummaryPageView && !isPersonalDataPageView;
    }

    function isPersonalDataView() {
      return !isLoginPageView && !isPaymentPageView && !isSummaryPageView && isPersonalDataPageView;
    }

    function isSummaryView() {
      return !isLoginPageView && !isPaymentPageView && isSummaryPageView && !isPersonalDataPageView;
    }

    function isRentalDatesView() {
      return !isLoginPageView && !isPaymentPageView && !isSummaryPageView && !isPersonalDataPageView;
    }

    function goToLoginPage() {
      setIsLoginPageView(true);
      setIsPaymentPageView(false);
      setIsSummaryPageView(false);
      setIsPersonalDataPageView(false);
    }

    function goToPaymentPage() {
      carsService.assignUserToReservation(reservationId)
        .then(() => {
          setIsLoginPageView(false);
          setIsPaymentPageView(true);
          setIsSummaryPageView(false);
          setIsPersonalDataPageView(false);
        }).
        catch(err => {
          errorHandler(err);
        })
    };

    function goToPersonalDataPage() {
      const user = {
        firstname: authService.userValue.username.split(' ')[0],
        lastname: authService.userValue.username.split(' ')[1],
        email: authService.userValue.email,
        phone: authService.userValue.phone
      }

      setPersonData(user);
      setIsLoginPageView(false);
      setIsPaymentPageView(false);
      setIsSummaryPageView(false);
      setIsPersonalDataPageView(true);
    }
    
    function goToSummaryPage(data) {
      setCreditCardData(data);
      carsService.payForReservation(reservationId, paymentMethod)
        .then((isPaid) => {
          setIsReservationPaid(isPaid);

          if (isPaid) {
            if (paymentMethod === creditCardPayment) toast.success("Pomyślnie zapłacono")
            setIsLoginPageView(false);
            setIsPaymentPageView(false);
            setIsSummaryPageView(true);
            setIsPersonalDataPageView(false);
          }
        })
        .catch(err => {
          errorHandler(err);
        });
    }

    function onPaymentChange(event) {
      setPaymentMethod(event.target.value);
      // setIsCreditCardPayment(event.target.value === creditCardPayment);
    }

    if(isRentalDatesView()) {
      return( 
        <>
        <Head>
          <title>Rezerwacja Samochodu</title>
        </Head>
          <div className="rentalSection">
            <div className="title">
              <h2>Dane wynajmu</h2>
            </div>
            <div className="rentalContent">
            <Image alt="car image" src={carSummaryData.carPictureUrl} width={750} height={498} className="carImage2"/>
            <div className="rentalDetails">
              <div className="carSummary">
                <div className="field">
                  <p>Marka</p>
                  <h1>{carSummaryData.brand}</h1>
                </div>
                <div className="field">
                  <p>Model</p>
                  <h1>{carSummaryData.model}</h1>
                </div>
                <div className="field">
                  <p>Rocznik</p>
                  <h1>{carSummaryData.year}</h1>
                </div>
              </div>
              
              <form noValidate id='form' onSubmit={handleSubmit(submitForm)} className="rentalDatesForm">
                <div className="rentalDateDetails">
                  <p>Odbiór</p>
                  <div className="rentalDateField">
                    <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                    <span>Tarnowska 22, Warszawa</span>
                  </div>
                  <div className="rentalDateField">
                    <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                    <DatePickerController
                      ctrlName="dateOfPickUp"
                      control={control}
                      onDateChange={setPickUpDate}
                      selected={pickUpDate}
                      minDate={pickUpMinDate}
                      placeholderText="Wybierz datę odbioru auta"
                      excludeDateIntervals = {
                        carSummaryData.reservations?.map(res => {
                          return {
                            'start': subDays(new Date(res.dateFrom),1),
                            'end': new Date(res.dateTo)
                          }
                        })
                      }
                    />
                  </div>
                  <div className="rentalDateField">
                    <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                    <span>{`${pickUpTime.getHours() === 0 ? "00" : pickUpTime.getHours() }:${pickUpTime.getMinutes() === 0 ? "00" : pickUpTime.getMinutes()}`}</span>
                    {/* <DatePickerController
                      // selected={pickUpDate}
                      ctrlName="timeOfPickUp"
                      control={control}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Godzina"
                      dateFormat="HH:mm"
                      minTime={timeMinVal}
                      maxTime={timeMaxVal}
                      onDateChange={setPickUpAndDropOffTime} /> */}
                  </div>
                </div>

                {/* <span className="invalid-feedback">{dateValidationSchema.err}</span> */}

                <div className="rentalDateDetails">
                  <p>Zwrot</p>
                  <div className="rentalDateField">
                    <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                    <span>Tarnowska 22, Warszawa</span>
                  </div>
                  <div className="rentalDateField">
                    <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                    <DatePickerController
                      ctrlName="dateOfDropOff"
                      control={control}
                      onDateChange={setDropOffDate}
                      selected={dropOffDate}
                      minDate={dropOffMinDate}
                      placeholderText="Wybierz datę zwrotu auta"
                      excludeDateIntervals = {
                        carSummaryData.reservations?.map(res => {
                          return {
                            'start': new Date(res.dateFrom),
                            'end': new Date(res.dateTo)
                          }
                        })
                      }
                    />
                  </div>
                  <div className="rentalDateField">
                    <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                    <span>{`${dropOffTime.getHours() === 0 ? "00" : dropOffTime.getHours() }:${dropOffTime.getMinutes() === 0 ? "00" : dropOffTime.getMinutes()}`}</span>
                  </div>
                </div>
                <span className="invalid-feedback">{datesFormErrorMessage}</span>
              </form>
              <div className="priceField">
                <p>Cena</p>
                <h2>{totalPrice} zł</h2>
              </div>
            </div>              
            <div className="rentalSummary">
              <Image alt="car image" src={carSummaryData.carPictureUrl} width={750} height={498} className="carImage"/>
              <div className="priceField2">
                <div className="priceRental">
                  <p>Cena</p>
                  <h2>{totalPrice} zł</h2>
                </div>
                <div className="submitRental">
                  <input type="submit" form="form" className="nextButton2" value="Dalej"></input>
                </div>
              </div>
            </div>
            </div>
            <div className="summaryAndPrice">
              <input type="submit" form="form" className="nextButton" value="Dalej"></input>
            </div>
          </div>
        </>
      );
    } else if (isPersonalDataView()) {
      return(
        <>
        <Head>
          <title>Rezerwacja - Dane osobowe</title>
        </Head>
          <div className="pDSection">
            <div className="personDataSection">
              <div className="personData_pageTitle">
                <h2>Dane osobowe</h2>
                <p>Dane osobowe wynajmujacego</p>
              </div>
              <div className="personDataSection_fields">
                <div className="personData_form-field">
                  <label for="fname">Imię:</label>
                  <input type="text" name="fname" placeholder={personData.firstname} disabled></input>
                </div>
                <div className="personData_form-field">
                  <label for="lname">Nazwisko:</label>
                  <input type="text" name="lname" placeholder={personData.lastname} disabled></input>
                </div>
                <div className="personData_form-field">
                  <label for="email">Email:</label>
                  <input type="email" name="email" placeholder={personData.email} disabled></input>
                </div>
                <div className="personData_form-field">
                  <label for="phoneNumber">Telefon:</label>
                  <input type="text" name="phoneNumber" placeholder={personData.phone} disabled></input>  
                </div>
              </div>
              <div className="personDataSection_submitButton">
                <input type="submit" className="nextButton" onClick={() => goToPaymentPage()} value="Dalej"></input>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isLoginView()) {
      return(
        <>
          <div className="section">
            <div className="pageTitle">
              <h2>Dane osobowe</h2>
            </div>
            <div className="forms">
              <div className="registrationSection">
                <div className="label">
                  <p>Nie masz konta? Zarejestuj się</p>
                </div>
                <RegistrationForm onRegistrationHandler={goToPersonalDataPage}/>
              </div>
              <div className="separator"></div>
              <div className="loginSection">
                <div className="label">
                  <p>Masz już konto? Zaloguj się</p>
                </div>
                <LoginForm onLoginHandler={goToPersonalDataPage}/>
              </div>
            </div>
          </div>
        </>
      );
    } else if (isPaymentView()) {
      return(
        <>
          <Head>
            <title>Rezerwacja - Wybór płatności</title>
          </Head>
          <div className="paymentSection">
            <div className="pageTitle">
              <h2>Płatność</h2>
            </div>
            <div className="payment">
              <label className="checkbox">Płatność na miejscu
                <input type="radio" className="checkInput" checked={paymentMethod === onTheSpotPayment} onChange={onPaymentChange} name="radio" value={onTheSpotPayment}></input>
                <span className="checkmark"></span>
                <p>Zapłacisz na miejscu przed odbiorem samochodu</p>
              </label>
              <label className="checkbox">Płatność kartą
                <input type="radio" className="checkInput" name="radio1" checked={paymentMethod === creditCardPayment} onChange={onPaymentChange} value={creditCardPayment}></input>
                <span className="checkmark"></span>
                <div className="paymentFields">
                  <CreditCardForm onSubmitHandler={goToSummaryPage}></CreditCardForm>
                </div>
              </label>
              <div className="summary">
                  {(paymentMethod === onTheSpotPayment) && <input type="submit" onClick={() => goToSummaryPage()} className="summaryButton" value="Zapłać"></input>}
                  {(paymentMethod === creditCardPayment) && <input type="submit" form='paymentForm' className="summaryButton" value="Zapłać"></input>}
                </div>
            </div>
          </div>
        </>
      );
    } else if (isSummaryView()) {
      return(
        <>
          <Head>
            <title>Podsumowanie Rezerwacji</title>
          </Head>
          <div className="summaryDeliverySection">
          <div className="summaryTitle">
            <h2>Dziękujemy za skorzystanie z naszych usług</h2>
            <p>Samochód niebawem będzie na ciebie czekał.</p>
          </div>
          <div className="deliveryInfo">
            <div className="rentInfo">
              <h3>Podsumowanie zamówienia</h3>
              <div className="rentNumber">
                <p>Nr rezerwacji:</p><h4>#{reservationId}</h4>
              </div>
            </div>
            <div className="carRentalInfo">
              <div className="carRentalPhoto" style={{backgroundImage: `url(${carSummaryData.carPictureUrl})`}}></div>
                <div className='carRentalInformations'>
                  <div className='rentalInfo'>
                    <p>Samochód</p>
                    <h1>{carSummaryData.brand +" "+ carSummaryData.model +" "+ carSummaryData.year} r.</h1>
                  </div>
                  <div className='rentalInfo'>
                    <p>Kwota</p>
                    <h1>{totalPrice} zł</h1>
                  </div>
                  <div className='rentalInfo'>
                    <p>Rodzaj płatności</p>
                    <h1>{paymentMethod === creditCardPayment ? `Płatność kartą nr. xxxx-xxxx-xxxx-${creditCardData.creditCardNumber.substring(creditCardData.creditCardNumber.length-4)}` : 'Płatność na miejscu'}</h1>
                  </div>
                </div>
            </div>
            <div className="carWashText">
              <h1>{"Pamiętaj aby po zabawie umyć auto ;)"}</h1>
            </div>
            <div className="rentDeliveryInfo">
              <div className="collectRent">
                <p>Odbiór</p>
                <div className="rentalDateField">
                  <div className="where">
                    <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                    <span>Tarnowska 22, Warszawa</span>
                  </div>
                  <div className="when">
                    <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                    <span>{moment(pickUpDate).format("DD-MM-YYYY")}</span>
                  </div>
                  <div className="time">
                    <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                    <span>{moment(pickUpDate).format("hh:mm")}</span>
                  </div>
                </div>
              </div>
              <div className="returnRent">
                <p>Zwrot</p>
                <div className="rentalDateField">
                  <div className="where">
                    <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                    <span>Tarnowska 22, Warszawa</span>
                  </div>
                  <div className="when">
                    <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                    <span>{moment(dropOffDate).format("DD-MM-YYYY")}</span>
                  </div>
                  <div className="time">
                    <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                    <span>{moment(dropOffDate).format("hh:mm")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="endText"><h2>Życzymy udanej przejażdżki!</h2></div>
          <Link href={'/'} className="back">
            <input type="submit" className="backButton" value="Powrót do strony głównej"></input>
          </Link>
        </div>
        </>
      );
    }
}