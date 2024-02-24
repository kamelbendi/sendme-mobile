export function phoneNumberValidation(phoneNumber, length) {
  const regex = new RegExp(`^\\d{${length}}$`);

  return regex.test(phoneNumber);
}
