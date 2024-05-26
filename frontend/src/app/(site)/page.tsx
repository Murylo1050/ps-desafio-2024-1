'use client'

import { api } from '@/services/api'
import { productType } from '@/types/product'
import { useEffect, useState } from 'react'
import Card from '@/components/site/cards/card'
import style from './syle.module.css'
import Navbar from '@/components/site/navbar/navbar'
import { categoryType } from '@/types/category'

export default function Home() {
  const [products, setProduct] = useState<productType[] | null>(null)
  const [category, setCategory] = useState<categoryType[] | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedCategory, setSelectCategory] = useState<string>('')

  const requestData = async () => {
    try {
      const responseProduct: productType[] = await api.get('/products')
      setProduct(responseProduct)

      const responseCategory: categoryType[] = await api.get('/categories')
      setCategory(responseCategory)
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
      <div className={style.filter_div}>
        <input
          type="text"
          className={style.filter_input_text}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          name=""
          className={style.filter_select}
          id=""
          onChange={(selected) => setSelectCategory(selected.target.value)}
        >
          <option value="" className={style.option}>
            Sem Filtro
          </option>

          {category?.map((category: categoryType, index: number) => (
            <option value={category.name} key={index} className={style.option}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={style.wrapper}>
        {products
          ?.filter((product) => {
            return selectedCategory === ''
              ? product
              : product.category.name.includes(selectedCategory)
          })
          .filter((product) => {
            return search.toLowerCase() === ''
              ? product
              : product.name.toLowerCase().includes(search)
          })
          .map((product: productType, index: number) => (
            <Card product={product} key={index} />
          ))}
      </div>
    </div>
  )
}
