import { DatePipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { AESCryptoService } from 'src/app/services/cryptomanager/aescrypto.service';
import { ValidateService } from 'src/app/services/validate/validate.service';

import { VideoRecordingService } from 'src/app/services/video-recording/video-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-kyc-pan-verification',
  templateUrl: './kyc-pan-verification.component.html',
  styleUrls: ['./kyc-pan-verification.component.css']
})
export class KycPanVerificationComponent implements OnInit {

  HeadingText: string = "Pan Verification";
  StepsWidth: number = 0;
  step: number = 1;
  AdharVerificationComplete: boolean = false;
  videodiv: boolean = false;
  photo: boolean = false;
  photo1: boolean = true;
  VideoSuccess: boolean = false;
  Capture: boolean = true;
  Esign: boolean = false;
  TransactionSuccess: boolean = false;
  Congrats: boolean = false;
  BankModall: boolean = true
  htmlToAdd: any = "";
  IsCameraOn: boolean = false;
  CapturePhoto: boolean = true;
  UploadedDocumentsResponse: any;
  ScannedDocumentsResponseforPancard: any;
  ScannedDocumentsResponseforAdharFront: any;
  ScannedDocumentsResponseforAdharBack: any;
  ScannedDocumentsResponseforcheque: any;
  ImagetoView: any;
  VideoEvent: any;
  DirectUrlforCaptureImage: any;
  DirectUrlforCaptureVideo: any;
  SubmitPanDetailsResponse: any;
  SubmitAadharDetailsResponse: any;
  SubmitBankDetailsResponse: any;
  SubmitPersonalDetailsResponse: any;
  SubmitCapturedPhotoResponse: any;
  RandomNumber: any;
  TransactionID: any;
  FromPath: any;
  WealthUrl = environment.WealthUrl;
  public webcamImage: WebcamImage = null as any;
  private trigger: Subject<void> = new Subject<void>();

  // recordrtc CAPTURE VIDEO
  @ViewChild('videoElement') videoElement: any;
  video: any;
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  isVideoRecording = false;
  audioRecordedTime: any;
  videoRecordedTime: any;
  audioBlobUrl: any;
  videoBlobUrl: any;
  audioBlob: any;
  videoBlob: any;
  audioName: any;
  videoName: any;
  audioStream: any;
  videoStream?: MediaStream;
  blobUrlToSubmit: any;
  audioConf = { audio: true }
  videoConf = { video: { facingMode: "user", width: 320 }, audio: true }
  // recordrtc CAPTURE VIDEO

