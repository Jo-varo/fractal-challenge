import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { SelectedProduct } from '../types/types';

interface Props {
  selectedProducts: SelectedProduct[];
  handleEditProduct: (product: SelectedProduct) => void;
  handleRemoveProduct: (id: number) => void;
}

export default function ProductsTable({
  selectedProducts,
  handleEditProduct,
  handleRemoveProduct,
}: Props) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedProducts.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.unitPrice.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.totalPrice.toFixed(2)}</TableCell>
                <TableCell sx={{ display: 'flex', gap: '.5rem' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProducts.length === 0 && (
        <Typography
          variant="h5"
          component="p"
          sx={{ textAlign: 'center', margin: '.5rem 0' }}
        >
          Add some products to be displayed here
        </Typography>
      )}
    </>
  );
}
