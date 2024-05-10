import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { categoryType } from '@/types/category'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuTrash } from 'react-icons/lu'
import { DialogUpdateCategory } from './dialog-update-category'
import { DialogCategoryDelete } from './dialog-delete-category'
import { DialogInformationCategory } from './dialog-information-category'
import { api } from '@/services/api'

export default async function ListCategories() {
  let categories: categoryType[]

  try {
    categories = await api.get('/categories') // requisição para a api
  } catch (e) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter as categorias.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((category: categoryType) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex justify-end">
                  <DialogInformationCategory category={category}>
                    <Button variant="ghost" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCategory>
                  <DialogUpdateCategory category={category}>
                    <Button variant="ghost" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCategory>
                  <DialogCategoryDelete id={category.id}>
                    <Button variant="ghost" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCategoryDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardContainer>
    </>
  )
}
