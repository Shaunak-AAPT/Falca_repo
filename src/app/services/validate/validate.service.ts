import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  numberOnly(event: KeyboardEvent): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  alphabetOnly(event: any): boolean {
    var keyCode = (event.which) ? event.which : event.keyCode
    if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32) {
      return false;
    }
    return true;
  }
  DesimalOnly(event: KeyboardEvent, value: string): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      return false;
    }
    if (value.indexOf('.') > -1 && charCode === 46) {
      return false;
    }
    return true;
  }

  validateEmail(email: any) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
  }

  validateMobileNumber(number: any) {
    const regularExpression = /^[6-9]\d{9}$/;
    return regularExpression.test(String(number).toLowerCase());
  }

  validatePancard(pancard: any) {
    const regularExpression = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    return regularExpression.test(String(pancard).toUpperCase());
  }
  validateAadharNumber(aadharNumber: any) {
    const regularExpression = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    return regularExpression.test(String(aadharNumber).toLowerCase());
  }

  validateAccountNumber(accountNumber: any) {
    const regularExpression = /^\d{9,18}$/;
    return regularExpression.test(String(accountNumber));
  }
  validateIFSCCode(accountNumber: any) {
    const regularExpression = /^[A-Za-z]{4}\d{7}$/;
    return regularExpression.test(String(accountNumber).toUpperCase());
  }


  amountWithLakhComma(value: string): string {
    value = value.toString();
    let valueDecimalSeprated = value.split('.');
    let AfterDecimal = "";
    if (valueDecimalSeprated.length > 0) {
      AfterDecimal = valueDecimalSeprated[1];
      value = valueDecimalSeprated[0];
    }
    value = value.replace(/,/g, '').split('').reverse().join('');//value.replace(',','');
    let valueLen = value.length;
    let pointer = 0;
    var str = new String(value);
    let LastChar = str.charAt(0);
    value = value.substring(1);
    for (let i = 0; i < valueLen; i++) {
      if (i % 2 === 0 && i < valueLen - 1 && i !== 0) {
        value = value.slice(0, i + pointer) + ',' + value.slice(i + pointer, valueLen + pointer);
        pointer++;
      }
    }
    return this.isNullEmptyUndefined(AfterDecimal) ? value.split('').reverse().join('') + LastChar : value.split('').reverse().join('') + LastChar + "." + AfterDecimal;
  }
  removeCommaFromAmount(value: string): number {
    value = value.replace(/,/g, '')
    return +value;
  }
  isNullEmptyUndefined(value: string): boolean {
    if (value === null || value === "" || value === undefined)
      return true;
    else
      return false;
  }

  hidePancardDigits(value: any) {
    var mainStr = value,
      vis = mainStr.slice(-2),
      countNum = '';
    for (var i = (mainStr.length) - 2; i > 0; i--) {
      countNum += 'X';
    }
    value = countNum + vis;
    return value;
  }

  indianRupeeFormat(val: any) {
    return Number(val).toLocaleString('en-IN');
  }

  getAge(value: string) {
    let timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }


}
