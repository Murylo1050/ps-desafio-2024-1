'use client'

import style from './style.module.css'
import { productType } from '@/types/product'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { buyProduct } from '@/actions/product'

interface ProductProps {
  product: productType
}

export default function Card({ product }: ProductProps) {
  const [amount, setAmount] = useState<number>(product.amount)
  const buy = async () => {
    try {
      await buyProduct(product.id)
      setAmount(amount - 1)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={style.card}>
      <img src={product.image} alt="" className={style.card_img} />
      <div className={style.card_body}>
        <h2>Nome: {product.name}</h2>
        <p>Preço: {product.price}</p>
        <p>Quantidade: {amount}</p>
        <p>Categoria: {product.category.name}</p>

        {amount ? (
          <button onClick={buy} className={style.button}>
            Comprar
          </button>
        ) : (
          <p className={style.soldOut}>Fora de estoque</p>
        )}
      </div>
    </div>
  )
}
