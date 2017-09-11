import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { FlowRouter } from 'meteor/kadira:flow-router';

import './app-root-redirector.html';

Template.App_rootRedirector.onCreated(() => {
    Meteor.defer(() => {
        FlowRouter.go('Signup');
    });
});
