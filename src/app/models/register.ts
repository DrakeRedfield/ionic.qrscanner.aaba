export class Register {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;
    private Functions = {
        'http': ()=>{ this.type = 'https'; this.icon = 'globe'; return true },
        'geo:': ()=>{ this.type = 'https'; this.icon = 'pin'; return true},
    }
    private defaultFunctions = () => { this.type = 'undefined'; this.icon = 'create' }

    constructor( format:string, text: string ){
        this.format = format;
        this.text = text;
        this.created = new Date();

        this.getType();
    }

    private getType(){
        const textStart = this.text.substring(0,4);
        this.Functions[textStart]() || this.defaultFunctions()
    }

}