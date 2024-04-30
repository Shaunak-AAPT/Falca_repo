import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [

  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [TitleCasePipe]

})
export class InputComponent {
  private formatter: Intl.NumberFormat;
  inputvalue = "";
  appearance: any;
  constructor( private titlecasePipe: TitleCasePipe) {
    this.formatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
  }
  @Input() currency: any;
  @Input() inr: any;
  @Input() control: any;
  @Input() label: string | null = null;
  @Input() type = 'text';
  // @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() inputClass = "";
  @Input() inputWrapperClass = "";
  // @Input() errorMessage: IErrors | null = null;
  @Input() min: string | number | null = null;
  @Input() max: string | number | null = null;
  @Input() maxlength: any = '';
  @Input() placeholder = '';
  @Input() tabindex: any;
  @Input() formFieldClass = '';
  @Output() onInput: EventEmitter<any> = new EventEmitter();
  @Output() focusOut: EventEmitter<any> = new EventEmitter();
  @Output() onKeyUp: EventEmitter<any> = new EventEmitter();
  focus: boolean = false;
  ngOnInit(): void {
    this.inputvalue = this.titlecasePipe.transform(this.inputvalue);
  }

  formatPricing(event: any, control: any): void {
    if(control.value && !isNaN(control.value) && this.focus === false) {
      control?.setValue(this.formatter.format(event), { emitEvent: false }) 
    }
  }
  onInputChange(event: any): void {
    this.onInput.emit(event);
  }
  onFocusOut(event: any): void {
    if (event) {
      this.focusOut.emit(event);
    }
  }
  setValue(v:any, control: any) {
    control?.setValue(v, { emitEvent: false })
  }
  onFocus(event:any, control: any):void {
    this.focus = true;
  }
  onBlur(event:any, control: any):void {
    this.focus = false;
    let value = control.value || '';
    !!value && this.setValue(this.formatPrice(value), control);
  }
  formatPrice(v:any) {
    return this.formatter.format(v);
  }

  // commented by shaunak
  // unformatValue(v:any) {
  //   return v.replace(/,/g, '');
  // }
  keyPress(event: any): any {
    if (this.type === 'number' && this.maxlength != '' && event?.target?.value?.length >= Number(this.maxlength)) {
      return false;
    } else {
      return true;
    }
  }

  triggerKeyUp(evt: any) {
    this.onKeyUp.emit(evt);
  }
}
