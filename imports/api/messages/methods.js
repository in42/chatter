import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Messages } from './messages.js';

export const insert = new ValidatedMethod({
    name: 'messages.insert',
    validate: new SimpleSchema({
        creatorId:      Messages.simpleSchema().schema('creatorId'),
        conversationId: Messages.simpleSchema().schema('conversationId'),
        text:           Messages.simpleSchema().schema('text'),
    }).validator({ clean: true }),
    run({ creatorId, conversationId, text }) {
        const message = {
            creatorId:      creatorId,
            conversationId: conversationId,
            text:           text,
            createdAt:      new Date(),
        };

        Messages.insert(message);
    }
})
