import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AESCryptoService } from '../cryptomanager/aescrypto.service';
// import * as jwt from 'jsonwebtoken';
// import * as crypto from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl = environment.ServerUrl;

  FalcaServerUrl = environment.FalcaServerUrl;
  header = {
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', '*')
      .set('Access-Control-Allow-Headers', 'Content-Type')
  };

  constructor(private httpClient: HttpClient, private crypto: AESCryptoService) { }

  public get(url: string, auth = false): Observable<any> {
    url = this.serverUrl + url;  
    if (auth) {
      let token = this.crypto.Decrypt(localStorage.getItem("CustToken")).token;
      this.header.headers = this.header.headers.set("Authorization", "Bearer " + token);
    }
    return this.httpClient.get<any>(url, this.header).pipe(
      catchError(this.handleError)
    );
  }

  public post(url: string, data: any, auth = false, fromdata: boolean = false): Observable<any> {
    url = this.serverUrl + url;
    if (auth) {
      let token = this.crypto.Decrypt(localStorage.getItem("CustToken")).token;
      this.header.headers = this.header.headers.set("Authorization", "Bearer " + token);
    }
    return this.httpClient.post<any>(url, data, this.header).pipe(
      catchError(this.handleError)
    );
  }


  public postencode(url: string, data: any, auth = false, fromdata: boolean = false): Observable<any> {
    url = this.FalcaServerUrl + url;
    // const private_key ='-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAyTsBxDrZhiUKqSqW7jtsMJRzgn1g6e4SBH0yf7x1aFFbseMT\n6OazUr6wZgHUY6xVByHgcZufkopN1+NizZT+ciZE4iJvfr49rRQNfhkV1/i8FdSo\n4AMdQwGRHEPsRkPTcAYu+bMMZNlj113F64zO3ykRDQKUZbvOUzMpU7Wp3YGFrdaJ\nBdjDreo1/8g5q83T1SPNg9hJfGM5d4X6W/XBPxGqplzDFO3l3jnLfEHJRMF+Qi9O\n91wZO1Rcn66MPZl89h+P5R/Mw1ZoUN2JLEUzqk/TnCUKqkmNpNi101O0bRxZ97k6\n9RskfMAXklhFZIXXi/s9Lk32dPlc+/EPeV1AtQIDAQABAoIBABAvC3OTcxKfkIWt\n6/ERfOBEVCzitgRiVfcf9YuB5eRjpK8ADwYcZcAqH2g4zfLNNZJrBlDEvhbsQhny\niuvzR2p5SvFv6Q0lsjKlCffB/zh9I+1SitlnTrdonRnLmalGA69/A9Cntn+23xl/\nTG9nBe07MYidFD/BVLTqyLBXjCeJAkGQ8QHrp1Sr0md6b4yxbiHZ8+X/c8CJX19C\nYwsqsqCaHx5nAkd8OZct2xgn7e7K44hwHR84hVGevLIBglZvlFCe8gl4e0y85uXm\nY5zTDQxTP8N4zXmpI+XiJnfTE30s4+vH9guJBe3YxGHSrar+0mZVdzpBdB6giIBR\nOhyY4jECgYEAzlraFMOeHNS4GHJYdXb2WxXvVURNl1SP3Q7WQhlWJos8SM0XRXtH\nH3xRnWOYmGKUmkO9ef9GWeFALqxKvlnzmnbEABseNNFG7IVZyYhBNYytnFHJ5Afd\nNS2TjFPpSZvnrGzIM55kDBbdjMNw/tfJUJ4WCu4paewmhT/z0Tby5BECgYEA+aSM\nvVz4nvClyxDvcXxNGrnh5p0YQMUEJErHbnSjhjD/kQ66hfE/RMpVvZVgDW3GJj1V\n6daBCVp9LCE0poOLVEAuCCZDkArSREbqunhCHqnjoqfcs59k5j2K3f85r7auKKWm\nCHGhvQg4bVJnUYra1v0/+4/sF6vY5USwvKKC5mUCgYBrEu1SFOb4ItCbrsmDugS+\n4rTbU6PHQFOd6tL2XVs8iMbxJ6pJnVwcVE+tET7e41gka73njbQdcynwjeoCt34V\nykaNn4Se93CLze33CsJ7XNHA6RePQR1hOJL1H51PWpxt9cw0LJ3RQBQZtFfvhFyr\nfjwF0+qdUbHzNmn3R0HlYQKBgQDg3S9Igq4PvIQaXa7Qcj6hjD3HFEn8TXplllX9\nUGLbRNdvOe0ZKSzsMbT5h8t1TSPm3ei9MNIaMr/9OAvM0UB3KzhLbuv8m0K67YYR\nYLFuHWlF4h4STcj8+wJS5Mp5U/ub8VmU0YX2V6k8D7Ww5XopnQQ8/G6VA93i5fSs\ndVWjYQKBgQDJEq+Yqki76+6aFVAMjIYc/lbC/y6mc/V/drmICA4zUFmE1tEpGVxs\nDxnhHhTsiFprjFyoXar4ZQso/twN5OBpJvgIvqM0DnKqPNEBKc8JZRWIGeh6vGnd\n7ZnNGjrb2bX2PhQLnkvJ95CytJIXO/1xNN1avIAIw6glSeGxVgOCAA==\n-----END RSA PRIVATE KEY-----'

    if (auth) {
      let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzIjoiUD94QDNCTDdrKG0pIn0.FDZhbs9aqFypIjdNiXt2XrZn5WhH83uiiADixySL30yQMQgws5oOXJsIuuIJgB8pK0Xc7G7zytKdofvcapkrgOLuPa1K_yS-AEkTjV0Nh8aPK8fYTVZ_dVEJGt-IXXrx75-FhNTeFjZGi5-JugC7rLyKFOY4OAc8hX0qF8EaPGUSdw5kpPM9Ab-YpcnF7GlxYsum9C-IeZ9ojZtzpvMfr-9oqaAVSotbQUX7URl_No_gf8IsVJg9l4V3TrWuqBe_cSGClfRHdvHXC2BTNwf0tQvy7kq4G60dQEMKALsCKy9kEpc6QFQqvGA1sZR8n9OzFr5uARaNDVKRgJJFqg_78w'
      this.header.headers = this.header.headers.set("access-token" , token);
    }
    return this.httpClient.post<any>(url, data, this.header)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }
  handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      if (localStorage.getItem("SessionServerAlert") == null) {
        localStorage.setItem("SessionServerAlert", "1");
        alert("Server Down!! Please Try Again Later..");
        window.location.href = "/";
      }
    }
  
    return throwError('Something bad happened; please try again later.');
  };


}



