import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare let $: any;

@Component({
  selector: 'app-lead-modal',
  templateUrl: './lead-modal.component.html',
  styleUrls: ['./lead-modal.component.css']
})
export class LeadModalComponent implements OnInit {

  myForm!: UntypedFormGroup;
  isSubmitted = false;

  namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{1,15}){1,2}$";
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  successMessage: boolean = false;


  constructor(public validation: ValidateService, private toastr: ToastrService, private fb: UntypedFormBuilder, private api: ApiService,) {


    this.myForm = new UntypedFormGroup({
      Name: new UntypedFormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      Email: new UntypedFormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      mobileNumber: new UntypedFormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      Comments: new UntypedFormControl('', Validators.required)
    });


  }
  disableSpecialCharacters(event: Event) {
    const specialCharacters = ['!', '@', '_', '*', '$', '%', '#', '-', '&', '?', '+'];
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (specialCharacters.some(char => value.includes(char)) || value.includes(' ')) {

      value = value.replace(/[!@_*$%#\-\&?+\s]/g, '');

      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
    if (value.length > 13) {
      input.value = value.slice(0, 13);
      input.dispatchEvent(new Event('input'));
    }
  }
  showleadModal() {

    $("#leadModal").modal("show");
  }

  hideleadModal() {
    $("#leadModal").modal("hide");
  }

  hideThankYouModal() {
    $("#thankYouModal").modal("hide");

  }

  ngOnInit(): void {
    console.log("leadsupport component initialized")
  }

  Submit() {
    this.isSubmitted = true;
    console.log("reached on subit", this.myForm.valid)
    console.log("reached on", this.myForm)
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      let payload = {
        name: this.myForm.value.Name, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
        email: this.myForm.value.Email,
        phone_no: this.myForm.value.mobileNumber,
        comments: this.myForm.value.Comments,
        category: "Insurance"
      }
      const submitAsync = async () => {
        try {
          const response = await this.api.post("support/", payload, false).toPromise();
          console.log(response);

          this.myForm.reset();
          this.isSubmitted = false;
          $("#leadModal").modal("hide");
          $('#thankYouModal').modal('show');
        } catch (error) {
          console.error(error);
        }
      };

      submitAsync();

    }

  }
}

