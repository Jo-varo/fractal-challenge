import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Product } from '../types/types';

interface Props {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  handleAddNewProduct: (evt: React.FormEvent<HTMLFormElement>) => void;
  productModalData: { quantity: number; productId: number };
  handleChangeProductData: (
    type: 'quantity' | 'product',
    value: string | number
  ) => void;
  products: Product[];
}

export default function ManageProductModal({
  isOpenModal,
  handleCloseModal,
  handleAddNewProduct,
  productModalData,
  handleChangeProductData,
  products,
}: Props) {
  return (
    <Dialog
      open={isOpenModal}
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box component="form" onSubmit={handleAddNewProduct} sx={{padding:'1rem'}}>
        <DialogTitle id="alert-dialog-title">
          {`${productModalData.productId ? 'Edit ' : 'Add new'}`} product
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: '.5rem' }}>
            <InputLabel id="product-label-id">Product</InputLabel>
            <Select
              labelId="product-label-id"
              id="product-id"
              name="product-id"
              label="Product"
              value={productModalData.productId}
              onChange={(evt) =>
                handleChangeProductData('product', evt.target.value)
              }
            >
              <MenuItem value="0">Select product</MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: '.5rem' }}>
            <TextField
              name="quantity"
              id="quantity"
              label="Qty required"
              type="number"
              value={productModalData.quantity}
              onChange={(evt) =>
                handleChangeProductData('quantity', evt.target.value)
              }
              InputProps={{ inputProps: { min: 0, max: 100 } }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Discard</Button>
          <Button autoFocus type="submit" variant="contained">
            Confirm and save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
