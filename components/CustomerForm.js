// components/CustomerForm.js

import React, { useState } from "react";
import { addCustomer } from "../firebase/services";

const CustomerForm = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    // Add more fields as needed
  });

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCustomer(customerData);
    setCustomerData({
      name: "",
      email: "",
      // Reset more fields as needed
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={customerData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
        />
      </label>
      {/* Add more fields as needed */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerForm;