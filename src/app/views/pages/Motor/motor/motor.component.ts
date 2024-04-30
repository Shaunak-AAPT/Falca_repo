// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { InputComponent } from "../../input/components/input/input.component";
// import { ToastrService } from 'ngx-toastr';
// import { ApiService } from 'src/app/services/api/api.service';


// =========
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { ValidateService } from 'src/app/services/validate/validate.service';
import { InputComponent } from '../../input/components/input/input.component';
declare let $: any;

@Component({
    selector: 'app-motor',
    standalone: true,
    templateUrl: './motor.component.html',
    styleUrl: './motor.component.css',
    imports: [InputComponent, ReactiveFormsModule,CommonModule]
})
// export class MotorComponent {
//   submitted = false;

//   // org code
//   // namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{1,15})?(\\s[a-zA-Z]{1,15})?$";


//   // namePattern = "^([a-zA-Z']{3,})((\s[a-zA-Z']+(\s[a-zA-Z']+)?))?$|^([a-zA-Z']{1,})((\s[a-zA-Z']{2,})+(\s[a-zA-Z']{2,})?)$"

//   // agentcodePattern = "^([a-zA-Z0-9]{12,13}\\s*)$";


//   disableSpecialCharacters(event: Event) {
//     const specialCharacters = ['!', '@', '_', '*', '$', '%', '#', '-', '&', '?', '+'];
//     const input = event.target as HTMLInputElement;
//     let value = input.value;
//     if (specialCharacters.some(char => value.includes(char)) || value.includes(' ')) {
//       value = value.replace(/[!@_*\$\%\#\-\&\?+\s]/g, '');
//       input.value = value;
//       input.dispatchEvent(new Event('input'));
//     }
//   }
//   // Config: ConfigType = Config;

//   // agentCode: string = '';
//   name: any;
//   mobile: any;

//   // referral_id: any;
//   showContent: boolean = false;


//   // ===============================
//   myForm!: FormGroup;
//   isSubmitted = false;

//   // org code
//   // namePattern = "^([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1,})((\\s[a-zA-Z]{2,})+(\\s[a-zA-Z]{2,})?)$"
  
//   // 1st
//   namePattern = "^([a-zA-Z]{1}\\.)?\\s?([a-zA-Z]{1}\\.)?\\s?([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1,})((\\s[a-zA-Z]{2,})+(\\s[a-zA-Z]{2,})?)$"

//   // 2nd
//   // namePattern = "^([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1}\\.[a-zA-Z]\\.([a-zA-Z]{3,})$)|^([a-zA-Z]{1,})((\\s[a-zA-Z]{1,})+(\\s[a-zA-Z]{2,})?)$"

//   emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
//   successMessage: boolean = false;

//   constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private api: ApiService,) { 

//     this.myForm = this.fb.group({
//       // category: new UntypedFormControl("INSURANCE", Validators.required),
//       customer_name :['', [Validators.required, Validators.pattern(this.namePattern)]],
//       customer_email:  ['', [Validators.required, Validators.pattern(this.emailPattern)]],
//       customer_mobile_no:  ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
//       falca_branch_id: ['',Validators.required],
//       falca_unique_ref_no:  ['', Validators.required]

//     });
//   }
//   referralId: string = '';

//   ngOnInit(): void {
//     console.log('FalcaComponent initialized');

//     // this.route.queryParamMap.subscribe(params => {
//     //   const referralId = params.get('referralid');
//     //   if (referralId) {
//     //     console.log('Referral ID:', referralId);
//     //     this.referralId = referralId;
//     //   }
//     // });
//   }

//   // capitalizeName(name: string) {
//   //   let nameList = name.split(' ',3);
//   //   let capitalizedName = nameList.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
//   //   return capitalizedName;
//   // }

//   capitalizeName(name: string) {
//     let nameList = name.split(' ', 3);
//     let capitalizedName = nameList.map(n => {
//         if (n.includes('.')) {
//             let parts = n.split('.');
//             return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('.');
//         } else {
//             return n.charAt(0).toUpperCase() + n.slice(1);
//         }
//     }).join(' ');
//     return capitalizedName;
// }


//   onKeyup(event: any) {
//     let name = event.target.value;
//     console.log("name", name)
//     if (name.match(this.namePattern)) {
//       console.log("event.target.value", event.target.value)
//       event.target.value = this.capitalizeName(name);
//     }
//   }

//   referralForm = this.fb.group({
//     custmor_name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
//     custmor_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]{3,}.[a-zA-Z]{2,}$')]],
//     mobile: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
//     // agentCode: ['', [Validators.pattern(this.agentcodePattern)]],
//     // Falca_Branch_Id: new UntypedFormControl('', Validators.required),
//     // Falca_Ref_no: new UntypedFormControl('', Validators.required)
//   });


