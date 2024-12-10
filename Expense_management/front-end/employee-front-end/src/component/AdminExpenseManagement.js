import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminExpenseManagement = () => {
  const [expenseList, setExpenseList] = useState([]); // List of expenses
  const [loadingId, setLoadingId] = useState(null); // Tracks which expense is loading

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px",
    },
    tableCell: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      textAlign: "left",
    },
    button: {
      margin: "0 5px",
      padding: "5px 10px",
      cursor: "pointer",
    },
    buttonDisabled: {
      margin: "0 5px",
      padding: "5px 10px",
      cursor: "not-allowed",
      backgroundColor: "#ccc",
    },
  };

  // Fetch expenses from the API
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9898/api/admin/expense/getexpenses"
      );
      setExpenseList(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Handle Approve
  const handleApprove = async (expense) => {
    if (!expense || !expense.expenseId) {
      console.error("Invalid expense object");
      return;
    }

    setLoadingId(expense.expenseId); // Set loading state for this expense
    try {
      await axios.put(
        `http://localhost:9898/api/admin/expense/update/${expense.expenseId}`
      );

      // Update the status in the current list
      setExpenseList((prevList) =>
        prevList.map((exp) =>
          exp.expenseId === expense.expenseId ? { ...exp, status: "Approved" } : exp
        )
      );
    } catch (error) {
      console.error("Error approving expense:", error);
    } finally {
      setLoadingId(null); // Reset loading state
    }
  };

  // Handle Reject
  const handleReject = async (expense) => {
    if (!expense || !expense.expenseId) {
      console.error("Invalid expense object");
      return;
    }

    setLoadingId(expense.expenseId); // Set loading state for this expense
    try {
      await axios.put(
        `http://localhost:9898/api/admin/expense/reject/${expense.expenseId}`
      );

      // Update the status in the current list
      setExpenseList((prevList) =>
        prevList.map((exp) =>
          exp.expenseId === expense.expenseId ? { ...exp, status: "Rejected" } : exp
        )
      );
    } catch (error) {
      console.error("Error rejecting expense:", error);
    } finally {
      setLoadingId(null); // Reset loading state
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span role="img" aria-label="building">
          🏛️
        </span>{" "}
        Expense Management System
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>User</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Category</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseList.length > 0 ? (
            expenseList.map((exp) => (
              <tr key={exp.expenseId}>
                <td style={styles.tableCell}>{exp.userName}</td>
                <td style={styles.tableCell}>{exp.amount}</td>
                <td style={styles.tableCell}>{exp.date}</td>
                <td style={styles.tableCell}>{exp.category}</td>
                <td style={styles.tableCell}>{exp.description}</td>
                <td style={styles.tableCell}>
                  {exp.status === "Pending" ? (
                    <div>
                      <button
                        style={
                          loadingId === exp.expenseId
                            ? styles.buttonDisabled
                            : styles.button
                        }
                        onClick={() => handleApprove(exp)}
                        disabled={loadingId === exp.expenseId}
                      >
                        {loadingId === exp.expenseId ? "Processing..." : "Approve"}
                      </button>
                      <button
                        style={
                          loadingId === exp.expenseId
                            ? styles.buttonDisabled
                            : styles.button
                        }
                        onClick={() => handleReject(exp)}
                        disabled={loadingId === exp.expenseId}
                      >
                        {loadingId === exp.expenseId ? "Processing..." : "Reject"}
                      </button>
                    </div>
                  ) : (
                    exp.status
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.tableCell}>
                No expenses available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminExpenseManagement;
