export class Analysis {
    public username: string;
    public tweet_text: string;
    public created_at: Date;
    public sentiment: Object;

    constructor() {
        this.username = '';
        this.tweet_text = '';
        this.created_at = null;
        this.sentiment = null;
    }
}