//   formErrors = {
//     cust_name: {
//       required: 'Enter Customer Name',
//       pattern: "Enter valid Customer Name"
//     },
//     cust_email: {
//       required: 'Enter Customer email',
//       pattern: "Enter valid Customer email"
//     },
//     phone_No: {
//       required: 'Enter Mobile Number',
//       pattern: "Enter valid Mobile Number"
//     },
//     Falca_branch_Id: {
//       required: 'Enter your Falca Branch ID',
//       pattern: "Enter valid Falca Branch ID"
//     },
//     Falca_ref_No:{
//       required: 'Enter Unique Falca Reference No',
//       pattern: "Enter valid Unique Falca Reference No"
//     },
//     // agent_code: {
//     //   required: 'Enter your Agent Code',
//     //   pattern: "Enter valid Agent Code"
//     // },
//   }

//   get f() { return this.referralForm.controls; }

 

//   // onSubmit() {
//   //   this.submitted = true;
  
//   //   if (!this.referralForm.valid) {
//   //     return;
//   //   }
  
//   //   const defaultAgentCode: string = 'FINIZONDC111';
//   //   const payload = {
//   //     full_name: this.referralForm.value.custmor_name,
//   //     email: this.referralForm.value.custmor_email,
//   //     mobile_no: this.referralForm.value.mobile,
//   //     agent_code: this.referralForm.value.agentCode ? this.referralForm.value.agentCode : defaultAgentCode,
//   //     referral_id: this.referralId,
//   //   };
  
//   //   if (this.referralId.toLowerCase() === 'goqii' || this.referralId === 'Goqii') {
//   //     this.api.postService("/spprd/customer", payload).subscribe((response: any) => {
//   //       this.handleApiResponse(response);
//   //     });
//   //   } else {
//   //     console.log('Referral ID in the URL is not valid');
//   //   }
//   // }
  

//   // ======================

//   Submit() {
//     this.isSubmitted = true;
//     console.log("reached on submit", this.myForm.valid)
//     console.log("reached on", this.myForm)
//     // this.router.navigateByUrl('placeholder');

//     if (this.myForm.valid) {
//       this.isSubmitted = true;

//       console.log(this.myForm.value);

//       let payload = {    //this payload is a json object

//         customer_name: this.myForm.value.customer_name, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
//         customer_email: this.myForm.value.customer_email,
//         customer_mobile_no: this.myForm.value.customer_mobile_no,
//         falca_branch_id: this.myForm.value.falca_branch_id,
//         falca_unique_ref_no: this.myForm.value.falca_unique_ref_no,


//         // category: this.myForm.value.category,
//         // comments: this.myForm.value.Comments

//       }
//       // if (this.myForm.value.category === 'INVESTMENT') {
//       //   payload.category = 'INVESTMENT';
//       // }

//       const submitAsync = async () => {
//         try {
//           const response = await this.api.postencode("spprd/falca/track", payload, false).toPromise();
//           console.log(response);

//           // if (response.response.n == 1){
//           // this.myForm.reset({ category: 'INSURANCE' });
//           this.isSubmitted = false;
//           // $("#supportModal").modal("hide");
//           $('#thankYouSupportModal').modal('show');
//           // }
//         } catch (error) {
//           console.error(error);
//         }
//       };

//       submitAsync();

//     }

//   }
//   private handleApiResponse(response: any): void {
//     // if (response.n === 1) {
//       this.handleValidResponse();
//     // } else {
//     //   console.log('Response not equal to 1, window.open will not be executed');
//     // }
//   }
  
//   private handleValidResponse(): void {
//     // const referralId: string = this.referralId;
//     // const urlKey: string = referralId.toLowerCase();
//     // let agentCode: string = 'FINIZONDC111';
//     let name: string;
//     let mail: string;
//     let mobileNo: number;
//     let branchId:string;
//     let refNo:string;
//     // if (this.referralForm.get('agentCode')?.value) {
//     //   agentCode = this.referralForm.get('agentCode')?.value;
//     // }
//     // name = this.referralForm.get('custmor_name')?.value;
//     // mail = this.referralForm.get('custmor_email')?.value;
//     // mobileNo = this.referralForm.get('mobile')?.value;
//     // branchId = this.referralForm.get('mobile')?.value;
//     // refNo = this.referralForm.get('mobile')?.value;


//     name = this.myForm.get('customer_name')?.value;
//     mail = this.myForm.get('customer_email')?.value;
//     mobileNo = this.myForm.get('customer_mobile_no')?.value;
//     branchId = this.myForm.get('falca_branch_id')?.value;
//     refNo = this.myForm.get('falca_unique_ref_no')?.value;
//     // if (urlKey in this.Config) {
//     //   console.log(name.replace(/ /g, '%20'))
//     //   window.open(
//     //     this.Config[urlKey] + '?CName=' + name + '&cmail=' + mail + '&CMob=' + mobileNo + '&AgentCode=' + agentCode,
//     //     '_blank'
//     //   );
//     // } else {
//     //   console.log('Invalid referral ID:', referralId);
//     // }
//   }
  

// }


// ------------------------------------------------------------------


export class MotorComponent {

  myForm!: UntypedFormGroup;
  isSubmitted = false;

 
      //  namePattern = "^([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1,})((\\s[a-zA-Z]{2,})+(\\s[a-zA-Z]{2,})?)$" //merged above conditions
  
