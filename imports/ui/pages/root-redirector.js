import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { FlowRouter } from 'meteor/kadira:flow-router';

import './root-redirector.html';

Template.Root_redirector.onCreated(() => {
    Meteor.defer(() => {
        FlowRouter.go('Signin');
    });
});
