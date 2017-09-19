import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Conversations } from '../../api/conversations/conversations.js';
import { insert } from '../../api/conversations/methods.js';
import '../components/conversation-head.js';
import '../components/conversation-show.js';

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
        conversationChosen: null,
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
        const conversationId = conversation._id;
        const converserId = conversation.converser(Meteor.userId());
        const converserDisplayname = conversation.displayname(converserId);
        const latestMessage = conversation.latestMessage;
        const lastModified = conversation.lastModified;
        return {
            conversationId: conversationId,
            converserId: converserId,
            converserDisplayname: converserDisplayname,
            latestMessage: latestMessage,
            lastModified: lastModified,
        };
    },
    conversationChosen() {
        const instance = Template.instance();
        return instance.state.get('conversationChosen');
    }
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

            var previousConversation = Conversations.findOne({ $or: [
                { user1Id: result._id },
                { user2Id: result._id },
            ]});

            var conversationId = null;

            if (!!previousConversation) {
                conversationId = previousConversation._id;
            } else {
                conversationId = insert.call({
                    user1Id: Meteor.userId(),
                    displayname1: Meteor.user().profile.displayname,
                    user2Id: result._id,
                    displayname2: result.profile.displayname,
                }, function(error) {
                    if (error) {
                        return instance.state.set('usernameError', true);
                    }
                });
            }

            var conversation = Conversations.findOne({ _id: conversationId });
            instance.state.set('conversationChosen', conversation);
            instance.state.set('conversationState', CONVERSATION_STATE.CHOSEN);
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
