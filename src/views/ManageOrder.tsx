import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Order,
  Product,
  SelectedProduct,
} from '../types/types';
import ProductsTable from '../components/ProductsTable';
import ManageProductModal from '../components/ManageProductModal';
import {
  createOrder,
  editOrder,
  getOrder,
  getProducts,
} from '../services/data';

export default function ManageOrder() {
  const { id } = useParams();
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  const [products, setProducts] = useState<Product[]>([]);

  const initialProductModalData = {
    productId: 0,
    quantity: 0,
  };
  const [productModalData, setProductModalData] = useState(
    initialProductModalData
  );
  const [orderNo, setOrderNo] = useState('');
  const navigate = useNavigate();

  const getCurrentDate = foundOrder?.date || new Date().toLocaleDateString();
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
      date: getCurrentDate,
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
    handleCloseModal();
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const product = products.find(
      (product) => product.id === Number(data.get('product-id'))
    );
    if (!product) return;
    const newSelectedProduct: SelectedProduct = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: Number(data.get('quantity')),
      totalPrice:
        Math.round(Number(data.get('quantity')) * product.price * 100) / 100,
    };

    if (productModalData.productId) {
      const newSelectedProducts = selectedProducts.map((product) => {
        if (product.id === productModalData.productId) {
          return newSelectedProduct;
        }
        return product;
      });
      setSelectedProducts(newSelectedProducts);
      return;
    }

    const alreadyAddedProduct = selectedProducts.find(
      (product) => product.id === newSelectedProduct.id
    );

    if (alreadyAddedProduct) {
      const newSelectedProducts = selectedProducts.map((product) => {
        if (product.id === newSelectedProduct.id) {
          return {
            ...newSelectedProduct,
            quantity: product.quantity + newSelectedProduct.quantity,
          };
        }
        return product;
      });
      setSelectedProducts(newSelectedProducts);
      return;
    }

    setSelectedProducts([...selectedProducts, newSelectedProduct]);
  };

  const handleRemoveProduct = (id: number) => {
    const filteredProducts = selectedProducts.filter(
      (product) => product.id !== id
    );
    setSelectedProducts(filteredProducts);
  };

  const handleEditProduct = (product: SelectedProduct) => {
    setProductModalData({ productId: product.id, quantity: product.quantity });
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setProductModalData(initialProductModalData);
    resetProductDataModal();
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleChangeProductData = (
    type: 'quantity' | 'product',
    value: string | number
  ) => {
    console.log({ type, value });
    if (type === 'quantity') {
      setProductModalData({ ...productModalData, quantity: Number(value) });
    }
    if (type === 'product') {
      setProductModalData({ ...productModalData, productId: Number(value) });
    }
  };

  const resetProductDataModal = () => {
    setProductModalData(initialProductModalData);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const orderData = await getOrder(Number(id));
        setFoundOrder(orderData);
        setSelectedProducts(orderData.selectedProducts);
        setOrderNo(orderData.orderNo);
      };
      fetchOrder();
    }
  }, [id]);

  return (
    <div>
      <Typography variant="h3" component="h1">
        {`${id ? 'Edit ' : 'Add '}`} Order
      </Typography>
      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            name="order-no"
            id="order-no"
            label="Order #"
            value={orderNo}
            sx={{ display: 'block' }}
          />
          <TextField
            sx={{ display: 'block' }}
            disabled
            name="date"
            id="date"
            label="Date"
            value={getCurrentDate}
          />
          <TextField
            sx={{ display: 'block' }}
            disabled
            name="no-products"
            id="no-products"
            label="# Products"
            value={getTotalProducts}
          />
          <TextField
            sx={{ display: 'block' }}
            disabled
            name="final-price"
            id="final-price"
            label="Final Price"
            value={getFinalPrice}
          />
          <Button variant="outlined" type="button" onClick={handleOpenModal}>
            Add new product
          </Button>
          <ProductsTable
            selectedProducts={selectedProducts}
            handleEditProduct={handleEditProduct}
            handleRemoveProduct={handleRemoveProduct}
          />
          <Button variant="outlined" type="submit" sx={{ margin: '1rem 0' }}>
            {id ? 'Edit' : 'Create'} the order
          </Button>
        </Box>
      </div>
      <ManageProductModal
        handleAddNewProduct={handleAddNewProduct}
        handleCloseModal={handleCloseModal}
        isOpenModal={isOpenModal}
        handleChangeProductData={handleChangeProductData}
        productModalData={productModalData}
        products={products}
      />
    </div>
  );
}
