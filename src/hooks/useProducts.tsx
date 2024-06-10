import { useEffect, useState } from 'react';
import { Product, SelectedProduct } from '../types/types';
import { getProducts } from '../services/data';
import { formatPrice } from '../helpers/format';

const initialProductModalData = {
  productId: 0,
  quantity: 0,
};

export default function useProducts() {
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [productModalData, setProductModalData] = useState(
    initialProductModalData
  );

  const addNewProduct = (data: FormData) => {
    const product = products.find(
      (product) => product.id === Number(data.get('product-id'))
    );

    if (!product) return;
    if (Number(data.get('quantity')) === 0) return alert('Enter the quantity');

    const newSelectedProduct: SelectedProduct = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: Number(data.get('quantity')),
      totalPrice: formatPrice(Number(data.get('quantity')) * product.price),
    };

    const alreadyAddedProduct = selectedProducts.find(
      (product) => product.id === newSelectedProduct.id
    );

    if (alreadyAddedProduct) {
      const newSelectedProducts = selectedProducts.map((product) => {
        if (product.id === newSelectedProduct.id) {
          return isEditingProduct
            ? newSelectedProduct
            : {
                ...newSelectedProduct,
                quantity: product.quantity + newSelectedProduct.quantity,
                totalPrice: formatPrice(
                  (product.quantity + newSelectedProduct.quantity) *
                    product.unitPrice
                ),
              };
        }
        return product;
      });
      setIsEditingProduct(false);
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

  const editProduct = (product: SelectedProduct) => {
    setIsEditingProduct(true);
    setProductModalData({ productId: product.id, quantity: product.quantity });
  };

  //Modal
  const handleChangeProductData = (
    type: 'quantity' | 'product',
    value: string | number
  ) => {
    if (type === 'quantity') {
      setProductModalData({ ...productModalData, quantity: Number(value) });
    }
    if (type === 'product') {
      setProductModalData({ ...productModalData, productId: Number(value) });
    }
  };

  const resetModalState = () => {
    setIsEditingProduct(false);
    setProductModalData(initialProductModalData);
  };

  const updateSelectedProducts = (selectedProducts: SelectedProduct[]) => {
    setSelectedProducts(selectedProducts);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return {
    products,
    selectedProducts,
    productModalData,
    addNewProduct,
    editProduct,
    handleRemoveProduct,
    handleChangeProductData,
    resetModalState,
    updateSelectedProducts,
    setSelectedProducts
  };
}
