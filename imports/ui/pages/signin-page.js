import { Template } from 'meteor/templating';

import './signin-page.html';

Template.Signin_page.events({
    'submit .signin-form'(event) {
        event.preventDefault();
        console.log(event);
    }
})
