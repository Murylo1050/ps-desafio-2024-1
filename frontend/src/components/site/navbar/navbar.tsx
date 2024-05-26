'use client'

import style from './style.module.css'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

interface NavProps {
  logo: string
}

export default function Navbar({ logo }: NavProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const requestDataSession = async () => {
    try {
      const sessionReponse = await getSession()
      setIsAuth(!!sessionReponse?.user)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    requestDataSession()
  }, [])
  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <a href="">
          <img src={logo} className={style.logo} alt="" />
        </a>

        <ul className={style.nav_links}>
          <li className={style.nav_item}>
            <a href="" className={style.nav_button}>
              Inicio
            </a>
          </li>

          <li className={style.nav_item}>
            <a href="/admin" className={style.nav_button}>
              {isAuth ? 'Dashboard' : 'Log-in'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
