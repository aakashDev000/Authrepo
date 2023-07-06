import axios from "axios";

export const signuprequest = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/auth/admin/signup", { data })
      .then((res) => {
        if (res.status === 201) {
          resolve(res);
        }
      })
      .catch((err) => {
        console.log("err*********", err.response);
        reject(err.response);
      });
  });
};

export const signinrequest = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/auth/admin/signin", { data })
      .then((res) => {
        if (res.status === 200) {
          if (res && res.data && res.data.data) {
            const { authtoken = "" } = res.data.data;
            if (authtoken) localStorage.setItem("authtoken", authtoken);
          }
          resolve(res);
        }
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};

export const signoutrequest = () => {
  return new Promise((resolve, reject) => {
    const authtoken = localStorage.getItem("authtoken");
    axios
      .post("http://localhost:5000/api/v1/auth/signout", {
        data: { authtoken },
      })
      .then((res) => {
        console.log("res****", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};

export const getDocData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/api/v1/docdata", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        console.log("res****", res);
        resolve(res.data.data);
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};

export const addUserData = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "http://localhost:5000/api/v1/auth/admin/adduser",

        {
          data,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("authtoken"),
          },
        }
      )
      .then((res) => {
        console.log("res****", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response.data.data);
      });
  });
};

export const getUserPaginationData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:5000/api/v1/auth/admin/users/pagination", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authtoken"),
        },
      })
      .then((res) => {
        console.log("res****", res);
        resolve(res.data.data);
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};

export const userSignup = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/user/signup", {
        data,
      })
      .then((res) => {
        console.log("res****", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};

export const usersigninrequest = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:5000/api/v1/user/signin", { data })
      .then((res) => {
        if (res.status === 200) {
          if (res && res.data && res.data.data) {
            const { authtoken = "" } = res.data.data;
            if (authtoken) localStorage.setItem("authtoken", authtoken);
          }
          resolve(res);
        }
      })
      .catch((err) => {
        console.log("err*********", err);
        reject(err.response);
      });
  });
};
