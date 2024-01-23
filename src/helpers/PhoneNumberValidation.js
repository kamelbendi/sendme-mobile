export function PhoneNumberValidation(phoneNumber) {
    // Regular expression to match exactly 9 digits
    const regex = /^\d{9}$/;
  
    // Test if the input matches the pattern
    return regex.test(phoneNumber);
  }