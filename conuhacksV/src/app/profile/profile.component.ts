import { Component, OnInit, Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, FirebaseListObservable } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

// import {ProfileService}  from './ProfileService.ts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit{
	items: UserModel[];
	constructor(private ps: ProfileService) {
	}

	ngOnInit(){
		this.ps.getProfile().subscribe((items) => {
			this.items = items;
			console.log(this.items);
			return this.items;
			
		})
	}
	
}


@Injectable ({providedIn:'root'})
export class ProfileService {

  constructor(private firestore: AngularFirestore) { }

  getProfile (): FirebaseListObservable<any[]> {
  	return this.firestore.collection("/users").valueChanges();
  }
}



// @Injectable()
// export class ProfileComponentService {

// 	items: FirebaseListObservable<Item[]> = null;
// 	userId: string;

//   constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
//   	this.afAuth.authState.subscribe(user => {
//   		if(user) this.userId = user.uid
//   	})}

//  	getItemsList(): FirebaseListObservable<Item[]> {
//  		if (!this.userId) return;
//  		this.items = this.db.list('items/S{this.userId}');
//  		return this.items;
//  	}

// }
