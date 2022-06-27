import React from 'react';
import { useForm } from 'react-hook-form';
import './ItemsStyle.css';
import { createBook } from '../../api/library/BooksApi';

function BooksForm() {
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
    console.log(data);
    createBook(data);
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className='rounded-0 input-custom '
            placeholder='Pavadinimas'
            type='text'
            name='title'
            id='title'
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
        <button type='submit'>Pridėti</button>
      </form>
    </>
  );
}

export default BooksForm;
