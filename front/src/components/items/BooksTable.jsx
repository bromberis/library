import React, { useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import swal from 'sweetalert';
import { deleteBook, getAllBooks } from '../../api/library/BooksApi';
import UpdateForm from './UpdateForm';

function BooksTable({ id, title, author, category, information, year }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <tr>
        <td>{year}</td>
        <td>{title}</td>
        <td>{author}</td>
        <td>{category}</td>
        <td>{information}</td>
        <td>
          {' '}
          <button
            className='btn m-1 custom-button-edit'
            onClick={() => setIsEditing(!isEditing)}
          >
            <BsPencil color='#7e685a' fontSize='1.5em' />
          </button>
          <button
            className='btn  m-1 custom-button-tr'
            onClick={() =>
              swal({
                title: 'Ar tikrai norite ištrinti?',
                icon: 'warning',
                buttons: ['Atšaukti', 'Gerai'],
              }).then((isConfirm) => {
                if (isConfirm) {
                  deleteBook(id).then(() => {
                    getAllBooks();
                  });
                }
              })
            }
          >
            <BsTrash color='#7e685a' fontSize='1.5em' />
          </button>
        </td>
      </tr>
      {isEditing === true && (
        <tr>
          <UpdateForm
            key={id}
            id={id}
            title={title}
            author={author}
            category={category}
            information={information}
            year={year}
            setIsEditing={setIsEditing}
          />
        </tr>
      )}
    </>
  );
}

export default BooksTable;
