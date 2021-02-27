import fs from 'fs';
import { IDataStore } from './interface.IDataStore';

//T is an object type that can be decided later.  
//{id: string} is the file name of the object
//Map is a JavaScript object with key:value pairs.
//This Map requires a key of type string, and an value object of type T.
export class JsonDataStore<T extends { id: string }> extends Map<string, T> implements IDataStore<T> {
    //Checks to see if a file exists, and deletes it if it does.
    static clear( filepath:string ){
        fs.existsSync(`${__dirname}/${filepath}`) && fs.unlinkSync(`${__dirname}/${filepath}`);
    }
    //Checks to see if a file exists, and erases it if it does.  The file still exists afterward.
    static reset( filepath:string ){
        fs.writeFileSync(`${__dirname}/${filepath}`, '[]', 'utf-8');
    }

    //A data store requires a file path.
    constructor( private filepath:string ){
        
        super();
        
        // create empty file if it doesn't exist
        if(fs.existsSync(`${__dirname}/${filepath}`)){
            const data:string = fs.readFileSync(`${__dirname}/${filepath}`, 'utf-8');
            JSON.parse( data ).forEach(( item:T ) => this.set(item.id, item));
        }

    }
    //set comes from the Map extension.  It sets up a key:value of filename, object.
    set(id:string, value:T): this {
        super.set(id, value);
        this.save();
        return this;
    }
    //Deletes a file with a name of id.  Delete is also from the Map extension
    delete(id:string): boolean {
        const result = super.delete(id);
        this.save();
        return result;
    }
    //Writes the object to a JSON file.
    private save(){
        const data = JSON.stringify( [...this.values()], null, 4);
        fs.writeFileSync(`${__dirname}/${this.filepath}`, data, 'utf-8');
    }
}