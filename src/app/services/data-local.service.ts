import { Injectable, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Record } from '../models/register';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService{

  saved: Record[] = [];

  constructor(
    private localData: Storage,
    private navCtrl: NavController,
    private openBrowser: InAppBrowser,
  ) { 
    this.loadData();
  }

  async loadData(){
    this.saved = (await this.localData.get('records')) || [];
  }

  async saveScan( format:string, text:string ){
    await this.loadData();
    const newScan = new Record(format,text);
    this.saved.unshift(newScan);
    this.localData.set('records', this.saved);
    this.openScan(newScan);
  }

  clear(){
    this.saved = [];
    this.localData.set('records', this.saved)
  }
  
  openScan( scan: Record ){
    this.navCtrl.navigateForward('/tabs/history')
    scan.openScan();
  }

}
