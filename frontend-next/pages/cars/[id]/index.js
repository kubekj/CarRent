import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { carsService } from "../../../services/cars.service";
import Image from 'next/image';
import Link from 'next/link';
import { errorHandler } from "../../../common/error-handler";
import Head from "next/head";

export default function Car() {
    const router = useRouter();
    const {id} = router.query;

    const [carDetailedData, setCarDetailedData] = useState({
      gallery: []
    });

    useEffect(() => {
        let mounted = true;
        carsService
          .getCarDetailed(id)
          .then(car => {
            if(mounted) {
              setCarDetailedData(car)
            }
          })
          .catch(err => {
            errorHandler(err);
          })
        return () => mounted = false;
      }, [id]);

    return( 
        <>
        <Head>
            <title>Szcegóły {carDetailedData.name}</title>
        </Head>
        <div className="detailsSection">
            <div className="carGallery">
                <div className="carDetails img-grid-row-2 image-grid-row-2 image-grid-column-2">
                    <div className="infoCar">
                        <Image alt="brand logo" src={carDetailedData.brandLogoUrl} width={50} height={50} className="logo"/>
                        <p>Wynajem</p>
                        <h1>{carDetailedData.name}</h1>
                        <h1>{carDetailedData.year} r.</h1>
                    </div>
                    <div className="detailsInfo">
                        <p className="specifications">Specyfikacja</p>
                        <div className='informations'>
                            <div className='info'>
                                <h1>{carDetailedData.horsePower} KM</h1>
                                <p>Moc</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.engine}</h1>
                                <p>Silnik</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.acceleration} s</h1>
                                <p>0-100</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.maxSpeed} km/h</h1>
                                <p>Prędkość maksymalna</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.drive}</h1>
                                <p>Napęd</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.gearbox}</h1>
                                <p>Skrzynia biegów</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.fuel}</h1>
                                <p>Paliwo</p>
                            </div>
                            <div className='info'>
                                <h1>{carDetailedData.bodyType}</h1>
                                <p>Nadwozie</p>
                            </div>
                        </div>
                        <Link href={`/cars/${id}/rental`}>
                          <input type="button" className="bookButton" value="Zarezerwuj"></input>
                        </Link>
                    </div>
                </div>
                {carDetailedData.gallery.map(img => <div key={img.id} className="carImage img-grid-col-2" style={{backgroundImage: `url(${img.url})`}}></div>)}
                <div className="carAbout info-grid-col-2">
                    <p>Opis</p>
                    <h3>{carDetailedData.description}</h3>
                </div>
            </div>        
        </div>
        </>
    )

}