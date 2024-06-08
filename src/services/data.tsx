import axios from 'axios';
import { Order, Product } from '../types/types';
import {
  CreateOrderBody,
  DeleteOrderResponse,
  OrderResponse,
  OrdersResponse,
  ProductResponse,
  orderCreatedResponse,
} from '../types/responses';
import { getFormattedOrder } from '../helpers/format';

const ENV_API_URL = import.meta.env.VITE_API_URL

export const API_URL = `${ENV_API_URL}/api`;

export const getOrders = async (): Promise<Order[]> => {
  try {
    const ordersResponse = (await axios.get(`${API_URL}/orders`))
      .data as OrdersResponse;
    const mappedOrders: Order[] = ordersResponse['orders'].map((order) =>
      getFormattedOrder(order)
    );
    return mappedOrders;
  } catch (error) {
    throw new Error('Error at getting orders');
  }
};

export const getOrder = async (id: number): Promise<Order> => {
  try {
    const ordersResponse = (await axios.get(`${API_URL}/orders/${id}`))
      .data as OrderResponse;
    return getFormattedOrder(ordersResponse['order']);
  } catch (error) {
    console.log(error);
    throw new Error('Error at getting order');
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const productResponse = (await axios.get(`${API_URL}/products`))
      .data as ProductResponse;
    const mappedProducts = productResponse['products'].map((product) => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
    }));
    return mappedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createOrder = async (
  order: CreateOrderBody
): Promise<orderCreatedResponse> => {
  try {
    console.log(order);
    const createOrderResponse = (await axios.post(`${API_URL}/orders`, order))
      .data as orderCreatedResponse;
    return createOrderResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Error at creating');
  }
};

export const editOrder = async (id: number, order: CreateOrderBody) => {
  try {
    const editOrderResponse = (
      await axios.patch(`${API_URL}/orders/${id}`, order)
    ).data as orderCreatedResponse;
    return editOrderResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Error at creating');
  }
};

export const deleteOrder = async (id: number): Promise<DeleteOrderResponse> => {
  try {
    const deleteOrderResponse = (await axios.delete(`${API_URL}/orders/${id}`))
      .data as DeleteOrderResponse;
    return deleteOrderResponse;
  } catch (error) {
    console.log(error);
    throw new Error('Error at creating');
  }
};
