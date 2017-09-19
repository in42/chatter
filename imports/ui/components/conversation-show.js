import { Template } from 'meteor/templating';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insert } from '../../api/messages/methods.js';
import { updateLatestMessage } from '../../api/conversations/methods.js';
import { Messages } from '../../api/messages/messages.js';
import './message.js';

import './conversation-show.html';

Template.Conversation_show.onCreated(function conversationShowOnCreated() {
    this.autorun(() => {
        new SimpleSchema({
            converser: { type: String, },
            displayname1: { type: String, },
            displayname2: { type: String, },
            user1Id: { type: String, regEx: SimpleSchema.RegEx.Id, },
            user2Id: { type: String, regEx: SimpleSchema.RegEx.Id, },
            _id: { type: String, regEx: SimpleSchema.RegEx.Id, },
            lastModified: { type: Date },
            latestMessage: { type: String, optional: true },
        }).validate(Template.currentData());
    });

    this.subscribe('messages.inConversation', { conversationId: Template.currentData()._id });
});

Template.Conversation_show.helpers({
    converserDisplayname() {
        const conversation = Template.currentData();
        if (conversation.user1Id == Meteor.userId()) {
            return conversation.displayname2;
        }
        return conversation.displayname1;
    },
    messages() {
        const conversationId = Template.currentData()._id;
        return Messages.find({}, { sort: { createdAt: 1 }});
    }
});

Template.Conversation_show.events({
    'submit .form-text-message'(event, instance) {
        event.preventDefault();

        var text = event.target.textMessage.value;
        var creatorId = Meteor.userId();
        var conversationId = Template.currentData()._id;

        if (!!text) {
            insert.call({
                creatorId: creatorId,
                conversationId: conversationId,
                text: text,
            });
            updateLatestMessage.call({
                conversationId: conversationId,
                latestMessage: text,
            });
        }

        event.target.textMessage.value = '';
    },
});
