import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tables.css";

const Table = () => {
  const BACKEND_URL = "http://localhost:3001";
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 },
  ];
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/transactions`, {
        params: {
          search,
          page,
          perPage,
        },
      });
      setTransactions(response.data.data);
      const total = Math.ceil(response.data.total / perPage);
      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleMonth = (e) => {
    const month = e.target.value;
    setSearch(month);
    setPage(1);
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, page, perPage,fetchData]);

  return (
    <div className="submitted-data-main">
      <div className="submitted-instructions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search transaction"
            onChange={handleSearch}
          />
        </div>
        <select onChange={handleMonth}>
          <option>Select Month</option>
          {months.map((month) => (
            <option key={month.number} value={month.number}>
              {month.name}
            </option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const rowColor = index % 2 === 0 ? "#f0f0f0" : "#ffffff";

            return (
              <tr
                className="table-data"
                style={{ backgroundColor: rowColor }}
                key={index}
              >
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>
                  <a href={transaction.image} target="_blank" rel="noopener noreferrer">
                    {transaction.image
                      ? transaction.image.substring(0, 30)
                      : "No Image"}...
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="page-info">
          <span>Page {page} of {totalPages}</span>
        </div>
        <div className="btns">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            style={{ backgroundColor: page === 1 ? "#d3d3d3" : "#007aff" }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            style={{ backgroundColor: page === totalPages ? "#d3d3d3" : "#007aff" }}
          >
            Next
          </button>
        </div>
        <div className="per-page">
          <span>{perPage} per page</span>
        </div>
      </div>
    </div>
  );
};

export default Table;
