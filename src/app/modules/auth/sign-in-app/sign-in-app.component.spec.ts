import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInAppComponent } from './sign-in-app.component';

describe('SignInAppComponent', () => {
  let component: SignInAppComponent;
  let fixture: ComponentFixture<SignInAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
