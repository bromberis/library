import React from 'react';
import { useGlobalUserContext } from '../context/UserContext';
import ItemsTable from './ItemsTable';
import './ItemsStyle.css';

function Items() {
  const { userData } = useGlobalUserContext();
  console.log(userData.reserved);
  if (Object.keys(userData).length !== 0) {
    var userItemsData = userData.reservedBooks.map((item) => {
      return (
        <ItemsTable
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
    <table className='items-table'>
      <thead>
        <tr>
          <th className='smaller-th'>Leidimo metai</th>
          <th className='smaller-th'>Pavadinimas</th>
          <th className='smaller-th'>Autorius</th>
          <th className='smaller-th'>Kategorija</th>
          <th className='smaller-th'>Informacija</th>
        </tr>
      </thead>
      <tbody>{userItemsData}</tbody>
    </table>
  );
}

export default Items;
