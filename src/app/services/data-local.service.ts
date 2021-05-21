import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit {

  saved: Register[] = [];

  constructor(
    private localData: Storage,
  ) { }

  async ngOnInit(){
    this.saved = await this.localData.get('records') || [];
  }

  saveScan( format:string, text:string ){
    const newScan = new Register(format,text);
    this.saved.unshift(newScan);
    // console.log('Almacenados', this.saved);
    this.localData.set('records', this.saved)
  }

}
