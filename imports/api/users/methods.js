import { Meteor } from 'meteor/meteor';


Meteor.methods({
    'isValidConverser': function(username) {
        var user = Meteor.users.findOne({ username: username });
        if (!!user && user._id !== this.userId) {
            return user._id;
        }
    },
});
