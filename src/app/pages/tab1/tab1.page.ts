import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private scanner: BarcodeScanner,
    private localData: DataLocalService,
  ) {}

  ionViewWillEnter(){
    this.scan();
  }
  
  scan(){
    this.scanner.scan().then(barcodeData => {
      if( !barcodeData.cancelled ){
        this.localData.saveScan( barcodeData.format, barcodeData.text );
      }
     }).catch(err => {
        //  this.localData.saveScan( 'QR_CODE','https://www.linkedin.com/in/angel-antonio-barco-alfaro-b36b6316a/');
        //  this.localData.saveScan( 'QR_CODE','geo:40.73151796986687,-74.06087294062502');
     });
  }

}
