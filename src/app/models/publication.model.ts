export class Publication {
    public _id:String;
    public comments;   
    public file;

    constructor(
        public text,
        public user
    ){}
}