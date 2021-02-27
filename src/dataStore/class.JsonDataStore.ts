import fs from 'fs';
import { IDataStore } from './interface.IDataStore';

export class JsonDataStore<T extends { id: string }> extends Map<string, T> implements IDataStore<T> {

    // if the filepath is true, delete the file.
    static clear( filepath:string ){
        fs.existsSync(`${__dirname}/${filepath}`) && fs.unlinkSync(`${__dirname}/${filepath}`);
    }
    
    // resets the target file with an empty array.
    // only affects the targeted file
    static reset( filepath:string ){
        fs.writeFileSync(`${__dirname}/${filepath}`, '[]', 'utf-8');
    }
    
    constructor( private filepath:string ){
        
        super();
        
        // create empty file if it doesn't exist
        if(fs.existsSync(`${__dirname}/${filepath}`)){
            const data:string = fs.readFileSync(`${__dirname}/${filepath}`, 'utf-8');
            JSON.parse( data ).forEach(( item:T ) => this.set(item.id, item));
        }

    }
   
    set(id:string, value:T): this {
        // I would like to know more about this.
        super.set(id, value);
        
        this.save();
        return this;
    }
    // 
    delete(id:string): boolean {
        // I would like to know more about this.
        const result = super.delete(id);
        this.save();
        return result;
    }

    // only save the instance of the selected article when called.
    private save(){
        // converts the contents of an instance into JSON valid contents
        // Instead of having one line of the entire article, "null, 4" gives each parameter it's own line
        // spread the values of the article instead of writing each parameter.
        const data = JSON.stringify( [...this.values()], null, 4);
        // saves the article(data) to this.filepath
        fs.writeFileSync(`${__dirname}/${this.filepath}`, data, 'utf-8');
    }

}