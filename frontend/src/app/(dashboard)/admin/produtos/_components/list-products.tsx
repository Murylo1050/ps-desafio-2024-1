import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { productType } from '@/types/product'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuTrash } from 'react-icons/lu'
import { DialogUpdateProduct } from './dialog-update-product'
import { DialogProductDelete } from './dialog-delete-product'
import { DialogInformationProduct } from './dialog-information-product'
import { api } from '@/services/api'

export default async function ListProduct() {
  let products: productType[]

  try {
    products = await api.get('/products') // requisição para a api
  } catch (e) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os produtos.
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product: productType) => (
              <TableRow key={product.id}>
                <TableCell>
                  <TabbleCellImage src={product.image} alt="" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell className="flex justify-end">
                  <DialogInformationProduct product={product}>
                    <Button variant="ghost" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationProduct>
                  <DialogUpdateProduct product={product}>
                    <Button variant="ghost" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateProduct>
                  <DialogProductDelete id={product.id}>
                    <Button variant="ghost" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogProductDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DashboardContainer>
    </>
  )
}
