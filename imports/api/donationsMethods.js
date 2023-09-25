import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { DonationsCollection } from "../db/DonationCollection";

Meteor.methods({
    'donation.insert'(amount, contact_id){
        check(amount, Number);
        DonationsCollection.insert({
           amount,
           contact_id,
            createdAt: new Date,
            addedBy:this.userId
        })

    },

    'donation.remove'(donationId) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        console.log(donationId)
        check(donationId, String)
        DonationsCollection.remove(donationId)
    },
    'donation.update'(donationId, amount) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        check(donationId, String)
        check(amount, Number)

        DonationsCollection.update(donationId,{$set:{
            amount:amount,
            updatedAt: new Date,

        }})
    }
})