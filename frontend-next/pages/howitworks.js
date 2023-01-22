import React from 'react';
import Image from 'next/image';
import CarIcon from '../assets/icons/car_icon.png';
import TakeIcon from '../assets/icons/take_icon.png';
import FormIcon from '../assets/icons/form_icon.png';
import PdfIcon from '../assets/icons/pdf_icon.png';
import Head from 'next/head';

const Howitworks = () => {
    return( 
        <>
        <Head>
            <title>Jak to działa?</title>
        </Head>
        <div className = "baner" id="">
            <h2>Jak to działa?</h2>
        </div>

        <div className="about" id="">
            <div className="heading">
                <h2>Jak wygląda proces wynajmu?</h2>
            </div>
            <div className="content">
                <div className="contentBox">
                    <div>
                        <Image src={CarIcon} className="image1" alt='car icon'/>
                        <h3>Wybierz auto które chcesz wynająć.</h3>
                        <p>Czeka Cie ogromny wybór samochodów różnych marek dlatego sugerujemy wybrać ten który jest twoim marzenie.</p>
                    </div>
                </div>
                <div className="img1">
                </div>
            </div>
            <div className="content">
                <div className="contentBox">
                    <div>
                        <Image src={FormIcon} className="image4" alt='form icon'/>
                        <h3>Wypełnij formularz</h3>
                        <p>Gdy już wybrałes samochód należy wypelnić formularz na stronie. Teraz potwierdzamy rezerwacje i przygotowujemy twój samochód.</p>
                    </div>
                </div>
                <div className="img4">
                </div>
            </div>
            <div className="content">
                <div className="img2">
                </div>
                <div className="contentBox">
                    <div>
                        <Image src={FormIcon} className="image2" alt='form icon'/>
                        <h3>Wypełnij formularz</h3>
                        <p>Gdy już wybrałes samochód należy wypelnić formularz na stronie. Teraz potwierdzamy rezerwacje i przygotowujemy twój samochód.</p>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="contentBox">
                    <div>
                        <Image src={TakeIcon} className="image3" alt='take icon'/>
                        <h3>Odbierz auto i ruszaj w drogę</h3>
                        <p>Wsyztko gotowe. Wsiadaj i jedż dokąd tylko pragniesz.</p>
                    </div>
                </div>
                <div className="img3">
                </div>
            </div>
        </div>

        <div className="about2" id="">
            <div className="heading">
                <h2>Wzory dokumentów</h2>
            </div>
            <div className="content">
                <div className="contentBox">
                    <div>
                        <h3>Zrozumiałe dla wszyskich warunki najmu</h3>
                        <p>Dbamy o to, aby współpraca z naszymi klientami przebiegała sprawnie, a cały proces był szybki niczym Ferrari F40. Dlatego wszelkie formalności są ograniczone do absolutnego minimum i stworzyliśmy maksymalnie przejrzyste zasady i umowy. A wszystko po to by wybrany samochód trafił jak najszybciej w Twoje ręce. Decydując się na nasze usługi otrzymujesz gwarancję przejrzystych i zrozumiałych warunków bez zagmatwanych formułek i ukrytych kruczków prawnych. W razie pytań jesteśmy do Twojej dyspozycji. Wystarczy skorzystać z formularza kontaktowego dostępnego na naszej stronie. Dla Twojej wygody przygotowaliśmy również wzory wszystkich dokumentów niezbędnych do wynajęcia naszych samochodów.</p>
                    </div>
                </div>
                <div className="file">
                    <div className="download_pdf">
                        <Image src={PdfIcon} className="pdfimage" alt='pdf icon'/>
                        <div className="download_content">
                            <h5>Ogólne warunki umowy najmu</h5>
                            <a href="https://www.compero.pl/baza-dokumentow/d/open/pdf/umowa-najmu-samochodu" download >Pobierz plik PDF</a>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    );
}

export default Howitworks;