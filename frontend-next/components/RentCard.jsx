import React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { reservationStatus } from '../common/enums';

export default function RentCard(props) {
    const reservationData = props.data;
    
    return(
        <div className="rentCard">
            <div className="rentNumber">
                <p>Nr. rezerwacji</p>
                <h2>#{reservationData.id}</h2>
            </div>
            <div className="rentCarPhoto" style={{backgroundImage: `url(${reservationData.carLogo})`}} alt="car image"></div>
            <div className="rentCost">
                <p>Koszt</p>
                <h2>{reservationData.price} zł</h2>
            </div>
            <div className="rentDate">
                <p>Data rezerwacji</p>
                <h2>{moment(reservationData.createdAt).format("DD-MM-YYYY")}</h2>
            </div>
            <div className="rentStatus">
                <p>Status</p>
                <h2 className={reservationData.status}>{reservationData?.status ? reservationStatus[reservationData.status] : ''}</h2>
            </div>
            <div className="rentMoreDetails">
                <Link href={`/rentDetails/${reservationData.id}`}>
                    <input className="rentMoreDetailsButton" type="button" value="Szczegóły"></input>
                </Link>
            </div>
        </div>
    )
}