import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Table from './components/Table';
import Statistics from './components/Statistics';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Table/>,
      },{
        path:'pie-chart',
        element: <PieChart/>
      },{
        path:'statistics',
        element:<Statistics/>
      },{
        path:"bar-chart",
        element:<BarChart/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);