      namePattern = "^([a-zA-Z']{1}\\.)?\\s?([a-zA-Z']{1}\\.)?\\s?([a-zA-Z']{3,})((\\s[a-zA-Z']+(\\s[a-zA-Z']+)?))?$|^([a-zA-Z']{1,})((\\s[a-zA-Z']{2,})+(\\s[a-zA-Z']{2,})?)$"


        // namePattern = "^(?:[a-zA-Z]{2}(\\s[a-zA-Z]+)?$|[a-zA-Z]{3,15}(\\s[a-zA-Z]+)?$)";

  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  successMessage: boolean = false;


  constructor(public validation: ValidateService, private toastr: ToastrService, private fb: UntypedFormBuilder, private api: ApiService,) {


    this.myForm = new UntypedFormGroup({
      // org code
      customer_name: new UntypedFormControl('', [Validators.required, Validators.pattern(this.namePattern)]),

      // Name: new UntypedFormControl('', [Validators.required, Validators.pattern(this.namePattern1 && this.namePattern2 && this.namePattern3)]),
      customer_email: new UntypedFormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      customer_mobile_no: new UntypedFormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      falca_branch_id: new UntypedFormControl('', Validators.required),
      falca_unique_ref_no: new UntypedFormControl('', Validators.required)

    });


  }

  // validateName() {
  //   const nameControl = this.myForm.get('Name')!;
  //   const inputValue = nameControl.value;

  //   if (this.namePattern1.test(inputValue)) {
  //     // Handle logic for pattern 1
  //     console.log('Pattern 1 matched');
  //   } else if (this.namePattern2.test(inputValue)) {
  //     // Handle logic for pattern 2
  //     console.log('Pattern 2 matched');
  //   } else if (this.namePattern3.test(inputValue)) {
  //     // Handle logic for pattern 3
  //     console.log('Pattern 3 matched');
  //   } else {
  //     // Handle invalid input
  //     console.log('Invalid input');
  //   }
  // }


  capitalizeName(name: string) {
    let nameList = name.split(' ', 3);
    let capitalizedName = nameList.map(n => {
        if (n.includes('.')) {
            let parts = n.split('.');
            return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('.');
        } else {
            return n.charAt(0).toUpperCase() + n.slice(1);
        }
    }).join(' ');
    return capitalizedName;
}

  onKeyup(event: any) {
    let name = event.target.value;
    console.log("name", name)
    if (name.match(this.namePattern)) {
      console.log("event.target.value", event.target.value)
      event.target.value = this.capitalizeName(name);
    }
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
        customer_name: this.myForm.value.customer_name, // leftside firstname is exactly same as that of backend API and rightside firstname i.e., ,firstName should be exact same as that of formcontrolname in .html file or same as written above in ngonit 
        customer_email: this.myForm.value.customer_email,
        customer_mobile_no: this.myForm.value.customer_mobile_no,
        falca_branch_id: this.myForm.value.falca_branch_id,
        falca_unique_ref_no: this.myForm.value.falca_unique_ref_no,
      }
      const submitAsync = async () => {
        try {
          const response = await this.api.postencode("spprd/falca/track", payload, false).toPromise();
          console.log(response);

          // if (response.response.n == 1){
          // this.myForm.reset({ category: 'INSURANCE' });
          this.isSubmitted = false;
          // $("#supportModal").modal("hide");
          $('#thankYouSupportModal').modal('show');
          // }
        } catch (error) {
          console.error(error);
        }
      };

      submitAsync();

    }

  }
  private handleApiResponse(response: any): void {
    // if (response.n === 1) {
      this.handleValidResponse();
    // } else {
    //   console.log('Response not equal to 1, window.open will not be executed');
    // }
  }
  
  private handleValidResponse(): void {
    // const referralId: string = this.referralId;
    // const urlKey: string = referralId.toLowerCase();
    // let agentCode: string = 'FINIZONDC111';
    let name: string;
    let mail: string;
    let mobileNo: number;
    let branchId:string;
    let refNo:string;
    // if (this.referralForm.get('agentCode')?.value) {
    //   agentCode = this.referralForm.get('agentCode')?.value;
    // }
    // name = this.referralForm.get('custmor_name')?.value;
    // mail = this.referralForm.get('custmor_email')?.value;
    // mobileNo = this.referralForm.get('mobile')?.value;
    // branchId = this.referralForm.get('mobile')?.value;
    // refNo = this.referralForm.get('mobile')?.value;


    name = this.myForm.get('customer_name')?.value;
    mail = this.myForm.get('customer_email')?.value;
    mobileNo = this.myForm.get('customer_mobile_no')?.value;
    branchId = this.myForm.get('falca_branch_id')?.value;
    refNo = this.myForm.get('falca_unique_ref_no')?.value;
    // if (urlKey in this.Config) {
    //   console.log(name.replace(/ /g, '%20'))
    //   window.open(
    //     this.Config[urlKey] + '?CName=' + name + '&cmail=' + mail + '&CMob=' + mobileNo + '&AgentCode=' + agentCode,
    //     '_blank'
    //   );
    // } else {
    //   console.log('Invalid referral ID:', referralId);
    // }
  }
}