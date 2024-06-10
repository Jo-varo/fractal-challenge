import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Order, SelectedProduct } from '../types/types';
import ProductsTable from '../components/ProductsTable';
import ManageProductModal from '../components/ManageProductModal';
import { createOrder, editOrder, getOrder } from '../services/data';
import { formatDate } from '../helpers/format';
import useProducts from '../hooks/useProducts';

export default function ManageOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [orderNo, setOrderNo] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    products,
    selectedProducts,
    productModalData,
    addNewProduct,
    editProduct,
    handleChangeProductData,
    handleRemoveProduct,
    resetModalState,
    updateSelectedProducts,
  } = useProducts();

  const getCurrentDate = foundOrder?.date
    ? new Date(foundOrder?.date)
    : new Date();
  const getFinalPrice = (
    selectedProducts
      ? selectedProducts.reduce((val, product) => val + product.totalPrice, 0)
      : 0
  ).toFixed(2);
  const getTotalProducts = selectedProducts
    ? selectedProducts.reduce((val, product) => val + product.quantity, 0)
    : 0;

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (selectedProducts.length === 0) return alert('Add some products first');
    const data = new FormData(evt.currentTarget);
    if (!data.get('order-no')) return alert('Add the order #');

    const dataToSubmit = {
      orderNo: data.get('order-no') as string,
      date: getCurrentDate.toISOString(),
      productsNo: getTotalProducts,
      finalPrice: Number(getFinalPrice),
      selectedProducts,
    };
    if (id) {
      //Edit Path
      const editedOrderResponse = await editOrder(Number(id), dataToSubmit);
      if (editedOrderResponse) {
        alert('Order edited');
        navigate('/my-orders');
      } else {
        alert('There was an error editing this order');
      }
    } else {
      // Create Path
      const createdOrderResponse = await createOrder(dataToSubmit);
      if (createdOrderResponse) {
        alert('Order created');
        navigate('/');
      } else {
        alert('There was an error creating order');
      }
    }
  };

  const handleAddNewProduct = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    addNewProduct(new FormData(evt.currentTarget));
    handleCloseModal();
  };

  const handleEditProduct = (product: SelectedProduct) => {
    editProduct(product);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    resetModalState();
  };

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const orderData = await getOrder(Number(id));
        setFoundOrder(orderData);
        updateSelectedProducts(orderData.selectedProducts);
        setOrderNo(orderData.orderNo);
      };
      fetchOrder();
    }
  }, [id]);

  return (
    <Box>
      <Typography variant="h4" component="h1">
        {`${id ? 'Edit ' : 'Add '}`} Order
      </Typography>
      <Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box
            width={300}
            display="flex"
            flexDirection="column"
            gap="1.25rem"
            margin="1.5rem 0"
          >
            <TextField
              required
              name="order-no"
              id="order-no"
              label="Order #"
              value={orderNo}
              onChange={(e) => setOrderNo(e.target.value)}
            />
            <TextField
              disabled
              name="date"
              id="date"
              label="Date"
              value={formatDate(getCurrentDate)}
            />
            <TextField
              disabled
              name="no-products"
              id="no-products"
              label="# Products"
              value={getTotalProducts}
            />
            <TextField
              disabled
              name="final-price"
              id="final-price"
              label="Final Price"
              value={getFinalPrice}
            />
          </Box>
          <Button
            variant="outlined"
            type="button"
            onClick={handleOpenModal}
            sx={{ margin: '0 0 .75rem' }}
            color="success"
          >
            Add new product
          </Button>
          <ProductsTable
            selectedProducts={selectedProducts}
            handleEditProduct={handleEditProduct}
            handleRemoveProduct={handleRemoveProduct}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: '1.25rem 0' }}
            size="large"
          >
            {id ? 'Edit' : 'Create'} the order
          </Button>
        </Box>
      </Box>
      <ManageProductModal
        handleAddNewProduct={handleAddNewProduct}
        handleCloseModal={handleCloseModal}
        isOpenModal={isOpenModal}
        handleChangeProductData={handleChangeProductData}
        productModalData={productModalData}
        products={products}
      />
    </Box>
  );
}
