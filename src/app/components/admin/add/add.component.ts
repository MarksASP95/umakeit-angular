import { Component, OnInit } from '@angular/core';

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
  fileName: string;
  progressBarValue;
  url: string;

  // datos de comida
  c_nombre: string;
  c_desc: string;
  c_price: string;
  c_modificable: boolean;

  constructor(public imgStorageService: ImgStorageService, 
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

    await this.imgStorageService.getURL(this.fileName).toPromise()
      .then(value => {
        this.url = value;
      })
      .catch((error) => {
        console.log(error);
      });

    const comida: Comida = {
      name: this.c_nombre,
      desc: this.c_desc,
      price: parseFloat(this.c_price),
      img: this.url,
      modificable: document.forms[0]['modificable'].checked
    }

    this.comidaService.addComida(comida)
      .then(() => {
        document.forms[0].reset();
        this.toastr.success('Producto registrado', '¡Listo!');
      })
      .catch(() => {
        this.toastr.error('El producto no ha podido registrarse','Error');
      });
  }
}
