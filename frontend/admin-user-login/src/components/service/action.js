import axios from "axios";

export const signuprequest = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/auth/admin/signup", { data })
      .then((res) => {
        console.log("res****", res);
        if (res.status === 201) {
          resolve(res);
        }
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err);
      });
  });
};

export const signinrequest = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/auth/admin/signin", { data })
      .then((res) => {
        console.log("res****", res);
        if (res.status === 200) {
          resolve(res);
        }
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err);
      });
  });
};
