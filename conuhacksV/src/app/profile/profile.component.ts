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
	items: any[];
	profile: any[];
	userId: string;
	constructor(private ps: ProfileService) {
	}

	ngOnInit(){
		this.userId = this.ps.getUserId();
		this.ps.getProfile().subscribe((items) => {
			this.items = items;
			console.log(this.userId);
			console.log(this.items);
			console.log(this.items.length);
			for (let i = 0; i < this.items.length; i ++) {
	  		if (this.items[i].id.localeCompare(this.userId)==0) {
	  			console.log("ids match");
	  			this.profile = {
	  				firstName: this.items[i].firstName,
	  				lastName: this.items[i].lastName,
	  				email: this.items[i].email,
	  				tags: this.items[i].preferences,
	  				password: this.items[i].password,
	  				avail: this.items[i].availability
	  			} 
	  			console.log(this.profile);
	  		} else {
	  				console.log("No match" + this.userId + " " + items[i].id);
	  			}
	  		
	  	}
	  	return this.profile;
			
		})
	}
	
}


@Injectable ({providedIn:'root'})
export class ProfileService {

	items: FirebaseListObservable<any[]> = null;
	userId: string;
	firstName:string;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { 
  	this.afAuth.authState.subscribe(user => {
  		if(user) {
  			this.userId = user.uid;
  		}
  		console.log(this.userId);
 		})
  }

  getUserId (): FirebaseListObservable<any[]> {
  	return this.userId;
  }

  getProfile (): FirebaseListObservable<any[]> {
  	console.log("users/"+this.userId);
  	var users = this.firestore.collection('users').valueChanges();
  	return users;
  	
  	
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
