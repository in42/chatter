import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './signup-page.html';

Template.Signup_page.onCreated(function() {
    this.state = new ReactiveDict();
    this.state.setDefault({
        usernameError: false,
        firstnameError: false,
        lastnameError: false,
        passwordError: false,
        serverError: false,
    });
});

Template.Signup_page.helpers({
    usernameError() {
        const instance = Template.instance();
        return instance.state.get('usernameError') && 'form-control-error';
    },
    firstnameError() {
        const instance = Template.instance();
        return instance.state.get('firstnameError') && 'form-control-error';
    },
    lastnameError() {
        const instance = Template.instance();
        return instance.state.get('lastnameError') && 'form-control-error';
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

Template.Signup_page.events({
    'submit .signup-form'(event, instance) {
        event.preventDefault();

        var username = event.target.username.value;
        var firstname = event.target.firstname.value;
        var lastname = event.target.lastname.value;
        var password = event.target.password.value;

        instance.state.set('usernameError', !username);
        instance.state.set('firstnameError', !firstname);
        instance.state.set('lastnameError', !lastname);
        instance.state.set('passwordError', !password);

        if (!username || !firstname || !lastname || !password) {
            return;
        }

        var user = {
            username: username,
            password: password,
            profile: {
                firstname: firstname,
                lastname: lastname,
            },
        };

        Accounts.createUser(user, function(error) {
            return instance.state.set('serverError', error);
        });

        Meteor.defer(() => {
            FlowRouter.go('App.home');
        });
    },
})
