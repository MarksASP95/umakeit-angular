import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

// services
import { ImgStorageService } from '../../../services/img-storage.service';
import { ComidaService } from '../../../services/comida.service';

// models
import { Comida } from '../../../models/comida';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  uploadPercent;
  downloadURL: Observable<string>;
  profileURL: Observable<string | null>;
  fileName: string;
  progressBarValue;
  url: string;

  constructor(private storage: AngularFireStorage, 
              private imgStorageService: ImgStorageService, 
              private comidaService: ComidaService,
              private toastr: ToastrService) { }

  ngOnInit() {

  }

  uploadImage(event){

    document.getElementById('progress-bar-parent').style.display = 'block';
    const file =  event.target.files[0];
    this.fileName = 'food' + Math.floor(Math.random() * 10000);
    
    this.uploadPercent = this.imgStorageService.upload(file, this.fileName);
    this.uploadPercent.subscribe(value => {
      this.progressBarValue = Math.ceil(value).toString() + '%';
      document.getElementById('progress-bar').style.width = value.toString() + '%';
    })

  }

  async submitComida(){
    const comidaForm = document.forms[0];

    await this.imgStorageService.getURL(this.fileName).toPromise()
      .then(value => {
        this.url = value;
      })
    
    const comida: Comida = {
      name: comidaForm['name'].value,
      desc: comidaForm['desc'].value,
      price: parseFloat(comidaForm['price'].value),
      img: this.url,
      modificable: comidaForm['modificable'].checked
    }

    this.comidaService.addComida(comida)
      .then(() => {
        this.toastr.success('Producto registrado', '¡Listo!');
      });
  }

  showURL(){
    this.imgStorageService.getURL(this.fileName).subscribe(value => {
      document.getElementById('fetched-img').setAttribute('src', value);
    });
  }

  

}
