'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createProduct(form: FormData) {
  try {
    await api.post('/products', form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/produtos')
}

export async function updateProduct(form: FormData) {
  try {
    await api.post(`/products/${form.get('id')}`, form)
  } catch (e) {
    console.log('ta dando erro aqui!!!')
    return JSON.stringify(e)
  }
  revalidatePath('/admin/produtos')
}

export async function destroyProduct(id: string) {
  await api.delete(`/products/${id}`)
  revalidatePath('/admin/produtos')
}
