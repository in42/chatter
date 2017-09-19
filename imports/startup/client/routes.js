import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/authentication-body.js';
import '../../ui/pages/profile-page.js';
import '../../ui/pages/signup-page.js';
import '../../ui/pages/signin-page.js';

FlowRouter.route('/', {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.loggingIn() && !Meteor.userId()) {
            redirect('/signin');
        }
    }],
    name: 'App.home',
    action() {
        BlazeLayout.render('Profile_page');
    },
});

FlowRouter.route('/signup', {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.loggingOut() && Meteor.userId()) {
            redirect('/');
        }
    }],
    name: 'Signup',
    action() {
        BlazeLayout.render('Authentication_body', { main: 'Signup_page'});
    },
});

FlowRouter.route('/signin', {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.loggingOut() && Meteor.userId()) {
            redirect('/');
        }
    }],
    name: 'Signin',
    action() {
        BlazeLayout.render('Authentication_body', { main: 'Signin_page'});
    },
});
