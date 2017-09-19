import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Messages = new Mongo.Collection('messages');

Messages.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Messages.schema = new SimpleSchema({
    _id:            { type: String, regEx: SimpleSchema.RegEx.Id },
    creatorId:      { type: String, regEx: SimpleSchema.RegEx.Id },
    conversationId: { type: String, regEx: SimpleSchema.RegEx.Id },
    text:           { type: String },
    createdAt:      { type: Date },
});

Messages.attachSchema(Messages.schema);
