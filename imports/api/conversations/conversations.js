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
    latestMessage: { type: String, optional: true },
    user1Id:       { type: String, regEx: SimpleSchema.RegEx.Id },
    displayname1:  { type: String, },
    user2Id:       { type: String, regEx: SimpleSchema.RegEx.Id },
    displayname2:  { type: String, },
    lastModified:  { type: Date, optional: true },
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
        return this.user1Id;
    },
    displayname(userId) {
        if (this.user1Id == userId) {
            return this.displayname1;
        }
        return this.displayname2;
    }
});
