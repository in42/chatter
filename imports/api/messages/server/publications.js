import { Meteor } from 'meteor/meteor';

import { Messages } from '../messages.js';

Meteor.publish('messages.inConversation', function messages(params) {
    new SimpleSchema({
        conversationId: { type: String, regEx: SimpleSchema.RegEx.Id },
    }).validate();

    const { conversationId } = params;

    return Messages.find({ conversationId: conversationId });
})
