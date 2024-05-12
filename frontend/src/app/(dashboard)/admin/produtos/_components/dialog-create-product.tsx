'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsProduct from './form-fields-product'
import { createProduct } from '@/actions/product'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { ResponseErrorType } from '@/services/api'

interface DialogCreateProductProps {
  children: React.ReactNode
}

export function DialogCreateProduct({ children }: DialogCreateProductProps) {
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!open) {
      setError(null)
    }
  }, [open])

  const submit = async (form: FormData) => {
    setError(null)

    const newForm = await filterFormData(form)

    const response = await createProduct(newForm)
    if (response) {
      setError(await JSON.parse(response))
      toast({
        title: 'Não foi possível criar o produto!',
      })
      return
    } else {
      toast({
        title: 'Produto criado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar produto</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo produto abaixo e clique em
            &rdquo;Salvar&rdquo; para incluí-lo no sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsProduct error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
