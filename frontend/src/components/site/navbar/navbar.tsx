'use client'

import style from './style.module.css'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { categoryType } from '@/types/category'
import { api } from '@/services/api'

interface NavProps {
  logo: string
}

export default function Navbar({ logo }: NavProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [category, setCategory] = useState<categoryType[] | null>(null)
  const requestDataSession = async () => {
    try {
      const sessionReponse = await getSession()
      setIsAuth(!!sessionReponse?.user)
    } catch (e) {
      console.log(e)
    }
  }
  const requestData = async () => {
    try {
      const response: categoryType[] = await api.get('/products')
      setCategory(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    requestDataSession()
    requestData()
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
            <a href="" className={style.nav_button}>
              Categorias
            </a>
            <ul className={style.dropdown}>
              {category?.map((category: categoryType, index: number) => [
                <li className={style.dropdown_item} key={index}>
                  <a href="" className={style.dropdown_button}>
                    {category.name}
                  </a>
                </li>,
              ])}
            </ul>
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
