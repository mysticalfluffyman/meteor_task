import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
    'account.create'(userName, password){
        console.log(userName)
        check(userName, String);
        check(password, String);
       Accounts.createUser({
        username:userName,
        password:password,
       })

    },

    
})