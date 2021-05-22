import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';

export class Record {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;
    
    constructor( format:string, text: string ){
        this.format = format;
        this.text = text;
        this.created = new Date();

        this.getType();
    }

    private getType(){
        const textStart = this.text.substring(0,4);
        const Functions = {
            'http': ()=>{ this.type = 'https'; this.icon = 'globe'; return true },
            'geo:': ()=>{ this.type = 'geo'; this.icon = 'location'; return true},
        }
        const defaultFunctions = () => { this.type = 'undefined'; this.icon = 'create' };
        Functions[textStart]() || defaultFunctions();
    }

    // openScan(){
    //     const openBrowser = new InAppBrowser();
    //     const Functions = {
    //         'https': ()=>{ openBrowser.create(this.text, '_system'); return true; },
    //         'geo': ()=>{  ;return true; },
    //         'undefined': () => { return false; }
    //     }
    //     Functions[this.type]()
    // }

}