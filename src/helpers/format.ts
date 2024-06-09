import { OrderResponseItem } from '../types/responses';

export const getFormattedOrder = (order: OrderResponseItem) => ({
  id: order.id,
  orderNo: String(order.orderNo),
  date: order.date,
  finalPrice: Number(order.finalPrice),
  productsNo: order.productsNo,
  selectedProducts: order.selectedProducts.map((product) => ({
    ...product,
    unitPrice: Number(product.unitPrice),
  })),
});

export const formatPrice = (price: number) => {
  return Math.round(price * 100) / 100;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};
