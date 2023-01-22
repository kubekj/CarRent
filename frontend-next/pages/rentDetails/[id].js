import Image from "next/image";
import Link from "next/link";
import LocationIcon from '../../assets/icons/location-icon.png';
import CalendarIcon from '../../assets/icons/calendar-icon.png';
import ClockIcon from '../../assets/icons/clock-icon.png'; 
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { carsService } from "../../services/cars.service";
import { errorHandler } from "../../common/error-handler";
import { reservationStatus } from "../../common/enums";

const RentDetails = () => {
    const router = useRouter();
    const {id} = router.query;

    const paymentType = {
        creditCard: 'Płatność kartą',
        onTheSpot: 'Płatność na miejscu',
        notPaid: 'Nie opłacono'
    }

    const [reservation, setReservation] = useState({});

    useEffect(() => {
        let mounted = true;
        carsService
          .getCurrentUserReservation(id)
          .then(res => {
            if(mounted) {
              setReservation(res)
            }
          })
          .catch(err => {
            errorHandler(err);
          })
        return () => mounted = false;
      }, [id])

    return (
        <>
            <div className="rentDetailsSection">
                <div className="rentDetails">
                    <div className="rentDetailsBaner">
                        <h2>Szczegóły rezerwacji numer #{id}</h2>
                    </div>
                    <div className="rentDetailsInfo">
                        <div className="rentDetailsInfoCar">
                            <div className="rentDetailsInfoCarPhoto" style={{backgroundImage: `url(${reservation?.car?.logo})`}}></div>
                            <div className='rentDetailsInfoCarInformations'>
                                <div className='rentDetailsInfoCarInfo'>
                                    <p>Dane Samochodu</p>
                                    <h1>{reservation?.car?.name}</h1>
                                </div>
                                <div className='rentDetailsInfoCarInfo'>
                                    <p>Kwota</p>
                                    <h1>{reservation?.price} zł</h1>
                                </div>
                                <div className='rentDetailsInfoCarInfo'>
                                    <p>Rodzaj płatności</p>
                                    <h1>{paymentType[reservation?.paymentType]}</h1>
                                </div>
                           </div>
                        </div>
                        <div className="rentDetailsDeliveryInfo">
                            <div className="rentDetailsCollectRent">
                                <p>Odbiór</p>
                                <div className="rentDetailsDateField">
                                    <div className="rentDetailsWhere">
                                        <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                                        <span>Tarnowska 22, Warszawa</span>
                                    </div>
                                    <div className="rentDetailsWhen">
                                        <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                                        <span>{moment(reservation?.dateFrom).format("DD-MM-YYYY")}</span>
                                    </div>
                                    <div className="rentDetailsTime">
                                        <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                                        <span>{moment(reservation?.dateFrom).format("hh:mm")}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rentDetailsReturnRent">
                                <p>Zwrot</p>
                                <div className="rentDetailsDateField">
                                    <div className="rentDetailsWhere">
                                        <Image alt='location logo' src={LocationIcon} className="icon"></Image>
                                        <span>Tarnowska 22, Warszawa</span>
                                    </div>
                                    <div className="rentDetailsWhen">
                                        <Image alt='calendar logo' src={CalendarIcon} className="icon"></Image>
                                        <span>{moment(reservation?.dateTo).format("DD-MM-YYYY")}</span>
                                    </div>
                                    <div className="rentDetailsTime">
                                        <Image alt='clock logo' src={ClockIcon} className="icon"></Image>
                                        <span>{moment(reservation?.dateTo).format("hh:mm")}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="rentDetailsStatus">
                                <p>Status</p>
                                <h2 className={reservation?.status}>{reservation?.status ? reservationStatus[reservation?.status] : ''}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="backToRentsButton">
                        <Link href={'/rents'} className="back">
                            <input type="button" className="rentDetailsBackButton" value="Powrót"></input>
                        </Link>
                    </div>
                </div>
            </div>
      </>
    )
};

export default RentDetails;