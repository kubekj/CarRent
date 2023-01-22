import React from 'react'
import styles from '../styles/About.module.css'
import TickIcon from '../assets/icons/tick_icon.png'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

export default function About() {
  return (
    <>
        <Head>
            <title>O nas</title>
        </Head>
        <div className='aboutBaner' id="aboutBanerId">
            <h2>O nas</h2>
        </div>

        <div className={styles.content} id="">
            <div className={styles.contentBox}>
                <div className={styles.about}>
                    <div className={styles.heading}>
                        <h2>Nasz zespół</h2>
                    </div>
                    <div className={styles.text}>
                        <p>Dbamy o to, aby trafiło do Ciebie auto premium, w całym tego słowa znaczeniu. Zapewniamy Ci pojazdy o pierwszorzędnej sprawności technicznej – dokładnie sprawdzanej przez naszych ekspertów. Służymy również poradą na każdym etapie współpracy. Jesteśmy do Twojej dyspozycji 24/7.</p>
                        <p>Wybierz samochod, a my  go dla Ciebie przygotujemy. Po zakończeniu wynajmu odbierzemy go z wybranego przez Ciebie punktu. Twój komfort jest dla nas priorytetem!</p>
                        <p>Pomożemy Ci przeżyć niezwykłą przygodę przy minimum formalności i maksimum wygody.</p>
                        <p>Pozwól nam zrealizować swoje motoryzacyjne marzenia!</p>
                    </div>
                    <div className={styles.prosList}>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <Image src={TickIcon} alt='tick icon' className={styles.listIcon}/>
                                <p>krótka umowa na przejrzystych zasadach</p>
                            </li>
                            <li className={styles.listItem}>
                                <Image src={TickIcon} alt='tick icon' className={styles.listIcon}/>
                                <p>wynajem z kaucją lub bez</p>
                            </li>
                            <li className={styles.listItem}>
                                <Image src={TickIcon} alt='tick icon' className={styles.listIcon}/>
                                <p>radość z użytkowania z naszych samochodów</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.prosBoxes}>
                    <div className={styles.prosBox}>
                        <div className={styles.prosTitle}>
                            <div>2,7</div>
                        </div>
                        <div className={styles.prosText}>
                            <p>Najkrótszy czas potrzebny na przyspieszenie do setki</p>
                        </div>
                        <Link href='/cars' className={styles.prosLink}>
                          <p>{"Zobacz nasze samochody ->"}</p>
                        </Link>
                    </div>
                    <div className={styles.prosBox}>
                        <div className={styles.prosTitle}>
                            <div>10 minut</div>
                        </div>
                        <div className={styles.prosText}>
                            <p>Krótki czas realizacji wypożyczenia</p>
                        </div>
                        <Link href='/howitworks' className={styles.prosLink}>
                            <p>{"Zobacz jak ->"}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </>
  );
}