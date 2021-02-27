import { JsonDataStore } from '../src/dataStore/class.JsonDataStore';

import { IUser } from '../src/users/interface.IUser';
import { User } from '../src/users/class.user';
import { NewUserBuilder, UserBuilder } from '../src/users/builder.user';
import { LoggedInUser } from '../src/users/class.loggedInUser';

import { expect } from "chai";
import faker from 'faker';
import "mocha";



describe("Users", () => {
    
    beforeEach(() => {
        JsonDataStore.reset('users.json');
    })

    describe('Builder', () => {

        let id:string;
        
        const newUser:Partial<IUser> = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        it("Should Throw Error Saving User", () => {
        
            const builder = new NewUserBuilder();
            const user = builder.getUser();
            expect(() => user.save()).to.throw();
    
        });

        it("Should Throw Error Setting Password with less than 8 characters", () => {
        
            const builder = new NewUserBuilder();
            const user = builder.getUser();
            expect(() => {
                user.password = "1234567";
            }).to.throw();
    
        });

        it("Should Throw Error Setting Email that's not an email", () => {
        
            const builder = new NewUserBuilder();
            const user = builder.getUser();
            expect(() => {
                user.email = "1234567";
            }).to.throw();
    
        });

        it("Should save user", () => {
        
            const builder = new NewUserBuilder();
            builder.setRequiredData({ ...newUser });
            const user = builder.getUser();
            id = user.id;
            
            expect(() => user.save()).to.not.throw();
    
        });

        it("Should load last user", () => {
        
            const builder = new UserBuilder( id );
            const user = builder.getUser();
            expect(user.password).to.not.eq( newUser.password );
            expect(user.username).to.eq( newUser.username );
            expect(user.email).to.eq( newUser.email );
            expect(user.name).to.eq( newUser.name );
    
        });

        it("Should delete last user", () => {
        
            const builder = new UserBuilder( id );
            const user = builder.getUser();
            expect(() => user.delete()).to.not.throw();
    
        });

    });

    describe('User Class', () => {

        let id:string;
        
        const newUser:Partial<IUser> = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        before(() => {

            const builder = new NewUserBuilder();
            builder.setRequiredData({ ...newUser });
            const user = builder.getUser();
            user.save();
            id = user.id;

        })

        it("Should load user", () => {
        
            const user = User.load( id );
            expect(user.password).to.not.eq( newUser.password );
            expect(user.username).to.eq( newUser.username );
            expect(user.email).to.eq( newUser.email );
            expect(user.name).to.eq( newUser.name );
    
        });

        it("Should succeed matching password", () => {
        
            const user = User.load( id );
            const isMatch = user.comparePassword( newUser.password );
            expect( isMatch ).to.be.true;
    
        });

        it("Should fail matching password", () => {
        
            const user = User.load( id );
            const isMatch = user.comparePassword("1234567");
            expect( isMatch ).to.be.false;
    
        });

        it("Should not find user", () => {

            const user = User.load("");
            expect( user ).to.be.undefined;

        });

        it("Should delete user", () => {

            const user = User.load( id );
            expect(() => user.delete()).to.not.throw();

        });

    });

    describe('LoggedInUser Class', () => {

        let id:string;
        let id2:string;

        let loggedInUser:LoggedInUser;
        
        const newUser:Partial<IUser> = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        const newUser2:Partial<IUser> = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            username: faker.internet.userName(),
            password: faker.internet.password()
        }

        before(() => {

            const builder = new NewUserBuilder();
            builder.setRequiredData({ ...newUser });
            const user = builder.getUser();
            user.save();
            id = user.id;

            const builder2 = new NewUserBuilder();
            builder2.setRequiredData({ ...newUser2 });
            const user2 = builder2.getUser();
            user2.save();
            id2 = user2.id;

        })

        it('Should not retrieve logged in user', () => {

            expect(() => {
                const user = new LoggedInUser();
            }).to.throw();

        });
        
        it('Should log user in', () => {

            expect(() => {
                loggedInUser = User.login( newUser.username, newUser.password );
            }).to.not.throw();
            expect( loggedInUser.id ).to.be.eq( id );

        });

        it('Should retrieve logged in user', () => {
            
            const user = new LoggedInUser();

            expect( user.id ).to.be.eq( loggedInUser.id );
            expect( user.name ).to.be.eq( newUser.name );
            expect( user.email ).to.be.eq( newUser.email );
            expect( user.username ).to.be.eq( newUser.username );
            expect( user.password ).to.be.eq( User.hash( newUser.password ));

        });

        it('Should change logged in user', () => {

            let user = new LoggedInUser();
            expect( user.id ).to.be.eq( id );

            User.login( newUser2.username, newUser2.password );
            user = new LoggedInUser();
            expect( user.id ).to.be.eq( id2 );

        });

    });

    after(() => {
        JsonDataStore.clear(`users.json`);
    });

});
