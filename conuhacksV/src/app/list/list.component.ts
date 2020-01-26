import { Component, OnInit, Injectable } from '@angular/core';
import { FirebaseListObservable } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

	projects: any[];

  constructor(private ls: ListService) { }

  ngOnInit() {
  	this.ls.getProjects().subscribe((items) => {
  		this.projects=items;
  	});
  }

}

@Injectable ({providedIn:'root'})
export class ListService {

	items: FirebaseListObservable<any[]> = null;
	

  constructor(private firestore: AngularFirestore) { 
  	
  }

  getProjects (): FirebaseListObservable<any[]> {
  	console.log(this.firestore.collection('project').valueChanges());
  	return this.firestore.collection('project').valueChanges();
  }
}
