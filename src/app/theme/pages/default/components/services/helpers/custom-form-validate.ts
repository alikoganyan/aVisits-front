export class CustomFormValidate {

    static handleFormGroupService() {
        $('#formServiceService-button').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    name: {
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

    static handleFormCategoryService() {
        $('#formServiceService-button').click(function(e) {
            let btn = $(this);
            let form = $(this).closest('form');
            form.validate({
                rules: {
                    name: {
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
        CustomFormValidate.handleFormGroupService();
        CustomFormValidate.handleFormCategoryService();
    }
}

