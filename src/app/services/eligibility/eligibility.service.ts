import { Injectable } from '@angular/core';
import { CheckEligibility } from 'src/app/models/checkEligibility.model';
import { AESCryptoService } from '../cryptomanager/aescrypto.service';

@Injectable({
  providedIn: 'root'
})
export class EligibilityService {

  eligibilityFirstStep = new CheckEligibility();

  constructor(private cryptoManager: AESCryptoService) { }

  setSessionParams(contentKey: any, args: any){
    let encryptedArgs = this.cryptoManager.Encrypt(JSON.stringify(args));
    localStorage.setItem(contentKey, encryptedArgs);
  }

  getSessionParams(contentKey: any){
    let encryptedArgs = localStorage.getItem(contentKey) ?? '';
    if(encryptedArgs === null || encryptedArgs === undefined || encryptedArgs === ''){
      return '';
    } else{
      return this.cryptoManager.Decrypt(encryptedArgs);
    }
  }

  clearSessionParam(contentKey: any){
    localStorage.removeItem('contentKey');
  }
  
}

