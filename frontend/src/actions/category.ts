'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCategory(form: FormData) {
  try {
    await api.post('/categories', form)
  } catch (e) {
    return JSON.stringify(e)
  }

  revalidatePath('/admin/categorias')
}

export async function updateCategory(form: FormData) {
  try {
    await api.post(`/categories/${form.get('id')}`, form)
  } catch (e) {
    return JSON.stringify(e)
  }
  revalidatePath('/admin/categorias')
}

export async function destroyCategory(id: string) {
  await api.delete(`/categories/${id}`)
  revalidatePath('/admin/categorias')
}
