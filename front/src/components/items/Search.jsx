import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAllBooks } from '../../api/library/BooksApi';
import BooksTable from './BooksTable';

function Search() {
  const [booksList, setBooksList] = useState({});
  const [filteredBooksList, setFilteredBooksList] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAllBooks().then((res) => {
      setBooksList(res.data.data);
    });
  }, []);

  function searchBooks(data) {
    const filteredData = booksList.filter(() => booksList.title === data.title);
    return filteredData;
  }

  let booksData;
  if (booksList !== undefined) {
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
  }

  return (
    <div>
      <form onSubmit={handleSubmit(searchBooks)}>
        <input
          type='text'
          placeholder='Knygos pavadinimas'
          {...register('title', {
            minLength: 2,
            maxLength: 80,
            required: true,
          })}
        />
        {errors.title?.type === 'minLength' && 'Bent 2 simboliai'}
        {errors.title?.type === 'required' && 'Bent 2 simbloiai'}

        <button className='find-users-button' type='submit'>
          Ieškoti
        </button>
      </form>
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

export default Search;
