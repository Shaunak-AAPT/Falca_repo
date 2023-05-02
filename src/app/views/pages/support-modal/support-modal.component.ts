import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { ReactiveFormsModule } from '@angular/forms'
import { ApiService } from 'src/app/services/api/api.service';
declare var $: any;
@Component({
  selector: 'app-support-modal',
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.css']
})

export class SupportModalComponent implements OnInit {
  myForm!: FormGroup;
  isSubmitted = false;
  namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{3,15})?(\\s[a-zA-Z]{3,15})?$";
  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  successMessage: boolean = false;
  constructor(public validation: ValidateService, private toastr: ToastrService, private fb: FormBuilder, private api: ApiService,) {


    this.myForm = new FormGroup({
      category: new FormControl("INSURANCE", Validators.required),
      Name: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      Email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      mobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      Comments: new FormControl('', Validators.required)
    });


  }

  showSupportModal() {

    $("#supportModal").modal("show");
    // console.log("showmodel:", this.showModal);
  }

  hideSupportModal() {
    $("#supportModal").modal("hide");
  }

  ngOnInit(): void {
    console.log("support component initialized")
  }

  Submit() {
    this.isSubmitted = true;
    console.log("reached on subit", this.myForm.valid)
    console.log("reached on", this.myForm)
    if (this.myForm.valid) {
      console.log(this.myForm.value);

      let payload = {    //this payload is a json object

        name: this.myForm.value.Name, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
        email: this.myForm.value.Email,
        phone_no: this.myForm.value.mobileNumber,
        category: this.myForm.value.category,
        comments: this.myForm.value.Comments

      }
      if (this.myForm.value.category === 'INVESTMENT') {
        payload.category = 'INVESTMENT';
      }
      this.api.post("support/", payload, false).subscribe(async response => {
        console.log(response);

      });

      this.myForm.reset({ category: 'INSURANCE' });
      // Show success message for 15 seconds
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;

        // Close the modal after 5 seconds
        setTimeout(() => {
          this.hideSupportModal();
        }, 1000);
      }, 1500);
    } else {
      // Mark all form controls as touched to display validation errors
      for (const fieldName in this.myForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.controls, fieldName)) {
          const control = this.myForm.controls[fieldName];
          if (control) {
            control.markAsTouched();
          }
        }
      }

    }
  }
}



