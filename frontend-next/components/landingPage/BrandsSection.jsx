import React from "react";
import AdSection from "./AdSection";
import checkedIcon from "../../assets/icons/checked_icon.svg";
import featuredIcon from "../../assets/icons/featured_icon.svg";
import diamondIcon from "../../assets/icons/diamond_icon.svg";
import BMWIcon from "../../assets/icons/bmw_icon.png";
import FerrariIcon from "../../assets/icons/ferrari_icon.png";
import LamborghiniIcon from "../../assets/icons/lamborghini_icon.png";
import MercedesIcon from "../../assets/icons/mercedes_icon.png";
import Image from "next/image";

export default function BrandsSection() {
  return (
    <section className='flex flex-col items-center gap-24 py-24'>
      <div className='flex flex-col items-center px-6 gap-3'>
        <div className='text-purple-700 sm:text-3xl'>Marki</div>
        <div className=' font-medium sm:text-5xl'>
          U nas znajdziesz samochody spod szyldu
        </div>
        <div className='flex flex-col p-2 gap-y-16 sm:gap-x-20 sm:flex-row sm:p-12'>
            <Image src={BMWIcon} className="w-24 h-24" alt="BMW icon"/>
            <Image src={MercedesIcon} className="w-24 h-24" alt="Mercedes icon"/>
            <Image src={LamborghiniIcon} className="w-24 h-24" alt="Lamborghini icon"/>
            <Image src={FerrariIcon} className="w-20 h-24" alt="Ferrari icon"/>
        </div>
      </div>
      <div className='flex flex-col gap-6 justify-between w-full items-center'>
        <AdSection
          title='Eksluzywne marki'
          body='Samochody których nie widujesz na codzień'
          firstItem='Porsche'
          secondItem='McLaren'
          thirdItem='Lamborgini'
          image='https://images.unsplash.com/photo-1471479917193-f00955256257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2531&q=80'
          orderLast={false}
          icon={diamondIcon}
          alt="car image"
        />
        <AdSection
          title='Wielki wybór'
          body='Posiadamy szeroki zakres samochodów w ofercie'
          firstItem='Różnorodne kolory'
          secondItem='Mocarne silniki'
          thirdItem='Nadwozie według preferencji'
          image='https://images.unsplash.com/photo-1629515174174-e573eda0d814?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
          orderLast={true}
          icon={featuredIcon}
          alt="car image"
        />
        <AdSection
          title='Topowa jakość'
          body='Wszystkie samochody są:'
          firstItem='Dokładnie myte i sprzątane po każdym przejeździe'
          secondItem='Odpowiednio badane technicznie '
          thirdItem='Zakupione od autoryzowanych dealerów'
          image='https://images.unsplash.com/photo-1616450818972-40bcbf923054?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
          orderLast={false}
          icon={checkedIcon}
          alt="car image"
        />
      </div>
    </section>
  );
}
