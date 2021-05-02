import { Injectable, Inject } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  fileDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id:'',
    url:''
  };
  msg:string = 'error';

  constructor(
    @Inject(AngularFireDatabase) private firebase: AngularFireDatabase
    ) { }

  getFileDetailList() {
    this.fileDetailList = this.firebase.list('imageDetails');
  }

  insertFileDetails(id,url) {
    this.dataSet = {
      id : id,
      url: url
    };
    this.fileDetailList.push(this.dataSet);
  }

  getFile(value){
    this.fileDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => { return item.payload.val();  });
        this.fileList.forEach(element => {
          if(element.id===value)
          this.msg = element.url;
        });
        if(this.msg==='error')
          alert('No record found');
        else{
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
}

export interface Data{
  id:string;
  url:string;
}