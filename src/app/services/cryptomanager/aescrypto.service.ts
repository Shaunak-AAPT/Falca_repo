import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AESCryptoService {

  private Key = CryptoJS.enc.Base64.parse("1nB0jFNeWxzqwF9xxaSx9ljzu0UCCcAvcawuDLyiXkw=");
  private IV = CryptoJS.enc.Base64.parse("17BXpOGRAZ82EsH9Ok4xTw==");
  
  Encrypt(value:any){
    const SecureRequest=JSON.stringify(value);
    let encrypted = CryptoJS.AES.encrypt(SecureRequest, this.Key,
    {
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  Decrypt(value:any){
    let decrypted = CryptoJS.AES.decrypt(value, this.Key, {
        iv: this.IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
     return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
  }
}
