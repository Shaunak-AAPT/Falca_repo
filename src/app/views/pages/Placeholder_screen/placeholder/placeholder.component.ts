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

  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,private api: ApiService,) { 
  }
  isSubmitted = false;

  Submit() 
  {
    let payload = {    //this payload is a json object

    customer_name: 'Tenzing Dhugkar',
    customer_mobile_no: '7018485591',
    customer_email: 'tenzing.lingkar@finizon.com', 
    customer_policy_no: 'XXXXX1234',
    finizon_agent_code: 'FINICODE123', 
    falca_unique_id:'FALCA123' ,
    client: 'falca'


    }
    
    const submitAsync = async () => {
      try {
        const response = await this.api.post("support/", payload, false).toPromise();
        console.log(response);

        if (response.response.n == 1){
        this.isSubmitted = false;
      
        }
      } catch (error) {
        console.error(error);
      }
    };

    submitAsync();
  }
}
