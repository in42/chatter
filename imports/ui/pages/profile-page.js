import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Conversations } from '../../api/conversations/conversations.js';
import './profile-page.html';

Template.Profile_page.onCreated(function profilePageOnCreated() {
    this.subscribe('conversations');
});

Template.Profile_page.helpers({
    conversations() {
        return Conversations.find({ $or: [
            { user1Id: Meteor.userId() },
            { user2Id: Meteor.userId() },
        ]});
    },
    conversationHeadArgs(conversation) {
        const converser = conversation.converser(Meteor.userId());
        return {
            converser: converser,
            latestMessage: latestMessage,
        };
    }
});

Template.Profile_page.events({
    'click .sign-out'(event, instance) {
        event.preventDefault();

        Meteor.logout();
        FlowRouter.go('Signin');
    }
})
