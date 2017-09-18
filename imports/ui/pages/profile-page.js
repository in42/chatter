import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Conversations } from '../../api/conversations/conversations.js';
import { insert } from '../../api/conversations/methods.js';

import '../components/conversation-head.html';
import './profile-page.html';

const CONVERSATION_STATE = {
    NONE: 'header-none',
    NEW: 'header-new-conversation',
    CHOSEN: 'header-chosen-conversation',
};

Template.Profile_page.onCreated(function profilePageOnCreated() {
    this.subscribe('conversations');

    this.state = new ReactiveDict();
    this.state.setDefault({
        usernameError: false,
        conversationState: CONVERSATION_STATE.NONE,
    });
});

Template.Profile_page.helpers({
    conversationHeaderNone() {
        const instance = Template.instance();
        return instance.state.get('conversationState') === CONVERSATION_STATE.NONE;
    },
    conversationHeaderNew() {
        const instance = Template.instance();
        return instance.state.get('conversationState') === CONVERSATION_STATE.NEW;
    },
    conversationHeaderChosen() {
        const instance = Template.instance();
        return instance.state.get('conversationState') === CONVERSATION_STATE.CHOSEN;
    },
    usernameError() {
        const instance = Template.instance();
        return instance.state.get('usernameError') && 'form-control-error';
    },
    conversations() {
        return Conversations.find({ $or: [
            { user1Id: Meteor.userId() },
            { user2Id: Meteor.userId() },
        ]});
    },
    conversationHeadArgs(conversation) {
        const converser = conversation.converser(Meteor.userId());
        const latestMessage = conversation.latestMessage;
        return {
            converser: converser,
            latestMessage: latestMessage,
        };
    },
});

Template.Profile_page.events({
    'click .fa-telegram'(event, instance) {
        event.preventDefault();

        instance.state.set('conversationState', CONVERSATION_STATE.NEW);
    },
    'submit .form-find-username'(event, instance) {
        event.preventDefault();

        var username = event.target.converseUsername.value;

        if (!username) {
            return instance.state.set('usernameError', true);
        }

        Meteor.call('isValidConverser', username, function(error, result) {
            if (error || !result) {
                return instance.state.set('usernameError', true);
            }
            insert.call({
                user1Id: Meteor.userId(),
                user2Id: result,
            }, function(error) {
                if (error) {
                    return instance.state.set('usernameError', true);
                }
                // TODO: draw conversation show with conversation chosen
            });
        });
    },
    'click .btn-cancel'(event, instance) {
        event.preventDefault();

        instance.state.set('conversationState', CONVERSATION_STATE.NONE);
    },
    'click .fa-hand-peace-o'(event, instance) {
        event.preventDefault();

        Meteor.logout(function meteorLogout() {
            FlowRouter.go('Signin');
        });
    },
});
