import cookie from 'js-cookie';

function setCookie(userInfo) {
  const arr = Object.entries(userInfo);
  for (const value of arr) {
    cookie.set(value[0], value[1]);
  }
}
function getCookie() {
  return {
    appkey: cookie.get('appkey'),
    username: cookie.get('username'),
    email: cookie.get('email'),
    role: cookie.get('role'),
  };
}

function removeCookie() {
  cookie.remove('appkey'),
  cookie.remove('username'),
  cookie.remove('email'),
  cookie.remove('role');
}

export default {
  setCookie,
  getCookie,
  removeCookie,
};
