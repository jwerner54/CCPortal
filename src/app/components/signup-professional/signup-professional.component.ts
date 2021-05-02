import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
// import { FileService } from '../../services/file.service';
// import { AngularFireStorage } from '@angular/fire/storage';
// import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup-professional',
  templateUrl: './signup-professional.component.html',
  styleUrls: ['./signup-professional.component.css']
})
export class SignupProfessionalComponent implements OnInit {

  selectedFile: any = null;
  url:string;
  // id:string;
  file:string;

  constructor( 
    public authService: AuthService,
    // public fileService: FileService,
    // public storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    // this.fileService.getFileDetailList();
  }

  // showPreview(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // save() {
  //   var name = "test name";
  //   const fileRef = this.storage.ref(name);
  //   this.storage.upload(name, this.selectedFile).snapshotChanges().pipe(
  //     finalize(() => {
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.url = url;
  //         this.fileService.insertFileDetails("test id",this.url);
  //         alert('Upload Successful');
  //       })
  //     })
  //   ).subscribe();
  // }

  // view(){
  //   this.fileService.getFile(this.file);
  // }

  

}
