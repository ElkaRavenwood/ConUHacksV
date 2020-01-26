import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
export interface Day {
  value: string;
  viewValue: string;
}
export interface Preferences {
  animals: boolean;
  environment: boolean;
  kids: boolean;
  sports: boolean;
  food: boolean;
  disabled: boolean;
  medical: boolean;
  technology: boolean;
  education: boolean;
  event: boolean;
  arts: boolean;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstFormGroup: FormGroup;
  preferences: Preferences;
  users: Object[];
  days: Day[] = [
    { value: 'Monday', viewValue: 'Monday' },
    { value: 'Tuesday', viewValue: 'Tuesday' },
    { value: 'Wenesday', viewValue: 'Wenesday' },
    { value: 'Thursday', viewValue: 'Thursday' },
    { value: 'Friday', viewValue: 'Friday' },
    { value: 'Saturday', viewValue: 'Saturday' },
    { value: 'Sunday', viewValue: 'Sunday' }
  ];
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.preferences = {
      animals: false,
      environment: false,
      kids: false,
      sports: false,
      food: false,
      disabled: false,
      medical: false,
      technology: false,
      education: false,
      event: false,
      arts: false,
    };
  }
  public register(): void {
    const firstName: string = this.firstFormGroup.get('firstName').value;
    const lastName: string = this.firstFormGroup.get('lastName').value;
    const email: string = this.firstFormGroup.get('email').value;
  }
  public checkboxChanged(event): void {
    this.preferences[event.source.name] = event.checked;
    console.log(this.preferences);
  }
}