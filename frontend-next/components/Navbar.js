import React, { useEffect, useState } from "react";
import LogoIcon from "../assets/icons/logo.png";
import UserIcon from "../assets/icons/user_icon.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { authService } from '../services/auth.service'

function Navbar() {

  const router = useRouter();

  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setUsername(authService.userValue?.username);
  }, [isAuthenticated, authService.isAuthenticated()]);

  const menuHandler = () => {
    setActive(true);
    setOpen(false);
    return setActive(!active);
  }

  const accountsMenuHandler = () => {
    setActive(false);
    setOpen();
    return setOpen(!open);
  }

  function scrollSticky() {
    if (window.window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }

  function logout() {
    authService.logout();
    setIsAuthenticated(false);
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", scrollSticky);
  }

  return (
    <header className={sticky ? "header sticky" : "header"} id='header'>
      <Link href='/' className='logo'>
        <Image src={LogoIcon} alt='logo icon' className='logo_icon' />
      </Link>
      <div onClick={menuHandler}>
        <ul className={ active ? "menu active" : "menu"} id='menu'>
          <li>
            <Link href='/' legacyBehavior>
              <a className={router.pathname == "/" ? "active" : ""}>Strona Główna</a>
            </Link>
          </li>
          <li>
            <Link href='/cars' legacyBehavior>
              <a className={router.pathname == "/cars" ? "active" : ""}>Samochody</a>
            </Link>
          </li>
          <li>
            <Link href='/howitworks' legacyBehavior>
              <a className={router.pathname == "/howitworks" ? "active" : ""}>Jak to działa</a>
            </Link>
          </li>
          <li>
            <Link href='/about' legacyBehavior>
              <a className={router.pathname == "/about" ? "active" : ""}>O nas</a>
            </Link>
          </li>
          <li>
            <Link href='/cars'>
              <input type='button' className='bookButton' value='Zarezerwuj'/>
            </Link>
          </li>
        </ul>
      </div>

      <div onClick={accountsMenuHandler} className={ open ? "accoountButtons open" : "accoountButtons"}>
        { isAuthenticated ?
          <>
            <span className="greeting-text-inButton">Witaj, {username}</span>
            <Link href='/rents'>
              <input type='button' className='yourRentsButton' value='Rezerwacje'/> 
            </Link>
            <input type='button' onClick={logout} className='logoutButton' value='Wyloguj się'/>
          </>
          :
          <>
            <Link href='/login'>
              <input type='button' className='loginButton' value='Zaloguj się'/>
            </Link>
            <Link href='/registration'>
              <input type='button' className='registrationButton' value='Załóz konto'/>
            </Link>
          </>
        }
      </div>

      <div className="buttons">
        { isAuthenticated &&
          <span className="greeting-text">Witaj, {username}</span>
        }
        <div onClick={accountsMenuHandler}>
          <Image src={UserIcon} alt='user icon' className={open ? "user_icon open" : "user_icon"}/>
        </div>
        <Link href='/cars'>
          <input type='button' className='bookButton' value='Zarezerwuj'></input>
        </Link>
      </div>
      <div onClick={menuHandler} >
        <div className={active ? "burgerMenu open" : "burgerMenu"} id='burgerMenu'>
          <div className='toggle'></div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
