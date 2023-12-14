export const getUserToken = () => {
  return sessionStorage.getItem("userToken");
};
export const setUserToken = (token) => {
  return sessionStorage.setItem("userToken", token);
};
export const expireUserToken = () => {
  return sessionStorage.removeItem("userToken");
};
