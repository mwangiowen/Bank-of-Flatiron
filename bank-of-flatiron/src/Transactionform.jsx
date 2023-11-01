import React, { useState, useEffect } from "react";

function TransactionForm(props) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
  });

  const [transactionOptions, setTransactionOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json())
      .then((data) => {
        const transactionDescriptions = data.map(
          (transaction) => transaction.description
        );
        const categories = data.map((transaction) => transaction.category);

        const uniqueTransactionDescriptions = [
          ...new Set(transactionDescriptions),
        ];
        const uniqueCategories = [...new Set(categories)];

        setTransactionOptions(uniqueTransactionDescriptions);
        setCategoryOptions(uniqueCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDescriptionChange = (e) => {
    setSelectedDescription(e.target.value);
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData({
      ...formData,
      category: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountAsNumber = parseFloat(formData.amount);

    if (!isNaN(amountAsNumber)) {
      const newTransaction = {
        id: Math.floor(Math.random() * 10000),
        ...formData,
        amount: amountAsNumber,
      };

      props.onTransactionSubmit(newTransaction);
      setFormData({
        date: "",
        description: "",
        category: "",
        amount: "",
      });
      setSelectedDescription("");
      setSelectedCategory("");
    } else {
      alert("Amount must be a valid number.");
    }
  };

  return (
    <div>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={selectedDescription}
            onChange={handleDescriptionChange}
            required
          />
          <select
            name="description"
            value={selectedDescription}
            onChange={handleDescriptionChange}
            required
          >
            <option value="">Select an option</option>
            {transactionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          />
          <select
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default TransactionForm;
