import redirectAfterService from '@actions/redirectAfterService';

async function userLogout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('isComissionAgent');

  await redirectAfterService('/');
}

export default userLogout;
