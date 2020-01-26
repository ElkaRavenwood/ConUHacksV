import { Component, OnInit, Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseListObservable} from "@angular/fire/";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "./UserModel";
import { CommunicationService } from "../communication.service";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
	items: any[];
	profile: User;
	userId: string;
	constructor(private ps: ProfileService,
				private communication: CommunicationService) {}

	ngAfterViewInit() {
		document.getElementById("logoutButton").addEventListener("click", event => {
			document.getElementById("loginSignup").classList.remove("hidden");
			document.getElementById("loggedIn").classList.add("hidden");
		});
	}

	ngOnInit() {
		this.userId = this.ps.getUserId();
		this.ps.getProfile().subscribe(items => {
			this.items = items;
			console.log(this.userId);
			console.log(this.items);
			console.log(this.items.length);
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].id.localeCompare(this.userId) == 0) {
					console.log("ids match");
					this.profile = {
						firstName: (this.items[i].firstName as string),
						lastName: (this.items[i].lastName as string),
						email:(this.items[i].email as string),
						prefs: (this.items[i].preferences as string),
						password: (this.items[i].password as string),
						avail: (this.items[i].availability as string),
						img: (this.items[i].img as string)
					};
					console.log(this.profile);
					this.communication.preferencesSource.next(this.profile.prefs);
				} else {
					console.log("No match" + this.userId + " " + items[i].id);
				}
			}
			return this.profile;
		});
	}
}

@Injectable({ providedIn: "root" })
export class ProfileService {
	items: FirebaseListObservable<any[]> = null;
	userId: string;
	firstName: string;

	constructor(
		private firestore: AngularFirestore,
		private afAuth: AngularFireAuth
	) {
		this.afAuth.authState.subscribe(user => {
			if (user) {
				this.userId = user.uid;
			}
			console.log(this.userId);
		});
	}

	getUserId(): FirebaseListObservable<any[]> {
		return this.userId;
	}

	getProfile(): FirebaseListObservable<any[]> {
		console.log("users/" + this.userId);
		var users = this.firestore.collection("users").valueChanges();
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
