import fs from 'fs';
import { IDataStore } from './interface.IDataStore';

export class JsonDataStore<T extends { id: string }> extends Map<string, T> implements IDataStore<T> {

    static clear( filepath:string ){
        fs.existsSync(`${__dirname}/${filepath}`) && fs.unlinkSync(`${__dirname}/${filepath}`);
    }
    
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
        super.set(id, value);
        this.save();
        return this;
    }

    delete(id:string): boolean {
        const result = super.delete(id);
        this.save();
        return result;
    }

    private save(){
        const data = JSON.stringify( [...this.values()], null, 4);
        fs.writeFileSync(`${__dirname}/${this.filepath}`, data, 'utf-8');
    }

}