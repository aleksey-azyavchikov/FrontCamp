export class Storage  {
    static getInstance() {
        if (this.storage === undefined || this.storage === null) {
            this.storage = new Storage();
        }  
        return this.storage;
    }

    constructor(storage) {
        this.storage = storage || localStorage; 
    }

    getItem(key) {
        return this.storage.getItem(key);
    }

    setItem(key, value) {
        this.storage.setItem(key, value);
    }
    
    removeItem(key) {
        this.storage.removeItem(key);
    } 

    itemIsExist(key) {
        return this.getItem(key) !== null; 
    }
}