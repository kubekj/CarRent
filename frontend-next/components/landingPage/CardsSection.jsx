import React from "react";
import CarTypeCard from "./CarTypeCard";

export default function CardsSection() {
  return (
    <section className='flex flex-col items-center sm:py-20 gap-16'>
      <div className='flex flex-col gap-3 items-center'>
        <div className='text-purple-700 sm:text-3xl'>Różnorodność</div>
        <h2 className='text-3xl sm:max-w-4xl text-center px-2'>
          Specjalnie dla Ciebie wydzieliśmy kategorie samochodów które mogą Cię
          najbardziej zainteresować
        </h2>
        <p className='text-lg'>Wybierz spośrod 4 różnych kategorii</p>
      </div>
      <div className='flex flex-col items-center gap-8 sm:gap-16 w-full'>
        <div className='flex flex-col gap-8 xl:flex-row w-full justify-center'>
          <CarTypeCard
            photo='https://images.unsplash.com/photo-1573074617613-fc8ef27eaa2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80sh.com/photos/phiAzHp5Nuo'
            title='Moc'
            body='Mnóstwo koni mechanicznych'
            alt="power image"
          />
          <CarTypeCard
            photo='https://images.unsplash.com/photo-1609521247503-8de40462e427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
            title='Styl i elegancja'
            body='Skóra, czerń i wrazenia'
            alt="car style image"
          />
        </div>
        <div className='flex flex-col gap-8 xl:flex-row w-full justify-center'>
          <CarTypeCard
            photo='https://images.unsplash.com/photo-1579211897986-63e1fcd564e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            title='Klasyka'
            body='Powrót do przeszłości'
            alt="clasic car image"
          />
          <CarTypeCard
            photo='https://images.unsplash.com/photo-1577473403731-a36ec9087f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
            title='Supercar'
            body='Niecodzienny wybór'
            alt="supercar image"
          />
        </div>
      </div>
    </section>
  );
}
