export class LoginCustom {

    static handleSignInFormSubmit() {
        $('#m_login_signin_submit').click(function(e) {
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    emailOrPhone: {
                        required: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static displaySignUpForm() {
        let login = $('#m_login');
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signin');
        login.removeClass('m-next-employee');
        login.removeClass('m-next-password');

        login.addClass('m-login--signup');
        (<any>login.find('.m-login__signup')).animateClass('flipInX animated');
    }

    static displaySignInForm() {
        let login = $('#m_login');
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signup');
        login.removeClass('m-next-employee');
        login.removeClass('m-next-password');
        try {
            $('form').data('validator').resetForm();
        } catch (e) {
        }

        login.addClass('m-login--signin');
        (<any>login.find('.m-login__signin')).animateClass('flipInX animated');
    }

    /* employee next */
    static displayEmployeeNext() {
        let login = $('#m_login');
        login.removeClass('m-login--signin');
        login.removeClass('m-login--signup');
        login.removeClass('m-login--forget-password');
        login.removeClass('m-next-password');
        try {
            $('form').data('validator').resetForm();
        } catch (e) {
        }

        login.addClass('m-next-employee');
        (<any>login.find('.m-next-employee')).animateClass('flipInX animated');
    }

    static displayForgetPasswordForm() {
        let login = $('#m_login');
        login.removeClass('m-login--signin');
        login.removeClass('m-login--signup');
        login.removeClass('m-next-employee');
        login.removeClass('m-next-password');

        login.addClass('m-login--forget-password');
        (<any>login.find('.m-login__forget-password')).animateClass('flipInX animated');
    }

    /* password next */
    static displayPasswordFormNext() {
        let login = $('#m_login');
        login.removeClass('m-login--signin');
        login.removeClass('m-login--signup');
        login.removeClass('m-next-employee');
        login.removeClass('m-login--forget-password');

        login.addClass('m-next-password');
        (<any>login.find('.m-next-password')).animateClass('flipInX animated');
    }

    static handleFormSwitch() {
        $('#m_login_forget_password').click(function(e) {
            e.preventDefault();
            LoginCustom.displayForgetPasswordForm();
        });

        $('#m_login_forget_password_cancel').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignInForm();
        });

        $('#m_login_signup').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignUpForm();
        });

        $('#m_login_signup_cancel').click(function(e) {
            e.preventDefault();
            LoginCustom.displaySignInForm();
        });

    }

    static handleSignUpFormSubmit() {
        $('#m_login_signup_submit').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    name: {
                        required: true
                    },
                    phone: {
                      required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    },
                    password_confirmation: {
                        required: true
                    },
                    agree: {
                        required: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static handleForgetPasswordFormSubmit() {
        $('#m_login_forget_password_submit').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static handleEnterFormSubmit() {
        $('#m_enter_form_button').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    password: {
                        required: true
                    }
                }
            });
            if (!form.valid()) {
                e.preventDefault();
                return;
            }
        });
    }

    static init() {
        LoginCustom.handleFormSwitch();
        LoginCustom.handleSignInFormSubmit();
        LoginCustom.handleSignUpFormSubmit();
        LoginCustom.handleForgetPasswordFormSubmit();
        LoginCustom.handleEnterFormSubmit();
    }
}
