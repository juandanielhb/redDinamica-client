export class User {
    public _id:String;
    public about:String;
    public state:String;
    public role:String;
    public postgraduate:String;
    public picture:String;
    public knowledge_area:String;
    public profession:String;
    public institution:String;
    public city:String;

    constructor(
        public name:String,
        public surname:String,
        public password:String,
        public email:String        
    ){}
}