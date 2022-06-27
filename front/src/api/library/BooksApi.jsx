import axiosBooks from '../apiBooks';
import swal from 'sweetalert';

export async function getAllBooks() {
  const res = await axiosBooks.get('/');
  return res;
}

export async function deleteBook(id) {
  const res = await axiosBooks.get(`/delete/${id}`).then((result) => {
    swal({
      text: 'Ištrinta!',
      icon: 'success',
      button: 'Gerai',
      timer: 2000,
    });
  });
  return res;
}

export async function createBook(data) {
  const res = await axiosBooks
    .post('/', JSON.stringify(data))
    .then((result) => {
      swal({
        text: 'Pridėta!',
        icon: 'success',
        button: 'Gerai',
        timer: 2000,
      });
    })
    .catch((error) => {});
}

export async function updateBook(id, data) {
  const response = await axiosBooks
    .patch(`/update/${id}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: 'Atnaujinta!',
        icon: 'success',
        button: 'Gerai',
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: 'Klaida!',
        icon: 'error',
        button: 'Gerai',
        timer: 2000,
      });
    });

  return response;
}
