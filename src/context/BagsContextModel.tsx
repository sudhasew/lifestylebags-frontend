import { Address } from "cluster";
import { ReactNode, useEffect, useState } from "react";
import { Customer } from "../models/CustomerModel";
import { BagsContext } from "../context/BagsContext";

interface Props {
  children: ReactNode;
}

export function BagsContextProvider({ children }: Props) {
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem("customerStorage") || "[]";
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [address, setAddress] = useState<Address[]>(() => {
    const saved = localStorage.getItem("addressStorage") || "[]";
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [loggedCustomers, setLoggedCustomers] = useState<boolean>(() => {
    const saved = localStorage.getItem("customerLogin");
    const initialValue = saved === "true" ? true : false;
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem("customerStorage", JSON.stringify(customers));
    localStorage.setItem("customerLogin", JSON.stringify(loggedCustomers));
  }, [customers, loggedCustomers]);

  function addCustomer(customer: Customer) {
    setCustomers([...customers, customer]);
  }

  function loginCustomer() {
    setLoggedCustomers(true);
  }

  function logoutCustomer() {
    setLoggedCustomers(false);
  }

  const [first_name, setFirstName] = useState<string>("");

  function addFirstName(first_name: string) {
    setFirstName(first_name);
  }

  const [last_name, setLastName] = useState<string>("");

  function addLastName(last_name: string) {
    setLastName(last_name);
  }

  const [customer_id, setUserId] = useState<number>(0);

  function addCustomerId(customerid: number) {
    setUserId(customerid);
  }

  return (
    <BagsContext.Provider
      value={{
        customers,
        addCustomer,
        loggedCustomers,
        loginCustomer,
        logoutCustomer,
        last_name,
        first_name,
        addFirstName,
        addLastName,
        customer_id,
        addCustomerId,
      }}
    >
      {children}
    </BagsContext.Provider>
  );
}
