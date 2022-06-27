import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Items from './components/items/Items';
import Home from './components/home/Home';
// import ItemsForm from "./components/items/ItemsForm";
import Search from './components/items/Search';
import { UserProvider } from './components/context/UserContext';
import Books from './components/items/Books';
import BooksForm from './components/items/BooksForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/items' element={<Items />} />
            <Route path='/search' element={<Search />} />
            <Route path='/allbooks' element={<Books />} />
            <Route path='/addbook' element={<BooksForm />} />
          </Route>

          <Route path='/' element={<App />}>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
