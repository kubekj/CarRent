import React from "react";

// components

export default function Auth({ children }) {
  return (
    <>
      <main>
        <section className='relative w-full h-full py-40 min-h-screen'>
          <div
            className='absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full'
            style={{
              backgroundImage:
                "url('https://motofilm.pl/wp-content/uploads/2020/03/2020-porsche-911-turbo-2.jpg')",
            }}
          ></div>
          {children}
        </section>
      </main>
    </>
  );
}
