import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.css']
})
export class TermsOfUseComponent implements OnInit {


  constructor(  private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef) { }

  ngOnInit() {
  
    const sectionId = this.route.snapshot.fragment;

    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView();
      }
    }
    
  }


}

