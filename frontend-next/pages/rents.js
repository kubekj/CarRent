import { useEffect, useState } from 'react';
import { errorHandler } from '../common/error-handler';
import RentCard from '../components/RentCard'
import { carsService } from '../services/cars.service';
import ErrorGif from '../assets/gifs/rents-errorscreen.gif';
import Image from "next/image";
import Head from 'next/head';

const Rents = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        let mounted = true;
        carsService
          .getCurrentUserReservations()
          .then(user => {
            if(mounted) {
              setList(user.reservations)
            }
          })
          .catch(err => {
            errorHandler(err);
          })
        return () => mounted = false;
      }, [])

    return (
        <>
            <Head>
              <title>Twoje rezerwacje</title>
            </Head>
            <div className='yourRentsSection'>
                <div className="yourRents">
                    <div className='yourRentsBaner'>
                        <h2>Twoje rezerwacje</h2>
                        <p>Kliknij Szczegóły aby zobaczyć pełne informacje</p>
                    </div>
                    <div className="yourRents">
                        {list.length == 0 ? 
                          <div className='notFoundRentsMessage'>
                            <Image src={ErrorGif} className="errorRentsGif" alt="car rental gif"/>
                            <h2 className='notFoundRents'>Twoja historia rezerwacji jest pusta</h2> 
                            <p>Szybko wynajmij twój wymarzony samochód</p>
                          </div> 
                        : 
                          list.map(reservation => <RentCard key={reservation.id} data={reservation}/>)
                        }
                    </div>
                </div>
            </div>
        </>
    )
};

export default Rents;