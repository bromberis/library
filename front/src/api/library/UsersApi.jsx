import axiosUser from "../apiUsers";
import swal from "sweetalert";

//USER

export async function getAllUsersData() {
  const res = await axiosUser.get("/");
  return res;
}
export async function getUserById(id) {
  const res = await axiosUser.get(`/${id}`);
  return res;
}
export async function createUser(data) {
  const res = await axiosUser.post("/register", JSON.stringify(data));
  return res;
}

export async function getEmail(email) {
  const res = await axiosUser.get(`/email?email=${email}`);

  return res.data.data.users;
}

export async function loginUser(data) {
  const res = await axiosUser.post(
    `/login?email=${data.email}&password=${data.password}`,
    JSON.stringify(data)
  );
  return res;
}

//ITEMS

export async function getAllUserItems(id) {
  const res = await axiosUser.get(`/${id}/items`);
  return res;
}

export async function createUserItems(id, data) {
  const response = await axiosUser
    .patch(`/${id}/items/`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Įrašyta!",
        button: "Puiku",
        icon: "success",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function findItemAndUpdate(data, id, subID) {
  const response = await axiosUser
    .patch(`/${id}/items/upd/${subID}`, JSON.stringify(data))
    .then((result) => {
      swal({
        text: "Atnaujinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });

  return response;
}

export async function findItemAndDelete(id, subID) {
  const response = await axiosUser
    .patch(`/${id}/items/dlt/${subID}`)
    .then((result) => {
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 2000,
      });
    })
    .catch((error) => {
      swal({
        text: "Klaida!",
        icon: "error",
        button: "Gerai",
        timer: 2000,
      });
    });
}
