export default {
  generateOTP: function (): string {
    const string =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let OTP = '';
    const len = string.length;
    for (let i = 0; i < 6; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  },
};
