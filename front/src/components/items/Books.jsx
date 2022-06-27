import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../api/library/BooksApi';
import BooksTable from './BooksTable';

function Books() {
  const [booksList, setBooksList] = useState({});

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooksList(res.data.data);
    });
  }, [booksList]);

  let booksData;
  if (booksList.length > 0) {
    booksData = booksList.map((item) => {
      return (
        <BooksTable
          key={item._id}
          id={item._id}
          title={item.title}
          author={item.author}
          category={item.category}
          information={item.information}
          year={item.year}
        />
      );
    });
  }

  return (
    <div>
      <table className='items-table'>
        <thead>
          <tr>
            <th className='smaller-th'>Leidimo metai</th>
            <th className='smaller-th'>Pavadinimas</th>
            <th className='smaller-th'>Autorius</th>
            <th className='smaller-th'>Kategorija</th>
            <th className='smaller-th'>Informacija</th>
            <th className='smaller-th'>Veiksmai</th>
          </tr>
        </thead>
        <tbody>{booksData}</tbody>
      </table>
    </div>
  );
}

export default Books;
