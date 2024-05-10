'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { productType } from '@/types/product'
import { categoryType } from '@/types/category'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { read } from 'node:fs'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from '@/components/select'
import { SelectTriggerProps } from '@radix-ui/react-select'

interface FormFieldsProductProps {
  product?: productType
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsProduct({
  product,
  readOnly,
  error,
}: FormFieldsProductProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categories, setCategory] = useState<categoryType[]>()

  const requestData = async () => {
    try {
      const response: productType[] = await api.get('/products')
      setCategory(response)
    } catch (e) {
      return (
        <DashboardContainer className="text-destructive">
          Não foi possivel obter os clubes
        </DashboardContainer>
      )
    }
  }

  useEffect(() => {
    requestData()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {product && (
          <Input defaultValue={product.id} type="text" name="id" hidden />
        )}

        <FormField>
          <Label htmlFor="name" required={!product}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do Produto"
            defaultValue={product?.name}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.name}
          />
        </FormField>
        <FormField>
          <Label htmlFor="price" required={!product}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            type="number"
            step="0.01"
            placeholder="Insira o valor do produto"
            defaultValue={product?.price}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.price}
          />
        </FormField>
        <FormField>
          <Label htmlFor="amount" required={!product}>
            Quantidade
          </Label>
          <Input
            name="amount"
            id="amount"
            type="number"
            placeholder="Insira a quantidade do produto"
            defaultValue={product?.amount}
            disabled={pending}
            readOnly={readOnly}
            error={error?.errors?.amount}
          />
        </FormField>
        <FormField>
          <Label htmlFor="category_id">Categoria</Label>
          <Select
            name="category_id"
            disabled={pending}
            defaultValue={product?.category_id}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria do produto" />
            </SelectTrigger>
            <SelectContent id="category_id">
              <SelectGroup id="category_id">
                <SelectLabel>Categorias</SelectLabel>
                {categories?.map((category: categoryType, index: number) => {
                  ;<SelectItem value={category.id} key={index}>
                    category.name
                  </SelectItem>
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>
        <FormField>
          <Label htmlFor="image">Imagem</Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            onChange={(e) => handleImageChange(e, setUpdateImage)}
            error={error?.errors?.image}
          />
          <ImageForm
            className="aspect-square"
            src={updateImage || product?.image}
          />
        </FormField>
      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
