import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/app-root-redirector.js';
import '../../ui/pages/signup-page.js';

FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_rootRedirector'});
    },
});

FlowRouter.route('/signup', {
    name: 'Signup',
    action() {
        BlazeLayout.render('App_body', { main: 'Signup_page'});
    },
});

FlowRouter.route('/signin', {
    name: 'Signin',
    action() {
        BlazeLayout.render('App_body', { main: 'Signin_page'});
    },
});
