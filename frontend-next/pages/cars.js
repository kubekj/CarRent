import { React, useEffect, useState } from 'react'
import CarCard from '../components/CarCard'
import { carsService } from '../services/cars.service'
import ErrorGif from '../assets/gifs/car-jump-errorscreen.gif';
import Image from "next/image";
import { errorHandler } from '../common/error-handler';
import Head from 'next/head';

const Cars = () => {

  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [drives, setDrives] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);
  const [filters, setFilters] = useState({
    bodyType: 'all',
    drive: 'all',
    fuel: 'all',
    gearbox: 'all'
  });

  useEffect(() => {
    let mounted = true;
    carsService
      .getCars()
      .then(cars => {
        if(mounted) {
          setList(cars);
          setFilteredList(cars);
        }
      })
      .catch(err => {
        errorHandler(err, 'cars');
      });

    carsService
      .getBodyTypes()
      .then(bt => {
        if(mounted) {
          setBodyTypes(bt);
        }
      })
      .catch(err => {
        errorHandler(err, 'boydtypes');
      });

    carsService
      .getDrives()
      .then(d => {
        if(mounted) {
          setDrives(d);
        }
      })
      .catch(err => {
        errorHandler(err, 'drives');
      });

    carsService
      .getFuels()
      .then(f => {
        if(mounted) {
          setFuels(f);
        }
      })
      .catch(err => {
        errorHandler(err, 'fuels');
      });

    carsService
      .getGearboxes()
      .then(gb => {
        if(mounted) {
          setGearboxes(gb);
        }
      })
      .catch(err => {
        errorHandler(err, 'gearbox');
      });

    return () => mounted = false;
  }, [])

  useEffect(() => {
    const filtered = list.filter(x => {
      let skip = false;
      Object.keys(filters).forEach(el => {
        if (x[el] !== filters[el] && filters[el] !== 'all') {
          skip = true;
        }
      })
      return !skip;
    })
    setFilteredList(filtered);
  }, [filters, list])

  function handleFilter(event, field) {
    setFilters({
      ...filters,
      [field]: event.target.value
    })
  }

  return (
    <>
    <Head>
        <title>Samochody</title>
    </Head>
    <div className='carsSection'>
      <section className="carsbaner" id="">
        <h2>Pomagamy spełnić każde motryzacyjne marzenie</h2>
      </section>

      <div className="cars" id="">
        <div className="carscontent">
          
          <div className="filter">
            <h2>Wyszukaj samochód</h2>
            
            <div className="bodyTypeFilter" onChange={(event) => handleFilter(event, 'bodyType')}>
              <h1>Nadwozie</h1>
              <input type="radio" id="allBodyTypes" name="bodyType" value="all"></input>
              <label htmlFor="allBodyTypes">Wszystkie</label>

              {bodyTypes.map(name => <>
                <br></br>
                <input type="radio" id={name} name="bodyType" value={name}></input>
                <label htmlFor={name}>{name}</label>
              </>)}

            </div>

            <div className="driveTypeFilter" onChange={(event) => handleFilter(event, 'drive')}>
              <h1>Napęd</h1>
              <input type="radio" id="allDrives" name="driveType" value="all"></input>
              <label htmlFor="allDrives">Wszystkie</label>

              {drives.map(name => <>
                <br></br>
                <input type="radio" id={name} name="driveType" value={name}></input>
                <label htmlFor={name}>{name}</label>
              </>)}

            </div>

            <div className="fuelTypeFilter" onChange={(event) => handleFilter(event, 'fuel')}>
              <h1>Paliwo</h1>
              <input type="radio" id="allFuels" name="fuelType" value="all"></input>
              <label htmlFor="allFuels">Wszystkie</label>

              {fuels.map(name => <>
                <br></br>
                <input type="radio" id={name} name="fuelType" value={name}></input>
                <label htmlFor={name}>{name}</label>
              </>)}

            </div>

            <div className="gearboxTypeFilter" onChange={(event) => handleFilter(event, 'gearbox')}>
              <h1>Skrzynia biegów</h1>
              <input type="radio" id="allGearboxes" name="gearboxType" value="all"></input>
              <label htmlFor="allGearboxes">Wszystkie</label>

              {gearboxes.map(name => <>
                <br></br>
                <input type="radio" id={name} name="gearboxType" value={name}></input>
                <label htmlFor={name}>{name}</label>
              </>)}

            </div>

          </div>
          <div className="carsCards">
            {filteredList.length == 0 ?
              <div className='notFoundMessage'>
                <Image src={ErrorGif} className="errorGif" alt="not found error car gif"/>
                <h2 className='notFoundFilteredCars'>{list.length > 0 ? 'Nie znaleziono samochodów spełniające twoje kryteria.' : 'Wczytywanie samochodów...'}</h2>
              </div> 
              :
              filteredList.map(car => <CarCard key={car.id} data={car}/>)
            }
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default Cars;