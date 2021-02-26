import "mocha";
import { expect } from "chai";
import fs from 'fs';

import { JsonDataStore } from "../src/dataStore/class.JsonDataStore";


describe('DataStores', () => {

    before(() => {
        JsonDataStore.clear('test.json');
    })
    
    describe('JsonDataStore', () => {

        it('Should only read file if it exists', () => {

            const read = () => fs.readFileSync(`${__dirname}/../src/dataStore/test.json`);
            const store = new JsonDataStore<{ id: string }>('test.json');
            expect( read ).to.throw();

        })

        it('Should load contents from file', () => {

            const store = new JsonDataStore<{ id: string }>('test.json');
            store.set("1", { id: "1" });
            
            const store2 = new JsonDataStore<{ id: string }>('test.json');
            expect( store.get("1")).to.be.an('object').that.includes({ id: "1" });

        })

    })

    after(() => {
        JsonDataStore.clear('test.json');
    })

})