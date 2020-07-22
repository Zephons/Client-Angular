export class Analysis {
    public userfullname: string;
    public username: string;
    public tweet_text: string;
    public created_at: Date;
    public sentiment: Object;

    constructor() {
        this.userfullname = '';
        this.username = '';
        this.tweet_text = '';
        this.created_at = null;
        this.sentiment = null;
    }
}