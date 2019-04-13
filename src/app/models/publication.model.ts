export class Publication {
    public _id:String;
    public comments;   
    public file;
    public created_at;

    constructor(
        public text,
        public user
    ){}
}