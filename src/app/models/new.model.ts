export class New{
    public _id:String;
    public picture:String;
    public created_at:String;
    public comments:Array<String>;
    public source:String;

    constructor(
        public title:String,
        public description:String,
        public author:String,
    ){}
}