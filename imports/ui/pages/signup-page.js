import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './signup-page.html';

Template.Signup_page.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        usernameError: false,
        displaynameError: false,
        passwordError: false,
        confirmPasswordError: false,
        serverError: false,
    });
});

Template.Signup_page.helpers({
    usernameError() {
        const instance = Template.instance();
        return instance.state.get('usernameError') && 'form-control-error';
    },
    displaynameError() {
        const instance = Template.instance();
        return instance.state.get('displaynameError') && 'form-control-error';
    },
    passwordError() {
        const instance = Template.instance();
        return instance.state.get('passwordError') && 'form-control-error';
    },
    confirmPasswordError() {
        const instance = Template.instance();
        return instance.state.get('confirmPasswordError') && 'form-control-error';
    },
    serverError() {
        const instance = Template.instance();
        return instance.state.get('serverError') && 'form-error';
    }
});

Template.Signup_page.events({
    'submit .signup-form'(event, instance) {
        event.preventDefault();

        var username = event.target.username.value;
        var displayname = event.target.displayname.value;
        var password = event.target.password.value;
        var confirmPassword = event.target.confirmPassword.value;

        instance.state.set('usernameError', !username);
        instance.state.set('displaynameError', !displayname);
        instance.state.set('passwordError', !password);
        instance.state.set('confirmPasswordError', password !== confirmPassword);

        if (!username || !displayname || !password || password !== confirmPassword) {
            return;
        }

        var user = {
            username: username,
            password: password,
            profile: {
                displayname: displayname,
            },
        };

        Accounts.createUser(user, function(error) {
            if (error) {
                return instance.state.set('serverError', error);
            } else {
                FlowRouter.go('App.home');
            }
        });
    },
})
