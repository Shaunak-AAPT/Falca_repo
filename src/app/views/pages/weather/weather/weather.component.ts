import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
declare let $: any;

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {
  submitted = false;

  // org code
  // namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{1,15})?(\\s[a-zA-Z]{1,15})?$";


  namePattern = "^([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1,})((\\s[a-zA-Z]{2,})+(\\s[a-zA-Z]{2,})?)$"

  agentcodePattern = "^([a-zA-Z0-9]{12,13}\\s*)$";


  disableSpecialCharacters(event: Event) {
    const specialCharacters = ['!', '@', '_', '*', '$', '%', '#', '-', '&', '?', '+'];
    const input = event.target as HTMLInputElement;
    let value = input.value;
    if (specialCharacters.some(char => value.includes(char)) || value.includes(' ')) {
      value = value.replace(/[!@_*\$\%\#\-\&\?+\s]/g, '');
      input.value = value;
      input.dispatchEvent(new Event('input'));
    }
  }
  // Config: ConfigType = Config;

  agentCode: string = '';
  name: any;
  mobile: any;

  referral_id: any;

  showContent: boolean = false;


  // ===============================
  myForm!: UntypedFormGroup;
  isSubmitted = false;

  // org code
  // namePattern = "^([a-zA-Z]{3,15})(\\s[a-zA-Z]{1,15}){1,2}$";

  // namePattern = "^([a-zA-Z]{3,})((\\s[a-zA-Z]+(\\s[a-zA-Z]+)?))?$|^([a-zA-Z]{1,})((\\s[a-zA-Z]{2,})+(\\s[a-zA-Z]{2,})?)$" //merged above conditions

  emailPattern = "^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  successMessage: boolean = false;

  constructor(private fb: UntypedFormBuilder, private route: ActivatedRoute, private router: Router,private toastr: ToastrService,private api: ApiService,) { 

    this.myForm = new UntypedFormGroup({
      // category: new UntypedFormControl("INSURANCE", Validators.required),
      custmor_name: new UntypedFormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
      custmor_email: new UntypedFormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      mobileNumber: new UntypedFormControl('', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]),
      Comments: new UntypedFormControl('', Validators.required)
    });
  }
  referralId: string = '';

  ngOnInit(): void {
    console.log('GoqiiComponent initialized');

    this.route.queryParamMap.subscribe(params => {
      const referralId = params.get('referralid');
      if (referralId) {
        console.log('Referral ID:', referralId);
        this.referralId = referralId;
      }
    });
  }

  capitalizeName(name: string) {
    let nameList = name.split(' ', 3);
    let capitalizedName = nameList.map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
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

  referralForm = this.fb.group({
    custmor_name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    custmor_email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9]{3,}.[a-zA-Z]{2,}$')]],
    mobile: ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
    agentCode: ['', [Validators.pattern(this.agentcodePattern)]],

  });


  formErrors = {
    cust_name: {
      required: 'Enter Customer Name',
      pattern: "Enter valid Customer Name"
    },
    cust_email: {
      required: 'Enter Customer email',
      pattern: "Enter valid Customer email"
    },
    phone_No: {
      required: 'Enter Mobile Number',
      pattern: "Enter valid Mobile Number"
    },
    agent_code: {
      required: 'Enter your Agent Code',
      pattern: "Enter valid Agent Code"
    },
  }

  get f() { return this.referralForm.controls; }

 

  // onSubmit() {
  //   this.submitted = true;
  
  //   if (!this.referralForm.valid) {
  //     return;
  //   }
  
  //   const defaultAgentCode: string = 'FINIZONDC111';
  //   const payload = {
  //     full_name: this.referralForm.value.custmor_name,
  //     email: this.referralForm.value.custmor_email,
  //     mobile_no: this.referralForm.value.mobile,
  //     agent_code: this.referralForm.value.agentCode ? this.referralForm.value.agentCode : defaultAgentCode,
  //     referral_id: this.referralId,
  //   };
  
  //   if (this.referralId.toLowerCase() === 'goqii' || this.referralId === 'Goqii') {
  //     this.api.postService("/spprd/customer", payload).subscribe((response: any) => {
  //       this.handleApiResponse(response);
  //     });
  //   } else {
  //     console.log('Referral ID in the URL is not valid');
  //   }
  // }
  

  // ======================

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

      const submitAsync = async () => {
        try {
          const response = await this.api.post("support/", payload, false).toPromise();
          console.log(response);

          if (response.response.n == 1){
          this.myForm.reset({ category: 'INSURANCE' });
          this.isSubmitted = false;
          $("#supportModal").modal("hide");
          $('#thankYouSupportModal').modal('show');
          }
        } catch (error) {
          console.error(error);
        }
      };

      submitAsync();

    }

  }
  private handleApiResponse(response: any): void {
    if (response.n === 1) {
      this.handleValidResponse();
    } else {
      console.log('Response not equal to 1, window.open will not be executed');
    }
  }
  
  private handleValidResponse(): void {
    const referralId: string = this.referralId;
    const urlKey: string = referralId.toLowerCase();
    let agentCode: string = 'FINIZONDC111';
    let name: string;
    let mail: string;
    let mobileNo: number;
  
    if (this.referralForm.get('agentCode')?.value) {
      agentCode = this.referralForm.get('agentCode')?.value;
    }
    name = this.referralForm.get('custmor_name')?.value;
    mail = this.referralForm.get('custmor_email')?.value;
    mobileNo = this.referralForm.get('mobile')?.value;
  
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
