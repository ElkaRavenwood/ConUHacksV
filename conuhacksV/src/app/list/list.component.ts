import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireList} from "@angular/fire/database";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommunicationService } from "../communication.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  projects: any[];
  preferences: string;
  projPrefs=[];
  splitProjs=[];
  splitPrefs=[];
  sorted: any[];

  constructor(private ls: ListService,
              private communication: CommunicationService) { }

  ngOnInit() {
  	this.ls.getProjects().subscribe((items) => {
  		this.projects=items;
      for (let j = 0; j < items.length; j ++) {
        this.projPrefs.push(items[j].tags);
        this.splitProjs.push(this.projPrefs[j].substring(1,this.projPrefs[j].length).split("#"));
      }
      
    });
    
    this.communication.preferencesSource.subscribe((msg: string) => {
      this.preferences = msg;
      this.splitPrefs = msg.substring(1,this.preferences.length).split("#");
      this.splitPrefs.sort();
    });

    // let nums = any[];
    
    // for (let i = 0; i < this.splitProjs.length; i ++) {
    //   for (let k = 0; k <this.splitProjs[i].length; k++) {
    //     for (let j = 0; j < this.splitPrefs.length; j++) {
    //         if (this.splitProjs[i][k].localeCompare(this.splitPrefs[j]) == 0) {
    //           if(!nums[i]) {
    //             nums[i] = 1;
    //           } else {
    //             nums[i] += 1;
    //           }
              
    //           if(++k > this.splitProjs[i].length) break;
    //         }
    //       }
    //     }
      
      // nums.push(this.projPrefs[i].localeCompare(this.preferences));
    // }

    console.log(nums);
    console.log(this.splitProjs);
    console.log(this.splitPrefs);
  }

}

@Injectable ({providedIn:'root'})
export class ListService {

	items: AngularFireList<any[]> = null;
	

  constructor(private firestore: AngularFirestore) { 
  	
  }

  getProjects (): Observable<any[]> {
  	// console.log(this.firestore.collection('project').valueChanges());
  	return this.firestore.collection('project').valueChanges();
  }
}
