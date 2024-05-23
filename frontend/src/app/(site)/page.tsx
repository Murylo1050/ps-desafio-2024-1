'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import Card from '@/components/site/cards/card'
import style from './syle.module.css'
import Navbar from '@/components/site/navbar/navbar'

export default function Home() {
  const [products, setProduct] = useState<productType[] | null>(null)
  const requestData = async () => {
    try {
      const response: productType[] = await api.get('/products')
      setProduct(response)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    requestData()
  }, [])
  return (
    <div className={style.productPage}>
      <Navbar logo="/images/logoAdapti.png" />
      <div className={style.wrapper}>
        {products?.map((product: productType, index: number) => (
          <Card product={product} key={index} />
        ))}
      </div>
    </div>
  )
}
