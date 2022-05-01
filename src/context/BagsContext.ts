import { Address } from "../models/AddressModel";
import { Customer } from "../models/CustomerModel";
import { Product } from "../models/ProductModel";
import { ProductOrder } from "../models/ProductOrderModel";

export interface BagContextModel {
  customer: Customer[];
  address: Address[];
  product: Product[];
  productOrder: ProductOrder[];
  first_name: string;
  last_name: string;
  user_id: number;
}
