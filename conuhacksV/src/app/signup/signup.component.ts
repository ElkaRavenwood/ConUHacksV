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
  preferencesString: string;
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
    this.preferencesString = "";
    this.tags="";
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
    if (event.checked) {
      if (this.preferencesString === "") {
        this.preferencesString += this.preferences[event.source.name];
      } else {
        this.preferencesString+= ", " + this.preferences[event.source.name];
      }
      this.tags += "#" + event.source.name;
    } else {
      this.preferencesString = this.preferencesString.replace(this.preferences[event.source.name], "");
      this.tags = this.tags.replace(("#"+event.source.name), "");
    }
  }

  public addToDatabase(firstName: string, lastName: string, email: string, password: string) {
    const preferencesID = this.firestore.createId();
    const userID = this.firestore.createId();

    this.firestore.collection('preferences').doc((preferencesID as unknown) as string).set(this.preferences);

    this.firestore.collection('users').doc((userID as unknown) as string).set({
      firstName: firstName,
      lastName: lastName,
      email: email,
      // preferences: this.preferencesString,
      preferences:this.tags,
      password: password,
      id: userID,
      img: "https://thumbs.dreamstime.com/z/group-people-icon-teamwork-vector-illustration-colorful-110482335.jpg"
    })

    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    

  }
}