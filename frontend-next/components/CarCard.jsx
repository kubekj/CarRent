import React from 'react';
import Image from 'next/image';
import EngineIcon from "../assets/icons/engine_icon.png";
import SpeedMeterIcon from "../assets/icons/speedmeter_icon.png";
import DriveIcon from "../assets/icons/drive_icon.png";
import GearboxIcon from "../assets/icons/gearbox_icon.png";
import Router from 'next/router';
import Link from 'next/link';

export default function CarCard(props) {
    const carData = props.data;

    /*
    function showDetails() {
        Router.push('/cars/'+carData.id);
    }
    */

    return (
       <div className="carCard">
            <div className="carPhoto" style={{backgroundImage: `url(${carData.carPictureUrl})`}}>
                <Image alt="car logo" src={carData.brandLogoUrl} width={380} height={230} className="logo"/>
            </div>
            <div className="carInfo">
                <h1>{carData.name}</h1>
                <p>{carData.pricePerDay} zł</p>
                <div className="details">
                    <div className="leftinfo">
                        <div className="engine">
                            <Image alt="engine icon" src={EngineIcon}/>
                            <span>{carData.engine}</span>
                        </div>
                        <div className="vmax">
                            <Image alt="speed meter icon" src={SpeedMeterIcon}/>
                            <span>{carData.acceleration} s do 100 km/h</span>
                        </div>
                    </div>
                    <div className="rightinfo">
                        <div className="drive">
                            <Image alt="drive icon" src={DriveIcon}/>
                            <span>{carData.drive}</span>
                        </div>
                        <div className="gearbox">
                            <Image alt="gearbox icon" src={GearboxIcon}/>
                            <span>{carData.gearbox}</span>
                        </div>
                    </div>   
                </div>
                <Link href={`/cars/${carData.id}`}>
                    <input className="detailsButton" type="button" value="Szczegóły"></input>
                </Link>
            </div>
       </div>
    );
}
