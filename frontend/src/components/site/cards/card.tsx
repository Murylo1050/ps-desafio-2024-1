'use client'

import style from './style.module.css'
import { productType } from '@/types/product'

interface ProductProps {
  product: productType
}

export default function Card({ product }: ProductProps) {
  return (
    <div className={style.card}>
      <img src={product.image} alt="" className={style.card_img} />
      <div className={style.card_body}>
        <h2>Nome: {product.name}</h2>
        <p>Preço: {product.price}</p>
        <p>Quantidade: {product.amount}</p>
        <p>Categoria: {product.category.name}</p>
      </div>
    </div>
  )
}
