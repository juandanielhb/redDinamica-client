export class Resource {
    public _id:String;
    public views:String;
    public visible:String;
    public comments:Array<String>;

    constructor(
        public name:String,
        public type:String,
        public source:String,
        public description:String,
        public author:String,
        public created_at:String
    ){}
}

