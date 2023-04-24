import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { registerRequest } from 'src/app/models/registerRequest.model';
import { ValidateService } from 'src/app/services/validate/validate.service';
declare var $: any;
@Component({
  selector: 'app-support-modal',
  templateUrl: './support-modal.component.html',
  styleUrls: ['./support-modal.component.css']
})

export class SupportModalComponent implements OnInit {
  // myForm: FormGroup;
  FormEmail: any;
  FormPassword: any;
  FormFirstName: any;
  FormLastName: any;
  FormMobileNo: any;
  FormComments:any;
  usertype: any = 'Customer';
  UrlRegister: any = 'auth/customer/register';

  constructor(public validation: ValidateService, private toastr: ToastrService,) { }

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


}
