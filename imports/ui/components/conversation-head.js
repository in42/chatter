import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import './conversation-head.html';

Template.Conversation_head.onCreated(function conversationHeadOnCreated() {
    this.autorun(() => {
        new SimpleSchema({
            conversationId: { type: String, regEx: SimpleSchema.RegEx.Id },
            converserId: { type: String, regEx: SimpleSchema.RegEx.Id },
            converserDisplayname: { type: String },
            latestMessage: { type: String, optional: true },
            lastModified: { type: Date, optional: true },
        }).validate(Template.currentData());
    });
});

Template.Conversation_head.helpers({
    shouldShow() {
        return !!latestMessage;
    },

});
