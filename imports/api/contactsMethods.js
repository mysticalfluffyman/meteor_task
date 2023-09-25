import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ContactsCollection } from "../db/ContactsCollection";

Meteor.methods({
    'contacts.insert'(firstName, lastName){
        check(firstName, String);
        check(lastName, String);
        console.log(this.userId)
        ContactsCollection.insert({
            firstName: firstName,
            lastName: lastName,
            createdAt: new Date,
            updatedAt: new Date,
            addedBy:this.userId
        })

    },

    'contacts.remove'(contactId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        check(contactId, String)
        ContactsCollection.remove(contactId)
    },
    'contacts.update'(contactId,firstName, lastName) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        check(contactId, String)
        check(firstName, String)
        check(lastName, String)

        ContactsCollection.update(contactId,{$set:{
            firstName:firstName,
            lastName:lastName,
            updatedAt: new Date,

        }})
    }
})