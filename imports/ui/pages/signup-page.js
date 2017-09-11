import { Template } from 'meteor/templating';

import './signup-page.html';

Template.Signup_page.events({
    'submit .signup-form'(event) {
        event.preventDefault();

        console.log(event);
    }
})
