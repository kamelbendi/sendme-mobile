export default function usernameValidation(name) {
    const regex = /^[a-zA-Z\d._]+$/i;
  
    return Boolean(name && regex.test(name) && name.length <= 120);
}
