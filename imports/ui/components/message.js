import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './message.html';

Template.Message.onCreated(function messageOnCreated() {
    this.autorun(() => {
        new SimpleSchema({
            conversationId: { type: String, regEx: SimpleSchema.RegEx.Id },
            creatorId: { type: String, regEx: SimpleSchema.RegEx.Id },
            _id: { type: String, regEx: SimpleSchema.RegEx.Id },
            text: { type: String, },
            createdAt: { type: Date, },
        }).validate(Template.currentData());
    });
});

Template.Message.helpers({
    isMine(creatorId) {
        return Meteor.userId() === creatorId && 'text-right';
    }
});
