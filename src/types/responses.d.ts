export interface ProductResponse {
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: string;
}

export interface CreateOrderBody {
  orderNo: string;
  date: string;
  productsNo: number;
  finalPrice: number;
  selectedProducts: SelectedProduct[];
}

export interface SelectedProduct {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface orderCreatedResponse {
  order: Order;
}

interface Order {
  id: number;
  orderNo: number;
  date: Date;
  productsNo: number;
  finalPrice: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface OrdersResponse {
  orders: OrderResponseItem[];
}

export interface OrderResponse {
  order: OrderResponseItem;
}

interface OrderResponseItem {
  id: number;
  orderNo: number;
  date: string;
  productsNo: number;
  finalPrice: string;
  selectedProducts: {
    id: number;
    name: string;
    unitPrice: string;
    quantity: number;
    totalPrice: number;
  }[];
}

export interface DeleteOrderResponse {
  message: string;
}