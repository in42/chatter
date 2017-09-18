import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Conversations = new Mongo.Collection('conversations');

Conversations.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Conversations.schema = new SimpleSchema({
    _id:           { type: String, regEx: SimpleSchema.RegEx.Id },
    latestMessage: { type: String },
    user1Id:       { type: String, regEx: SimpleSchema.RegEx.Id },
    user2Id:       { type: String, regEx: SimpleSchema.RegEx.Id },
    createdAt:     { type: Date },
});

Conversations.attachSchema(Conversations.schema);

Conversations.helpers({
    editableBy(userId) {
        return this.user1Id === userId || this.user2Id === userId;
    },
    converser(userId) {
        if (this.user1Id === userId) {
            return this.user2Id;
        }
        return user1Id;
    }
});
