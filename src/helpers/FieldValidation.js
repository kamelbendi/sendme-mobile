/* eslint-disable */
export default function fieldValidation(name) {
    const regex = /^[a-zA-Z\s]+$/i;
  
    return Boolean(name && regex.test(name) && name.length <= 120);
  }
  