export class Message {
    public _id:String;   
    public viewed:String;
    
    constructor(
        public emitter:String,
        public receiver:String,
        public text:String
    ){}
}

