export class Resource {
    public _id;
    public downloads;
    public visible;
    public comments;
    public score;
    public justification;
    public accepted;
    public file;
    public url;
    public created_at;    

    constructor(
        public name,
        public type,
        public source,
        public description,
        public author,
    ){}
}