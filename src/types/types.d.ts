interface BaseProduct {
  id: number;
  name: string;
}

export interface Product extends BaseProduct {
  price: number;
}

export interface SelectedProduct extends BaseProduct {
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface EditingProduct {
  id: number;
  quantity: number;
}

export interface Order {
  id: number;
  orderNo: string;
  date: string;
  productsNo: number;
  finalPrice: number;
  selectedProducts: SelectedProduct[];
}
