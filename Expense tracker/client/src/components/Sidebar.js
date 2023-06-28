import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside>
      <h2>Manage Expenses</h2>
      <ul>
        <li>
          <Link to="/">Expense List</Link>
        </li>
        <li>
          <Link to="/expenses/new">Add Expense</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
