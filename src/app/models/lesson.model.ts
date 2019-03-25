export class Lesson{
    public _id:String;
    public development_group:Array<String>;
    public leader:String;
    public expert:String;
    public published_at:String;
    public comments:Array<String>;
    public files:String;
    public views:String;
    public rating:String;
    public knowledge_area:Array<String>;
    public grade:Array<String>;

    constructor(
        public title:String,
        public objectives:Array<String>,
        public resume:String,
        public references:String,
        public created_at:String,
        public state:String,
        public entries:String,
        public earlier_version:String,
        public next_version:String,
    ){}
}