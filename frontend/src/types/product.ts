import { categoryType } from '@/types/category'

export type productType = {
  id: string
  name: string
  price: number
  amount: number
  image: string
  category_id: string
  category: categoryType
  created_at: Date
  updated_at: Date
}
