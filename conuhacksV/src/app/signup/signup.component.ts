import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

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
  elder: boolean;
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
  constructor(private formBuilder: FormBuilder,
              private firestore: AngularFirestore,
              private afAuth: AngularFireAuth) {

  }
  
  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
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
      elder: false,
    };
  }
  public register(): void {
    console.log("Register");
    const firstName: string = this.firstFormGroup.get('firstName').value;
    const lastName: string = this.firstFormGroup.get('lastName').value;
    const email: string = this.firstFormGroup.get('email').value;
    const password: string = this.firstFormGroup.get('password').value;

    this.addToDatabase(firstName, lastName, email, password);
  }

  public checkboxChanged(event): void {
    this.preferences[event.source.name] = event.checked;
  }

  public addToDatabase(firstName: string, lastName: string, email: string, password: string) {
    const preferencesID= this.firestore.createId();

    /*this.firestore.collection('preferences').doc((preferencesID as unknown) as string).set(this.preferences);
    this.firestore.collection('users').add({
      firstName: firstName,
      lastName: lastName,
      email: email,
      preferences: preferencesID,
      password: password
    })*/

    this.firestore.collection('users').get().toPromise().then(querySnapchot => {
      querySnapchot.forEach(element => {
        console.log(element.data());
      });
    })

  }
}