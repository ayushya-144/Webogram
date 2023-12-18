export const getUserToken = () => {
  const cookie = document.cookie;
  const cookieValue = cookie.split("=")[1];
  return cookieValue;
};
export const setUserToken = (token) => {
  let expires = "";
  let date = new Date();
  date.setTime(date.getTime() + 30 * 60 * 1000);
  expires = `expires= ${date.toUTCString()}`;
  document.cookie = `userToken = ${token}; ${expires}"`;
};
export const expireUserToken = () => {
  document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
};
