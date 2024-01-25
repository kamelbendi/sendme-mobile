export function phoneNumberValidation(phoneNumber, length) {
  // Dynamic regular expression with a variable for the number of digits
  const regex = new RegExp(`^\\d{${length}}$`);

  // Test if the input matches the pattern
  return regex.test(phoneNumber);
}
