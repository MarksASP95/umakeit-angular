import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImgStorageService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  profileURL: Observable<string | null>;
  urlReady: boolean = false;

  constructor(private storage: AngularFireStorage) { }

  upload(file, key){
    
    const filePath = key;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.downloadURL = null;
    
    this.uploadPercent = task.percentageChanges();
    
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
      })
    )
    .subscribe()

    return this.uploadPercent;
  }

  getURL(key){
    const ref = this.storage.ref(key);
    this.profileURL = ref.getDownloadURL();
    return this.profileURL;
  }

}
