import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Conversations } from './conversations.js';

export const insert = new ValidatedMethod({
    name: 'conversations.insert',
    validate: new SimpleSchema({
        user1Id: Conversations.simpleSchema().schema('user1Id'),
        user2Id: Conversations.simpleSchema().schema('user2Id'),
        latestMessage: Conversations.simpleSchema().schema('latestMessage'),
    }).validator(),
    run({ user1Id, user2Id }) {
        const conversation = {
            latestMessage: latestMessage,
            user1Id:       user1Id,
            user2Id:       user2Id,
            createdAt:     new Date(),
        };

        Conversations.insert(conversation);
    }
});

export const updateLatestMessage = new ValidatedMethod({
    name: 'conversations.updateLatestMessage',
    validate: new SimpleSchema({
        conversationId: Conversations.simpleSchema().schema('_id'),
        latestMessage:  Conversations.simpleSchema().schema('latestMessage'),
    }).validator({ clean: true }),
    run({ conversationId, latestMessage }) {
        const conversation = Conversations.findOne({conversationId});

        if (!conversation.editableBy(this.userId)) {
            throw new Meteor.Error('conversations.updateLatestMessage.accessDenied',
                'You don\'t have permission to edit this conversation.');
        }

        Conversations.update(conversationId, {
            $set: { latestMessage: latestMessage },
        });
    },
});