  PancardDetails: any = {
    'SelectedPancardImage': '',
    'SelectedPancardBase64': '',
    'FullName': '',
    'FatherName': '',
    'DOB': '',
    'PanNumber': ''
  };
  AadharcardDetails: any = {
    'SelectedFrontAadharcardImage': '',
    'SelectedFrontAadharcardBase64': '',
    'SelectedBackAadharcardImage': '',
    'SelectedBackAadharcardBase64': '',
    'FullName': '',
    'DOB': '',
    'Gender': '',
    'AadharNumber': '',
    'ResidencialAddress': '',
    'city': '',
    'state': '',
    'district': '',
    'pincode': '',
  }
  BankDetails: any = {
    'SelectedCancleChequeImage': '',
    'SelectedCancleChequeBase64': '',
    'AccountNumber': '',
    'IFSCCode': '',
    'AccountHolderName': '',
    'BankName': '',
    'BankAddress': '',
    'MobileNumber': '',
    'BranchName': '',
    'MicrCode': '',
    'DOB': '',
  }
  PersonalDetails: any = {
    'Gender': '',
    'MaritalStatus': '',
    'NameOfFatherSpouse': '',
    'Relation': '',
    'MaidenName': '',
    'MotherName': '',
    'ResidentialStatus': '',
    'CitizenShip': '',
    'EmailId': '',
    'OccupationType': '',
    'MobileNumber': '',
    'CommunicationAddressType': '',
    'PermanentAddressType': '',
    'AnnualIncome': '',
    'PlaceOfBirth': '',
    'PEP': '',
    'relatedtoPEP': '',
    'ResidenceOutsideIndia': '',
    'ResidingCountry': '',
    'RelatedToInvestor': '',
    'ProofOfIdentityFile': '',
    'ProofOfIdentityBase64': '',
    'SelectedSignatureImage': '',
    'SelectedSignatureBase64': '',
    'consent1': '',
    'consent2': '',
  }
  constructor(
    private datepipe: DatePipe,
    public validate: ValidateService,
    private api: ApiService,
    private toastr: ToastrService,
    private route: Router,
    private crypto: AESCryptoService,
    public ref: ChangeDetectorRef,
    public videoRecordingService: VideoRecordingService,
    public sanitizer: DomSanitizer) {

    // recordrtc CAPTURE VIDEO
    this.videoRecordingService.recordingFailed().subscribe(() => {
      this.isVideoRecording = false;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedTime().subscribe((time) => {
      this.videoRecordedTime = time;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getStream().subscribe((stream) => {
      this.videoStream = stream;
      this.ref.detectChanges();
    });

    this.videoRecordingService.getRecordedBlob().subscribe((data) => {
      this.VideoEvent = data;
      this.videoBlob = data.blob;
      this.videoName = data.title;
      this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data.url);
      // console.log("videoBlobUrl", this.videoBlobUrl)
      this.ref.detectChanges();
    });
    // recordrtc CAPTURE VIDEO
  }

  ngOnInit(): void {
    this.DOB();

    if (localStorage.getItem("FromPath") != null) {
      this.FromPath = this.crypto.Decrypt(localStorage.getItem('FromPath'))
      console.log(this.FromPath)
    }

    if (localStorage.getItem("Transaction") != null && this.crypto.Decrypt(localStorage.getItem("Transaction")) == 1) {
      // console.log("step 12", this.crypto.Decrypt(localStorage.getItem("Transaction")))
      this.step = 12;
      localStorage.removeItem('Transaction');
      if (this.crypto.Decrypt(localStorage.getItem('FromPath')) == '/digital-gold-product-details') {
        this.GotoWealth();
      } 
    }

    



    // setTimeout(() => {
    //   this.video = this.videoElement.nativeElement;
    // }, 1000);

    $(".body-color").scroll(function () {
      if ($(".body-color").scrollTop() > 150) {
        $('#sidebar').css('position', 'fixed');
        $('#sidebar').css('top', '5%');
        $('#sidebar').css('width', $("#sidebar-main").width() + 'px');
      }
      else if ($(".body-color").scrollTop() <= 150) {
        $('#sidebar').css('position', '');
        $('#sidebar').css('top', '');
        $('#sidebar').css('width', '');
      }
      if ($('#sidebar').offset().top + $("#sidebar").height() > $("#footer").offset().top - 100) {
        $('#sidebar').css('top', -($("#sidebar").offset().top + $("#sidebar").height() - $("#footer").offset().top + 100));
      }
    });

  }

  scrolltotop() {
    $('.body-color').animate({
      scrollTop: 0
    }, 0);
  }

  DOB() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();
    var date = new Date(year - 18, month, day);
    var monthbefore = (date.getMonth() + 1).toString();
    var daybefore = (date.getDate()).toString();
    var yearbefore = date.getFullYear();
    if (parseInt(monthbefore) < 10) {
      monthbefore = '0' + monthbefore.toString();
    }
    if (parseInt(daybefore) < 10) {
      daybefore = '0' + daybefore.toString();
    }
    var maxDate = yearbefore + '-' + monthbefore + '-' + daybefore;
    $('#Pandob').attr('max', maxDate);
  }

  getDate(date: any) {
    // console.log(date);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let newDate = date.split('/');
    // console.log(newDate);
    let day = newDate[0];
    let monthno = parseInt(newDate[1]) - 1;
    let month = monthNames[monthno];
    let year = newDate[2];
    let fulldate = day + ' ' + month + ' ' + year;
    return this.datepipe.transform(fulldate, 'yyyy-MM-dd');
  }

  getCamelText(text: any) {
    var splitStr = text.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  showvideodiv() {
    setTimeout(() => {
      this.step = 9;
      this.StepsWidth = this.StepsWidth + 10;
    }, 30000)
  }

  BankModal() {
    $("#bank-modal").modal('show');
    setTimeout("$('#bank-modal').modal('hide');", 30000);
    setTimeout(() => {
      this.HeadingText = 'Personal Details';
      this.step = 4;
      this.StepsWidth = this.StepsWidth + 10;
    }, 30001);
  }

  ViewPhoto(Image: any) {
    this.ImagetoView = Image;
    $("#viewphoto-modal").modal('show');
  }

  BackRouting() {
    this.step--;
    this.StepsWidth = this.StepsWidth - 8;
    if (this.step == 10) {
      this.HeadingText = 'Contract';
    }
    else if (this.step == 9) {
      this.HeadingText = 'Video Verification';
    }
    else if (this.step == 8) {
      this.HeadingText = 'video recording';
    }
    else if (this.step == 7) {
      this.HeadingText = 'Photo';
    }
    else if (this.step == 6) {
      this.HeadingText = 'Signature';
    }
    else if (this.step == 5) {
      this.HeadingText = 'Personal Details';
    }
    else if (this.step == 4) {
      this.HeadingText = 'Personal Details';
    }
    else if (this.step == 3) {
      this.HeadingText = 'Bank Verification';
    }
    else if (this.step == 2) {
      this.HeadingText = 'Aadhar Verification';
    }
    else if (this.step == 1) {
      this.HeadingText = 'Pan Verification';
    }
    else if (this.step == 0) {
      this.route.navigate(['/kyc-verification']);
    }
  }

  SubmitPanDetails() {
    if (this.validate.isNullEmptyUndefined(this.PancardDetails.SelectedPancardImage)) {
      this.toastr.error("File is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PancardDetails.FullName)) {
      this.toastr.error("Full Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PancardDetails.FatherName)) {
      this.toastr.error("Father Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PancardDetails.DOB)) {
      this.toastr.error("Date of Birth is mandatory");
    }
    else if (this.validate.getAge(this.PancardDetails.DOB) < 18 || this.validate.getAge(this.PancardDetails.DOB) > 100) {
      this.toastr.error('Please enter valid Date of Birth');
    }
    else if (this.validate.isNullEmptyUndefined(this.PancardDetails.PanNumber)) {
      this.toastr.error("Pancard Number is mandatory");
    }
    else if (!this.validate.validatePancard(this.PancardDetails.PanNumber)) {
      this.toastr.error("Please enter valid Pancard Number");
    }
    else {
      // console.log(this.PancardDetails.DOB)
      let tempdate = this.datepipe.transform(this.PancardDetails.DOB, 'dd-MM-YYYY') || '{}';
      // console.log(tempdate)
      let Data = new FormData();
      Data.append('kyc_type', 'individualPan');
      Data.append('pan_card_no', this.PancardDetails.PanNumber);
      Data.append('pan_card_image', this.PancardDetails.SelectedPancardImage);
      Data.append('full_name', this.PancardDetails.FullName);
      Data.append('father_name', this.PancardDetails.FatherName);
      Data.append('date_of_birth', tempdate);
      this.api.post('signzy/update-scanned-document', Data, true).subscribe(response => {

        if (response.response.n == 1) {
          this.SubmitPanDetailsResponse = response.data;
          // console.log('SubmitPanDetails', this.SubmitPanDetailsResponse);
          this.step = 2;
          this.StepsWidth = this.StepsWidth + 10;
          this.HeadingText = 'Aadhar Verification';
          this.scrolltotop();
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  SubmitAadharDetails() {
    if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.SelectedFrontAadharcardImage)) {
      this.toastr.error("Front side image of aadhar card is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.SelectedBackAadharcardImage)) {
      this.toastr.error("Back side image of aadhar card is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.FullName)) {
      this.toastr.error("Full Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.DOB)) {
      this.toastr.error("Date of Birth is mandatory");
    }
    else if (this.validate.getAge(this.AadharcardDetails.DOB) < 18 || this.validate.getAge(this.AadharcardDetails.DOB) > 100) {
      this.toastr.error('Please enter valid Date of Birth');
    }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.Gender)) {
      this.toastr.error("Gender is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.AadharNumber)) {
      this.toastr.error("Aadhar card number is mandatory");
    }
    // else if (!this.validate.validateAadharNumber(this.AadharcardDetails.AadharNumber)) {
    //   this.toastr.error("Please enter valid Aadhar card number");
    // }
    else if (this.validate.isNullEmptyUndefined(this.AadharcardDetails.ResidencialAddress)) {
      this.toastr.error("Residencial Address is mandatory");
    }
    else {
      let tempdate = this.datepipe.transform(this.AadharcardDetails.DOB, 'dd-MM-YYYY') || '{}';
      let Data = new FormData();
      Data.append('kyc_type', 'aadhaar');
      Data.append('adhar_card_no', this.AadharcardDetails.AadharNumber);
      Data.append('full_name', this.AadharcardDetails.FullName);
      Data.append('date_of_birth', tempdate);
      Data.append('residental_address', this.AadharcardDetails.ResidencialAddress);
      Data.append('adhar_card_front_image', this.AadharcardDetails.SelectedFrontAadharcardImage);
      Data.append('adhar_card_back_image', this.AadharcardDetails.SelectedBackAadharcardImage);
      Data.append('city', this.AadharcardDetails.city);
      Data.append('state', this.getCamelText(this.AadharcardDetails.state));
      Data.append('district', this.AadharcardDetails.district);
      Data.append('pincode', this.AadharcardDetails.pincode);

      this.api.post('signzy/update-scanned-document', Data, true).subscribe(response => {

        if (response.response.n == 1) {
          this.SubmitAadharDetailsResponse = response.data;
          // console.log('SubmitAadharDetailsResponse', this.SubmitAadharDetailsResponse);
          this.step = 3;
          this.StepsWidth = this.StepsWidth + 10;
          this.HeadingText = 'Bank Verification';
          this.scrolltotop();
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  SubmitBankDetails() {
    if (this.validate.isNullEmptyUndefined(this.BankDetails.SelectedCancleChequeImage)) {
      this.toastr.error("Cancle check is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankDetails.AccountNumber)) {
      this.toastr.error("Account Number is mandatory");
    }
    else if (!this.validate.validateAccountNumber(this.BankDetails.AccountNumber)) {
      this.toastr.error("Please enter valid Account Number");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankDetails.IFSCCode)) {
      this.toastr.error("IFSC Code is mandatory");
    }
    else if (!this.validate.validateIFSCCode(this.BankDetails.IFSCCode)) {
      this.toastr.error("Please enter valid IFSC Code");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankDetails.AccountHolderName)) {
      this.toastr.error("Account Holder Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankDetails.BankName)) {
      this.toastr.error("Bank Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.BankDetails.BankAddress)) {
      this.toastr.error("Bank Address is mandatory");
    }
    // else if (this.validate.isNullEmptyUndefined(this.BankDetails.MobileNumber)) {
    //   this.toastr.error("Mobile Number is mandatory");
    // }
    else {

      let Data = new FormData();
      Data.append('cancelled_cheque', this.BankDetails.SelectedCancleChequeImage);
      Data.append('account_number', this.BankDetails.AccountNumber);
      Data.append('IFSC_name', this.BankDetails.IFSCCode);
      Data.append('account_holder_name', this.BankDetails.AccountHolderName);
      Data.append('bank_name', this.BankDetails.BankName);
      Data.append('branch_name', this.BankDetails.BranchName);
      Data.append('bank_address', this.BankDetails.BankAddress);
      Data.append('mobile_number', this.BankDetails.MobileNumber);
      // Data.append('image_url','');
      Data.append('kyc_type', 'bankAccount');
      Data.append('micr_code', this.BankDetails.MicrCode);
      // Data.append('date_of_birth',tempdate);
      this.api.post('signzy/update-scanned-document', Data, true).subscribe(response => {
        if (response.response.n == 1) {
          this.SubmitBankDetailsResponse = response.data;
          // console.log('SubmitBankDetailsResponse', this.SubmitBankDetailsResponse);
          // this.HeadingText = 'Personal Details';
          // this.step = 4;
          // this.StepsWidth = this.StepsWidth + 10;
          this.BankModal();
          this.scrolltotop();
        }
        else {
          this.toastr.error(response.response.Msg);
        }
      })
    }
  }

  SubmitFirstStepPersonalDetails() {
    if (this.validate.isNullEmptyUndefined(this.PersonalDetails.Gender)) {
      this.toastr.error("Gender is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.MaritalStatus)) {
      this.toastr.error("Marital Status is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.NameOfFatherSpouse.trim())) {
      this.toastr.error("Name Of Father/Spouse is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.Relation)) {
      this.toastr.error("Relation with Father/Spouse is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.MaidenName)) {
      this.toastr.error("Maiden Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.MotherName)) {
      this.toastr.error("Mother Name is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.ResidentialStatus)) {
      this.toastr.error("Residential Status is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.CitizenShip)) {
      this.toastr.error("CitizenShip is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.EmailId)) {
      this.toastr.error("EmailId is mandatory");
    }
    else if (!this.validate.validateEmail(this.PersonalDetails.EmailId)) {
      this.toastr.error("Please enter valid EmailId");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.OccupationType)) {
      this.toastr.error("Occupation Type is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.MobileNumber)) {
      this.toastr.error("Mobile Number is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.CommunicationAddressType)) {
      this.toastr.error("Communication Address Type is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.PermanentAddressType)) {
      this.toastr.error("Permanent Address Type is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.AnnualIncome)) {
      this.toastr.error("Annual Income is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.PlaceOfBirth)) {
      this.toastr.error("Place Of Birth is mandatory");
    }
    else {
      this.step = 5;
      this.StepsWidth = this.StepsWidth + 10;
      this.scrolltotop();
    }
  }

  SubmitSecondStepPersonalDetails() {
    if (this.validate.isNullEmptyUndefined(this.PersonalDetails.PEP)) {
      this.toastr.error("Is politically exposed person mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.relatedtoPEP)) {
      this.toastr.error("Is related politically exposed person mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.ResidenceOutsideIndia)) {
      this.toastr.error("Residence Outside India is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.ResidingCountry) && this.PersonalDetails.ResidenceOutsideIndia == 'YES') {
      this.toastr.error("Residing Country is mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.RelatedToInvestor)) {
      this.toastr.error("Person Related To Investor mandatory");
    }
    else if (this.validate.isNullEmptyUndefined(this.PersonalDetails.ProofOfIdentityFile) && this.PersonalDetails.RelatedToInvestor == 'YES') {
      this.toastr.error("Proof Of Identity is mandatory");
    }
    else {
      this.step = 6;
      this.StepsWidth = this.StepsWidth + 10;
      this.scrolltotop();
      this.HeadingText = 'Signature';
    }
  }

  Checked(para: any) {
    if (para == 'consent1') {
      if ($('input[name=consent1]').is(':checked')) {
        this.PersonalDetails.consent1 = 1;
      }
      else {
        this.PersonalDetails.consent1 = 0;
      }
    }
    else if (para == 'consent2') {
      if ($('input[name=consent2]').is(':checked')) {
        this.PersonalDetails.consent2 = 1;
      }
      else {
        this.PersonalDetails.consent2 = 0;
      }
    }
  }

  SubmitPersonalDetails() {
    if (this.validate.isNullEmptyUndefined(this.PersonalDetails.SelectedSignatureImage)) {
      this.toastr.error("Cancle check is mandatory");
    }
    else if (this.PersonalDetails.consent1 != 1) {
      this.toastr.error("Please consent to the terms mentioned");
    }
    else if (this.PersonalDetails.consent2 != 1) {
      this.toastr.error("Please consent to the terms mentioned");
    }
    else {
      let Data = new FormData();
      Data.append('gender', this.PersonalDetails.Gender);
      Data.append('single_or_married', this.PersonalDetails.MaritalStatus);
      Data.append('relation_person_name', this.PersonalDetails.NameOfFatherSpouse);
      Data.append('relationship_with_above', this.PersonalDetails.Relation);
      Data.append('maiden_name', this.PersonalDetails.MaidenName);
      Data.append('mother_name', this.PersonalDetails.MotherName);
      Data.append('pan_card_no', this.PancardDetails.PanNumber);
      Data.append('residential_status', this.PersonalDetails.ResidentialStatus);
      Data.append('indian_citizenship', this.PersonalDetails.CitizenShip);
      Data.append('occupation', this.PersonalDetails.OccupationType);
      Data.append('communication_address_type', this.PersonalDetails.CommunicationAddressType);
      Data.append('permanent_address_type', this.PersonalDetails.PermanentAddressType);
      Data.append('annual_income', this.PersonalDetails.AnnualIncome);
      Data.append('place_of_birth', this.PersonalDetails.PlaceOfBirth);
      Data.append('pep', this.PersonalDetails.PEP);
      Data.append('related_to_pep', this.PersonalDetails.relatedtoPEP);
      Data.append('resident_outside_india', this.PersonalDetails.ResidenceOutsideIndia);
      Data.append('residing_country', this.PersonalDetails.ResidingCountry);
      Data.append('related_to_investor', this.PersonalDetails.RelatedToInvestor);
      Data.append('proof_of_identity', this.PersonalDetails?.ProofOfIdentityFile);
      Data.append('mobile_no', this.PersonalDetails.MobileNumber);
      Data.append('email', this.PersonalDetails.EmailId);
      Data.append('customer_sign', this.PersonalDetails?.SelectedSignatureImage);
      Data.append('kyc_type', '4');
      Data.append('country_code', '101');
      Data.append('citizenshipCountry', 'India');
      Data.append('occupationCode', '04');
      Data.append('kycAccountCode', '01');
      Data.append('kycAccountDescription', 'New');
      Data.append('applicationStatusDescription', 'Resident Indian');
      Data.append('applicationStatusCode', 'R');
      Data.append('communicationAddressCode', '02');
      Data.append('communicationAddressType', 'Residential');
      this.api.post('signzy/update-kyc-documents', Data, true).subscribe(response => {
        if (response.response.n == 1) {
          this.SubmitPersonalDetailsResponse = response.data;
          // console.log('SubmitPersonalDetailsResponse', this.SubmitPersonalDetailsResponse);
          this.step = 7;
          this.StepsWidth = this.StepsWidth + 10;
          this.scrolltotop();
          this.HeadingText = 'Photo';
        }
      })
    }
  }

  SubmitCapturedPhoto() {
    if (this.validate.isNullEmptyUndefined(this.webcamImage.imageAsDataUrl)) {
      this.toastr.error("Please capture your Photo");
    }
    else {
      let Data = new FormData();
      Data.append('kyc_type', 'userPhoto');
      Data.append('photoUrl', this.DirectUrlforCaptureImage);
      this.api.post('signzy/update-scanned-document', Data, true).subscribe(response => {
        this.SubmitCapturedPhotoResponse = response.data;
        // console.log('SubmitCapturedPhotoResponse', this.SubmitCapturedPhotoResponse);
        this.step = 8;
        this.StepsWidth = this.StepsWidth + 10;
        this.scrolltotop();
        setTimeout(() => {
          this.video = this.videoElement.nativeElement;
        }, 1000);
        this.HeadingText = 'Video Recording';
      })
    }
  }

  SubmitCapturedVideo() {

    const data = {
      "merchantId": "",
      "inputData": {
        "service": "video",
        "type": "video",
        "task": "verify",
        "data": {
          "video": this.DirectUrlforCaptureVideo,
          "transactionId": this.TransactionID,
          "matchImage": this.DirectUrlforCaptureVideo,
          "type": "video"
        }
      }
    }
    this.api.post("signzy/upload-scanned-document", data).subscribe(response => {
      // console.log('video upload', response);
      if (response.response.n == 1) {
        this.step = 10;
        this.scrolltotop();
        this.HeadingText = 'Contract';
      }
      else {
        this.toastr.error(response.response.Msg);
      }
    })
  }

  // dataURItoBlob(dataURI: any) {
  //   const byteString = window.atob(dataURI);
  //   const arrayBuffer = new ArrayBuffer(byteString.length);
  //   const int8Array = new Uint8Array(arrayBuffer);
  //   for (let i = 0; i < byteString.length; i++) {
  //     int8Array[i] = byteString.charCodeAt(i);
  //   }
  //   const blob = new Blob([int8Array], { type: 'video/mp4' });
  //   console.log(blob)
  //   return blob;
  // }


  // WEB CAMP CAPTURE IMAGE
  triggerSnapshot(): void {
    // console.log(this.trigger);
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    // console.log('image', this.webcamImage)
    this.UploadDocument('webcamImage', '', this.webcamImage);
    // this.CapturePhoto = false;
  }
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  // WEB CAMP CAPTURE IMAGE

  // recordrtc CAPTURE VIDEO
  startVideoRecording() {

    if (!this.isVideoRecording) {
      this.video.controls = false;
      this.isVideoRecording = true;
      this.videoRecordingService.startRecording(this.videoConf)
        .then(stream => {
          // this.video.src = window.URL.createObjectURL(stream);
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(function (err) {
          // console.log(err.name + ": " + err.message);
        });
    }

    setTimeout(() => {
      this.step = 9;
      this.StepsWidth = this.StepsWidth + 10;
      this.stopVideoRecording();
    }, 10000)

  }

  abortVideoRecording() {
    if (this.isVideoRecording) {
      this.isVideoRecording = false;
      this.videoRecordingService.abortRecording();
      this.video.controls = false;
    }
  }

  stopVideoRecording() {
    if (this.isVideoRecording) {
      this.videoRecordingService.stopRecording();
      this.video.srcObject = this.videoBlobUrl;
      this.isVideoRecording = false;
      this.video.controls = true;
    }
    // this.downloadVideoRecordedData();
  }

  clearVideoRecordedData() {
    this.videoBlobUrl = null;
    this.video.srcObject = null;
    this.video.controls = false;
    this.ref.detectChanges();
  }

  downloadVideoRecordedData() {
    this._downloadFile(this.videoBlob, 'video/mp4', this.videoName);
  }

  _downloadFile(data: any, type: string, filename: string): any {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    //this.video.srcObject = stream;
    //const url = data;
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }


  GetRandomNumberandStartRecording() {
    const data = {
      "merchantId": "0",
      "inputData": {
        "service": "video",
        "type": "video",
        "task": "start",
        "data": {}
      }
    }
    this.api.post("signzy/upload-scanned-document", data, true).subscribe(response => {
      if (response.response.n == 1) {
        // console.log('random number and tx id', response);
        //transaction id 
        this.TransactionID = response.data.object[0].transactionId;
        var num = response.data.object[0].randNumber;
        var digits = num.toString().split('');
        this.RandomNumber = digits.map(Number)
        // console.log(this.RandomNumber);
        // console.log(this.TransactionID);
        this.startVideoRecording();
      }
    })
  }

  RetakeVideo() {
    setTimeout(() => {
      this.video = this.videoElement.nativeElement;
    }, 1000);
    this.step = 8;
    this.videoBlobUrl = null;
  }

  SubmitVideo() {
    // console.log('video event', this.VideoEvent);
    this.UploadDocument('Video', '', this.VideoEvent)
  }
  // recordrtc CAPTURE VIDEO

  TransactionSuccessURL: any;
  Token: any;
  CommonUrl: any;

  CreateAadharESign() {
    var txn = 1;

    this.Token = localStorage.getItem("CustToken");
    this.CommonUrl = environment.CommonUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.CommonUrl = this.CommonUrl.replace("{PATH}", encodeURIComponent('/kyc-pan-verification'));
    this.CommonUrl = this.CommonUrl.replace("{TXN}", encodeURIComponent(txn));
    // console.log(this.CommonUrl)

    let Data = new FormData();
    Data.append('encoderedirectURL', this.CommonUrl);

    this.api.post("signzy/create-aadhar-esign", Data, true).subscribe(response => {
      // console.log('Create Aadhar ESign', response);
      if (response.response.n == 1) {
        console.log(response.data.object.result.url)
        // window.location.href = response.data.object.result.url, "_blank";


        window.open(response.data.object.result.url);
      }

    })

  }






  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }




  readFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (res: any) => {
        resolve(res.target.result);
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file.target.files[0]);
    });
  }

  async uploadFile($event: any, filefor: any) {
    const contents = await this.readFile($event);

    if (filefor != 'ProofOfIdentity' && filefor != 'Signature') {
      this.UploadDocument(filefor, contents, $event.target.files[0]);
    }

    if (filefor == 'ProofOfIdentity') {
      this.PersonalDetails.ProofOfIdentityBase64 = contents;
      this.PersonalDetails.ProofOfIdentityFile = $event.target.files[0];
    }

    if (filefor == 'Signature') {
      this.PersonalDetails.SelectedSignatureBase64 = contents;
      this.PersonalDetails.SelectedSignatureImage = $event.target.files[0];
    }
  }

  UploadDocument(filefor: any, base64: any, event: any) {
    // debugger
    // console.log('event', event);
    let Data = new FormData();
    if (filefor == 'webcamImage') {
      var webcamimage = this.dataURLtoFile(this.webcamImage.imageAsDataUrl, 'test.png');
      Data.append('file', webcamimage);
    }
    else if (filefor == 'Video') {
      // var formattedFile = '';   
      var blobToUpload = new Blob([event.blob], { type: "video/mp4" });
      this.videoName = 'test.mp4';
      var fileToUpload = new File([blobToUpload], "video/mp4", {
        type: this.videoBlob.type
      });
      Data.append('file', fileToUpload);
    }
    else {
      Data.append('file', event);
    }
    Data.append('ttl', '30 mins');
    var abcdhbgds = Data.get('file');
    // console.log('abcdhbgds', abcdhbgds);
    this.api.post('signzy/upload-documents', Data, true).subscribe(response => {
      // debugger
      // console.log('response', response);
      if (response.response.n == 1) {
        // this.toastr.success(response.response.Msg.message)

        this.UploadedDocumentsResponse = response.data;
        // console.log('UploadedDocumentsResponse', this.UploadedDocumentsResponse);
        if (filefor != 'ProofOfIdentity' && filefor != 'Signature' && filefor != 'webcamImage' && filefor != 'Video') {
          this.UploadScannedDocuments(filefor, base64, event);
        }
        if (filefor == 'webcamImage') {
          this.CapturePhoto = false;
          this.DirectUrlforCaptureImage = this.UploadedDocumentsResponse.file.directURL;
        }

        if (filefor == 'Video') {
          this.DirectUrlforCaptureVideo = this.UploadedDocumentsResponse.file.directURL;
          this.SubmitCapturedVideo();
        }
      }
      else {
        this.toastr.error(response.response.Msg.message)
      }
    })
  }

  UploadScannedDocuments(filefor: any, base64: any, event: any) {
    var service, type, proofType;

    if (filefor == 'pancard') {
      service = 'identity',
        type = 'individualPan',
        proofType = 'identity'
    }
    if (filefor == 'AadharFront') {
      service = 'identity',
        type = 'aadhaar',
        proofType = 'identity'
    }
    if (filefor == 'AadharBack') {
      service = 'identity',
        type = 'aadhaar',
        proofType = 'identity'
    }
    if (filefor == 'CancleCheque') {
      service = 'identity',
        type = 'cheque',
        proofType = 'cheque'
    }
    const data = {
      "merchantId": "0",
      "inputData":
      {
        "service": service,
        "type": type,
        "task": "autoRecognition",
        "data":
        {
          "images": [this.UploadedDocumentsResponse.file.directURL],
          "toVerifyData": {},
          "searchParam": {},
          "proofType": proofType,
        }
      }
    }
    this.api.post("signzy/upload-scanned-document", data).subscribe(response => {
      // console.log('upload-scanned-document', response.data.object.result.gender)
      if (response.response.n == 1) {
        if (filefor == 'pancard') {
          this.ScannedDocumentsResponseforPancard = response.data;
          this.PancardDetails.SelectedPancardBase64 = base64;
          this.PancardDetails.SelectedPancardImage = event;
          this.PancardDetails.FullName = response.data.object.result.name;
          this.PancardDetails.FatherName = response.data.object.result.fatherName;
          this.PancardDetails.DOB = this.getDate(response.data.object.result.dob);
          this.PancardDetails.PanNumber = response.data.object.result.number;
        }
        if (filefor == 'AadharFront') {
          this.ScannedDocumentsResponseforAdharFront = response.data;
          this.AadharcardDetails.SelectedFrontAadharcardBase64 = base64;
          this.AadharcardDetails.SelectedFrontAadharcardImage = event;
          this.AadharcardDetails.FullName = response.data.object.result.name;
          this.AadharcardDetails.DOB = this.getDate(response.data.object.result.dob);
          this.AadharcardDetails.Gender = response.data.object.result.gender.toUpperCase();
          this.AadharcardDetails.AadharNumber = response.data.object.result.uid;
        }
        if (filefor == 'AadharBack') {
          this.ScannedDocumentsResponseforAdharBack = response.data;
          this.AadharcardDetails.SelectedBackAadharcardBase64 = base64;
          this.AadharcardDetails.SelectedBackAadharcardImage = event;
          this.AadharcardDetails.ResidencialAddress = response.data.object.result.address;
          this.AadharcardDetails.city = response.data.object.result.splitAddress.city[0];
          this.AadharcardDetails.state = response.data.object.result.splitAddress.state[0][0];
          this.AadharcardDetails.district = response.data.object.result.splitAddress.district[0];
          this.AadharcardDetails.pincode = response.data.object.result.pincode;
        }
        if (filefor == 'CancleCheque') {
          this.ScannedDocumentsResponseforcheque = response.data;
          this.BankDetails.SelectedCancleChequeBase64 = base64;
          this.BankDetails.SelectedCancleChequeImage = event;
          this.BankDetails.AccountNumber = response.data.object.result.accountNumber;
          this.BankDetails.IFSCCode = response.data.object.result.ifsc;
          this.BankDetails.AccountHolderName = response.data.object.result.name;
          this.BankDetails.BankName = response.data.object.result.bankName;
          this.BankDetails.BankAddress = response.data.object.result.address;
          this.BankDetails.MobileNumber = response.data.object.result.contact;
          this.BankDetails.BranchName = response.data.object.result.branch;
          this.BankDetails.MicrCode = response.data.object.result.micrCode;
        }
      }
    })
  }

  DeleteFile(filefor: any) {
    if (filefor == 'pancard') {
      this.PancardDetails.SelectedPancardBase64 = '';
      this.PancardDetails.SelectedPancardImage = '';
    }
    if (filefor == 'AadharFront') {
      this.AadharcardDetails.SelectedFrontAadharcardBase64 = '';
      this.AadharcardDetails.SelectedFrontAadharcardImage = '';
    }
    if (filefor == 'AadharBack') {
      this.AadharcardDetails.SelectedBackAadharcardBase64 = '';
      this.AadharcardDetails.SelectedBackAadharcardImage = '';
    }
    if (filefor == 'CancleCheque') {
      this.BankDetails.SelectedCancleChequeBase64 = '';
      this.BankDetails.SelectedCancleChequeImage = '';
    }
    if (filefor == 'ProofOfIdentity') {
      this.PersonalDetails.ProofOfIdentityBase64 = '';
      this.PersonalDetails.ProofOfIdentityFile = '';
    }
    if (filefor == 'Signature') {
      this.PersonalDetails.SelectedSignatureBase64 = '';
      this.PersonalDetails.SelectedSignatureImage = '';
    }
  }

  GotoWealth() {
    this.Token = localStorage.getItem("CustToken");
    this.WealthUrl = environment.WealthUrl.replace("{TOKEN}", encodeURIComponent(this.Token));
    this.WealthUrl = this.WealthUrl.replace("{PATH}", encodeURIComponent(this.FromPath));
    if (this.FromPath == '/digital-gold-product-details') {
      this.WealthUrl = this.WealthUrl.replace("{DG}", "true")
    }
    debugger
    window.location.href = this.WealthUrl;
  }

  SubmitNow() {
    if (!this.validate.isNullEmptyUndefined(this.FromPath)) {
      this.GotoWealth();
    }
    else{
      this.step = 12;
    }
  }





}





