
export class ChatItem {
    public msg: string;
}

export class ChatCache {
    public cache: Array<ChatItem> = [];
    public readonly MAX_CACHE_SIZE = 50;
    
    public add(msg: string) {
        this.cache.push({ msg });
        if (this.cache.length > this.MAX_CACHE_SIZE) {
            this.cache.shift();
        }
    }

    public getMsg(length: number): string[] {
        if (length > this.cache.length) {
            return this.cache.map(item => item.msg);
        }
        return this.cache.slice(-length).map(item => item.msg);
    }
}