import React, { useState } from 'react';
import { useGlobalUserContext } from '../context/UserContext';

function ItemsTable({ id, title, author, category, information, year }) {
  return (
    <>
      <tr>
        <td>{year}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{category}</td>
        <td>{information}</td>
      </tr>
    </>
  );
}

export default ItemsTable;
