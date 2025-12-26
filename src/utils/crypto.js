import CryptoJS from "crypto-js";

export function encryptText(text, password) {
  return CryptoJS.AES.encrypt(text, password).toString();
}

export function decryptText(cipherText, password) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch {
    return "";
  }
}
