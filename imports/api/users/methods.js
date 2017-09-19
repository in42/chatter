import { Meteor } from 'meteor/meteor';


Meteor.methods({
    'isValidConverser': function(username) {
        var user = Meteor.users.findOne({ username: username });
        if (!!user && user._id !== this.userId) {
            return {
                _id: user._id,
                username: user.username,
                profile: {
                    displayname: user.profile.displayname,
                },
            };
        }
    },
});
