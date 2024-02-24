/* eslint-disable */
export default function passwordValidation(password) {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#%&_\+\{\}":\?\>\<\[\];'\/\.\\-]).{8,}$/i;

  if (password.length < 8) {
    return false;
  }
  return regex.test(password);
}
  