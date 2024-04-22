import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.css'
})
export class PlaceholderComponent {
  // http: any;

  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router, private api: ApiService, private http: HttpClient,) {
  }
  isSubmitted = false;

  htmlContent: string = '';


  // Submit() {
  //   let payload = {
  //     customer_name: "Tenzing",
  //     customer_email: "dhugkar@gmail.com",
  //     customer_mobile_no: "7018485591",
  //     falca_branch_id: "FALCABRANCH1",
  //     falca_unique_ref_no: "FALCAUNIQ1234",
  //     customer_policy_no: "asdfg1234"
  //   }

  //   this.api.postencode("spprd/falca/pur_conf", payload, true, { responseType: 'text' }).subscribe(
  //     (response: any) => {
  //       console.log("falca response:- ", response);
     
  //   // // Extracting the URL from the HTML response
  //   // const redirectUrl = this.extractURLFromHTML(response);
        
  //   // if (redirectUrl) {
  //   //   // Redirect to the extracted URL
  //   //   window.location.href = redirectUrl;
  //   // } else {
  //   //   console.error("Redirect URL not found in the response");
  //   // }


  //   // Parse HTML content using DOMParser
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(response, 'text/html');

  //   // Extract and manipulate DOM elements as needed
  //   const titleElement = doc.querySelector('title');
  //   const redirectURL = doc.querySelector('meta[http-equiv="refresh"]')?.getAttribute('content')?.split('URL=')[1]?.trim();

  //   console.log("titleElement:-", titleElement);
  //   console.log("redirectURL:-", redirectURL);

  //   if (redirectURL) {
  //     // Redirect to the extracted URL
  //     window.location.href = redirectURL;
  //   } else {
  //     console.error("Redirect URL not found in the HTML content");
  //   }
  // },
  // (error: any) => {
  //   console.error('Failed to fetch HTML content:', error);
  

  //     });

  // }



  Submit() {

       let payload = {
      customer_name: "Shaunak",
      customer_email: "shaunak@gmail.com",
      customer_mobile_no: "8999678909",
      falca_branch_id: "FALCABRANCH2",
      falca_unique_ref_no: "FALCAUNIQ5678",
      customer_policy_no: "rtyui1234"
    }

    let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzIjoiUD94QDNCTDdrKG0pIn0.FDZhbs9aqFypIjdNiXt2XrZn5WhH83uiiADixySL30yQMQgws5oOXJsIuuIJgB8pK0Xc7G7zytKdofvcapkrgOLuPa1K_yS-AEkTjV0Nh8aPK8fYTVZ_dVEJGt-IXXrx75-FhNTeFjZGi5-JugC7rLyKFOY4OAc8hX0qF8EaPGUSdw5kpPM9Ab-YpcnF7GlxYsum9C-IeZ9ojZtzpvMfr-9oqaAVSotbQUX7URl_No_gf8IsVJg9l4V3TrWuqBe_cSGClfRHdvHXC2BTNwf0tQvy7kq4G60dQEMKALsCKy9kEpc6QFQqvGA1sZR8n9OzFr5uARaNDVKRgJJFqg_78w'
    // let headers = new HttpHeaders() 
    let headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', '*')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .set('access-token' , token);

    this.http.post('http://65.1.237.83:5800/api/spprd/falca/pur_conf', payload,{ responseType: 'text',headers: headers }).subscribe(
      (response: string) => {
        // Parse HTML content using DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(response, 'text/html');
  
        // Extract and manipulate DOM elements as needed
        const titleElement = doc.querySelector('title');
        const redirectURL = doc.querySelector('meta[http-equiv="refresh"]')?.getAttribute('content')?.split('URL=')[1]?.trim();
  
        if (redirectURL) {
          // Redirect to the extracted URL
          window.location.href = redirectURL;
        } else {
          console.error("Redirect URL not found in the HTML content");
        }
      },
      (error: any) => {
        console.error('Failed to fetch HTML content:', error);
      }
    );
  }
  

  // private extractURLFromHTML(html: string): string | null {
  //   // Create a temporary div element to hold the HTML content
  //   let tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = html;
    
  //   // Find the meta refresh tag
  //   let refreshMetaTag = tempDiv.querySelector('meta[http-equiv="refresh"]');
    
  //   // Check if the meta refresh tag exists and has the 'content' attribute
  //   if (refreshMetaTag && refreshMetaTag.getAttribute('content')) {
  //     // Extract the URL from the 'content' attribute
  //     let content = refreshMetaTag.getAttribute('content')!;
  //     return content.split('URL=')[1]?.trim();
  //   } else {
  //     console.error("Meta refresh tag or content attribute not found");
  //     return null;
  //   }
  // }

}
