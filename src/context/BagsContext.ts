import { Address } from "../models/AddressModel";
import { Customer } from "../models/CustomerModel";
import { Product } from "../models/ProductModel";
import { ProductOrder } from "../models/ProductOrderModel";
import { createContext } from "react";

export interface BagContextModel {
  customers: Customer[];
  //   address: Address[];
  //   product: Product[];
  //   productOrder: ProductOrder[];
  loggedCustomers: boolean;
  addCustomer: (user: Customer) => void;
  first_name: string;
  last_name: string;
  customer_id: number;
  addFirstName: (first_name: string) => void;
  addLastName: (last_name: string) => void;
  addCustomerId: (userid: number) => void;
  loginCustomer: () => void;
  logoutCustomer: () => void;
}

const defaultValue: BagContextModel = {
  customers: [],
  //   address: [],
  //   product: [],
  //   productOrder: [],
  loggedCustomers: false,
  addCustomer: () => {},
  first_name: "",
  last_name: "",
  customer_id: 0,
  addFirstName: () => {},
  addLastName: () => {},
  addCustomerId: () => {},
  loginCustomer: () => {},
  logoutCustomer: () => {},
};

export const BagsContext = createContext<BagContextModel>(defaultValue);
