import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { FlowRouter } from 'meteor/kadira:flow-router';

import './profile-page.html';

Template.Profile_page.events({
    'click .sign-out'(event, instance) {
        event.preventDefault();

        Meteor.logout();
        FlowRouter.go('Signin');
    }
})
