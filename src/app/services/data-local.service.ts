import { Injectable, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Record } from '../models/register';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File as ionFile } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService{

  saved: Record[] = [];

  constructor(
    private localData: Storage,
    private navCtrl: NavController,
    private openBrowser: InAppBrowser,
    private file: ionFile,
    private toastController: ToastController,
    private email: EmailComposer,
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
    this.navCtrl.navigateForward('/tabs/history');
    const Functions = {
      'https': ()=>{ this.openBrowser.create(scan.text, '_system'); return true; },
      'geo': ()=>{ this.navCtrl.navigateForward(`/tabs/history/mapa/${scan.text}`);return true; },
      'undefined': () => { return false; }
    }
    Functions[scan.type]()
    // scan.openScan();
  }

  sendInfo(){
    let contentCSV = []
    const titles = 'Type, Format, Created, Text\n';
    contentCSV.push( titles );
    this.saved.forEach( item =>{
      const line = `${item.type},${item.format},${item.created},${item.text.replace(',','  ')}\n`
      contentCSV.push(line);
    });
    const textCSV = contentCSV.join('');
    this.saveCSV(textCSV);
  }

  saveCSV(str: string){
    console.log(this.file.dataDirectory);
    this.file.checkFile( this.file.dataDirectory, 'history.csv').then( resp =>{
      this.writeInFile(str);
    }).catch( error =>{
      return this.file.createDir( this.file.dataDirectory, 'history.csv',false).then( resp =>{
        this.writeInFile(str);
      }).catch( error =>{
        this.showMessage(`Error al crear el directorio.`);
      })
    });
  }

  async writeInFile( str ){
    await this.file.writeExistingFile( this.file.dataDirectory, 'history.csv', str);
    this.showMessage('Se guardo correctamente.');
    let email = {
      to: '',
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }
  }

  showMessage(str){
    const toast = this.toastController.create({
      message: str,
      duration: 1000
    })
  }

}
