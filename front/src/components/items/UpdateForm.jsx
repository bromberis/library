import React from 'react';
import { useForm } from 'react-hook-form';
import { updateBook } from '../../api/library/BooksApi';

function UpdateForm({
  id,
  title,
  author,
  category,
  information,
  year,
  setIsEditing,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    updateBook(id, data);
    reset();
    setIsEditing(false);
  }

  return (
    <>
      <td colSpan='6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className='rounded-0 input-custom '
              placeholder='Pavadinimas'
              type='text'
              name='title'
              id='title'
              defaultValue={title}
              {...register('title', {
                maxLength: 80,
                minLength: 2,
                required: true,
                pattern:
                  /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
              })}
            />
          </div>
          {errors.title && (
            <p className='fs-4 text-danger fw-light text-center'>
              Būtinas laukelis, tik raidės, 2-80 simbolių.
            </p>
          )}
          <div>
            <input
              className='rounded-0 input-custom '
              placeholder='Autorius'
              type='text'
              name='author'
              id='author'
              defaultValue={author}
              {...register('author', {
                maxLength: 80,
                minLength: 2,
                required: true,
                pattern:
                  /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
              })}
            />
          </div>
          {errors.author && (
            <p className='fs-4 text-danger fw-light text-center'>
              Būtinas laukelis, tik raidės, 2-80 simbolių.
            </p>
          )}
          <div>
            <select
              className=' input-custom rounded-0'
              name='category'
              id='category'
              defaultValue={author}
              {...register('category', { required: true })}
            >
              <option value='Grožinė'>Grožinė</option>
              <option value='Mokslinė'>Mokslinė</option>
              <option value='Kalbų mokymo'>Kalbų mokymo</option>
              <option value='Vaikų'>Vaikų</option>
              <option value='Detektyvas'>Detektyvas</option>
              <option value='Fantastinė'>Fantastinė</option>
            </select>
          </div>
          <div>
            <input
              className='rounded-0 input-custom '
              placeholder='Papildoma informacija'
              type='text'
              name='information'
              id='information'
              defaultValue={information}
              {...register('information', {
                maxLength: 80,
                pattern:
                  /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
              })}
            />
          </div>
          {errors.information && (
            <p className='fs-4 text-danger fw-light text-center'>
              Ne daugiau 80 simbolių.
            </p>
          )}
          <div>
            <input
              className='rounded-0 input-custom '
              placeholder='Leidybos metai'
              type='number'
              name='year'
              id='year'
              defaultValue={year}
              {...register('year', {
                max: new Date().getFullYear(),
                min: 1900,
                required: true,
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.year && (
            <p className='fs-4 text-danger fw-light text-center'>
              Metai nuo 1900 iki einamųjų metų.
            </p>
          )}
          <button type='submit'>Atnaujinti</button>
          <button type='submit'>Atšaukti</button>
        </form>
      </td>
    </>
  );
}

export default UpdateForm;
