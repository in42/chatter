import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './signin-page.html';

Template.Signin_page.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        usernameError: false,
        passwordError: false,
        serverError: false,
    });
});

Template.Signin_page.helpers({
    usernameError() {
        const instance = Template.instance();
        return instance.state.get('usernameError') && 'form-control-error';
    },
    passwordError() {
        const instance = Template.instance();
        return instance.state.get('passwordError') && 'form-control-error';
    },
    serverError() {
        const instance = Template.instance();
        return instance.state.get('serverError') && 'form-error';
    }
});

Template.Signin_page.events({
    'submit .signin-form'(event, instance) {
        event.preventDefault();

        var username = event.target.username.value;
        var password = event.target.password.value;

        instance.state.set('usernameError', !username);
        instance.state.set('passwordError', !password);

        if (!username || !password) {
            return;
        }

        Meteor.loginWithPassword(username, password, function(error) {
            return instance.state.set('serverError', error);
        });

        FlowRouter.go('App.home');
    },
})
