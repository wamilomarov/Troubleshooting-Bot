import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsrViewComponent } from './csr-view.component';

describe('CsrViewComponent', () => {
  let component: CsrViewComponent;
  let fixture: ComponentFixture<CsrViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsrViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsrViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
