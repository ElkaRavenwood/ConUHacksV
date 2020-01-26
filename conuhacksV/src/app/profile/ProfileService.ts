import { Component,Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable( {providedIn:'root'})
export class ProfileService {

  constructor(private firestore: AngularFirestore) { }

  getProfile (){
  	return this.firestore.collection("users").snapshotChanges();
  }
}

