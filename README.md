# MERN Stack Coding Challenge

This project is a MERN stack application designed as a coding challenge. It consists of a backend API and a frontend application to handle transactions data fetched from a third-party API.

---

## Backend Task

### Data Source
- **Third Party API URL** 
- **Request Method**: GET  
- **Response Format**: JSON  

---

### Backend API Endpoints

#### 1. **Database Initialization API**
- Fetches JSON data from the third-party API and seeds the database.  
- Efficient table/collection structure can be defined.  

#### 2. **List Transactions API**
- **Endpoint**: `/api/transactions`
- **Method**: GET  
- **Description**: 
  - List all transactions based on the selected month (input as any month from January to December) matching the `dateOfSale` field, regardless of the year.  
  - Supports search on product `title`, `description`, and `price`.  
  - Supports pagination with default values:
    - `page = 1`
    - `perPage = 10`.  
- **Search Functionality**: 
  - If the search parameter is empty, return paginated data for the selected month.
  - If a search parameter is provided, return only matching transactions.

#### 3. **Statistics API**
- **Endpoint**: `/api/statistics`
- **Method**: GET  
- **Description**: Provides statistics for the selected month, including:
  - Total sale amount.
  - Total number of sold items.
  - Total number of not sold items.

#### 4. **Bar Chart API**
- **Endpoint**: `/api/bar-chart`
- **Method**: GET  
- **Description**: Returns the price range and the number of items in that range for the selected month:
  - 0 - 100
  - 101 - 200
  - 201 - 300
  - 301 - 400
  - 401 - 500
  - 501 - 600
  - 601 - 700
  - 701 - 800
  - 801 - 900
  - 901 and above.

#### 5. **Pie Chart API**
- **Endpoint**: `/api/pie-chart`
- **Method**: GET  
- **Description**: Finds unique categories and the number of items in each category for the selected month.

#### 6. **Combined Data API**
- **Endpoint**: `/api/combined`
- **Method**: GET  
- **Description**: Fetches data from the above APIs, combines the responses, and returns a single JSON response.

---

## Frontend Task

The frontend uses the APIs created above to display a table and charts on a single page.

### Features

1. **Transactions Table**
   - Displays transactions using the List Transactions API.
   - A dropdown allows month selection (January to December). Default month is March.
   - A search box filters transactions based on `title`, `description`, or `price`. Clearing the search box resets the data to the selected month.
   - Pagination controls (`Next` and `Previous`) fetch and display the respective page data.

2. **Transactions Statistics**
   - Displays total sale amount, total sold items, and total not sold items using the Statistics API.

3. **Transactions Bar Chart**
   - Displays a bar chart for the price ranges and the number of items in each range for the selected month using the Bar Chart API.

4. **Transactions Pie Chart**
   - Displays a pie chart for the unique categories and their respective item counts for the selected month using the Pie Chart API.

---

## Installation

### Backend Setup
1. Clone the repository:
   ```bach
   git clone https://github.com/unique8080/Roxiler_assessment.git
   ```
2. Navigate to the backend directory:
```bach
cd backend
```
3. Install dependencies:
```bach
npm install
```
4. Start the backend server:
```bach
node app.js
```

The server will run on `http://localhost:3001`.

### Frontend Setup
1. Navigate to the frontend directory:
```bach
cd frontend
```

2. Install dependencies:
```bach
npm install
```

3. Start the frontend server:
```bach
npm start
```
The app will run on `http://localhost:3000`.

---

## Dependencies

### Backend
- **Express**: Backend framework.
- **Mongoose**: MongoDB object modeling tool.
- **Axios**: For fetching third-party API data.
- **Cors**: Enables cross-origin requests.

### Frontend
- **React**: JavaScript library for building the user interface.
- **React Router**: For navigation and routing.
- **Axios**: For making API requests.
- **Chart.js**: For rendering bar and pie charts.

---

## Acknowledgements

- **React Router** for dynamic routing.
- **Chart.js** for beautiful chart visualizations.
