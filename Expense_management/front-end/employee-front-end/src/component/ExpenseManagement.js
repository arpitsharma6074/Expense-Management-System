import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExpenseManagement = () => {
  const { userId } = useParams(); // Extract userId from the route
  const [expense, setExpense] = useState({
    amount: "",
    date: "",
    category: "",
    description: "",
  });
  const [expenseList, setExpenseList] = useState([]);
  const [editing, setEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // ID of the expense being edited

  const API_BASE_URL = `http://localhost:9898/api/user/${userId}/expense`;

  // CSS styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    form: {
      width: "600px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
    },
    cancelButton: {
      padding: "10px",
      backgroundColor: "gray",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
  };

  // Fetch expenses when the component loads
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all`);
      setExpenseList(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  // Add or update an expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      // Update an existing expense
      try {
        const payload = { ...expense, id: editId };
        const response = await axios.post(`${API_BASE_URL}/add`, payload);
        setExpenseList(response.data); // Update the list
        resetForm();
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    } else {
      // Add a new expense
      try {
        const response = await axios.post(`${API_BASE_URL}/add`, expense);
        setExpenseList(response.data); // Update the list
        resetForm();
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  // Delete an expense
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setExpenseList(response.data); // Update the list
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Edit an expense
  const handleEdit = (expense) => {
    setExpense({
      amount: expense.amount,
      date: expense.date,
      category: expense.category,
      description: expense.description,
    });
    setEditId(expense.id);
    setEditing(true);
  };

  // Reset the form
  const resetForm = () => {
    setExpense({
      amount: "",
      date: "",
      category: "",
      description: "",
    });
    setEditId(null);
    setEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span role="img" aria-label="building">🏛️</span> Expense Management System
      </div>

      {/* Expense Form */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            style={styles.input}
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            style={styles.input}
            type="date"
            name="date"
            placeholder="Enter Date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            style={styles.input}
            type="text"
            name="category"
            placeholder="Enter Category"
            value={expense.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            style={styles.input}
            name="description"
            placeholder="Description"
            value={expense.description}
            onChange={handleChange}
            required
          />
        </div>
        <button style={styles.button} type="submit">
          {editing ? "Update Expense" : "Add Expense"}
        </button>
        {editing && (
          <button
            style={styles.cancelButton}
            type="button"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Expense List */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User Name</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.map((exp) => (
            <tr key={exp.id}>
              <td style={styles.tableCell}>{exp.userName}</td>
              <td style={styles.tableCell}>{exp.amount}</td>
              <td style={styles.tableCell}>{exp.date}</td>
              <td style={styles.tableCell}>{exp.category}</td>
              <td style={styles.tableCell}>{exp.description}</td>
              <td style={styles.tableCell}>{exp.status}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.button}
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: "red",
                  }}
                  onClick={() => handleDelete(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseManagement;
