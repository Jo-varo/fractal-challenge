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
