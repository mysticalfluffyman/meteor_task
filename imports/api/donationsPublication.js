import { Meteor } from "meteor/meteor";
import { DonationsCollection } from "../db/DonationCollection";

Meteor.publish('donations', function publishDonations(){
    return DonationsCollection.find({addedBy: this.userId})
})