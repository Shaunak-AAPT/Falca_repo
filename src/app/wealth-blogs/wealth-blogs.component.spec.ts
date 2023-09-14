import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthBlogsComponent } from './wealth-blogs.component';

describe('WealthBlogsComponent', () => {
  let component: WealthBlogsComponent;
  let fixture: ComponentFixture<WealthBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WealthBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
