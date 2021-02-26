import { isError } from 'util';
import { staticImplements } from '../common/staticImplements';
import { IStorableStatic } from '../dataStore/interface.IStorable';

@staticImplements<IStorableStatic<User>>()
export class User {

    static load(): User {
        return new User()
    }

    save():void{

    }

    delete():void{
        
    }

}