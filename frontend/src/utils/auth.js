export const storeAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};
