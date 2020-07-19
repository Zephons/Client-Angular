export class Analysis {
    public user_name: string;
    public tweet_text: string;
    public created_at: Date;
    public score: number;

    constructor() {
        this.user_name = '';
        this.tweet_text = '';
        this.created_at = null;
        this.score = 0;
    }
}