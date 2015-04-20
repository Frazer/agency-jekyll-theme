$(function() {

    $('#contactForm').find('input,textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // disable submit button
            $form.find(":submit").attr("disabled", true);
            // prevent default submit behaviour
            event.preventDefault();
            // get name
            var name = $("input[name=name]").val();
            // set subject
            $("input[name=_subject]").val('frazerk.net contact - ' + name);
            // set name to first name
            if (name.indexOf(' ') >= 0) {
                name = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: '//formspree.io/frazker@frazerk.net',
                method: 'POST',
                dataType: 'json',
                data: $form.serialize(),
                cache: false,
                success: function() {
                    // success message
                    $('#success').html('<div class="alert alert-success">');
                    $('#success > .alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
                    $('#success > .alert-success').append('<strong>Your message has been sent. </strong>');
                    $('#success').append('</div>');
                    // clear all fields
                    $('#contactForm').trigger('reset');
                    // enable submit button
                    $form.find(":submit").removeAttr("disabled");
                },
                error: function() {
                    // fail message
                    $('#success').html('<div class="alert alert-danger">');
                    $('#success > .alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>');
                    $('#success > .alert-danger').append('<strong>Sorry ' + firstName + ', it seems that my mail server is not responding. Please try again later!');
                    $('#success').append('</div>');
                    // enable submit button
                    $form.find(":submit").removeAttr("disabled");
                }
            })
        },
        filter: function() {
            return $(this).is(':visible');
        }
    });

    // reset errors
    $('#contactForm').find('input,textarea').focus(function() {
        $('#success').html('');
    });

});
