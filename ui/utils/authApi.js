import axios from "axios";
const apiUrl = "http://localhost:3000";

export const login = async (data) => {
  const {
    data: {
      data: { user },
    },
  } = await axios(`${apiUrl}/api/users/login`, {
    method: "POST",
    data,
  });
  // console.log(response);
  return user;
};

export const logout = async () => {
  const {
    data: { status },
  } = await axios(`${apiUrl}/api/users/logout`);
  return status === "success";
};

export const isLoggedIn = async (token) => {
  const response = await fetch(`${apiUrl}/api/user/isloggedin`, {
    method: "GET",
    credentials: "include",
    body: JSON.stringify({ token }),
  });

  const data = await response.json();

  return data;
};

export const updateUser = async (data, userId) => {
  const {
    data: { data: user },
  } = await axios(`${apiUrl}/api/users/${userId}`, {
    method: "PATCH",
    data,
  });

  return user;
};

export const createUser = async (data) => {
  const {
    data: {
      data: { user },
    },
  } = await axios(`${apiUrl}/api/users/signup`, {
    method: "POST",
    data,
  });

  return user;
};

export const sendResetToken = async (email) => {
  const {
    data: { token },
  } = await axios(`${apiUrl}/api/users/send-token`, {
    method: "POST",
    data: { email },
  });
  console.log(token);
  return token;
};

export const resetPassword = async (data) => {
  const {
    data: { status },
  } = await axios(`${apiUrl}/api/users/reset-password`, {
    method: "PATCH",
    data,
  });
  return status === "success";
};
