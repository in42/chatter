import { Meteor } from 'meteor/meteor';

import { Conversations } from '../conversations.js';

Meteor.publish('conversations', function conversations() {
    if (!this.userId) {
        return this.ready();
    }

    return Conversations.find({ $or: [
        { user1Id: this.userId },
        { user2Id: this.userId },
    ]});
})
