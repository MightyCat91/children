jQuery(function($){
    $("#phone").mask("+7 (999) 999-99-99");

    $('#submit__lesson__form').on('click', function (event) {
        var formData = {
            'name'     : $('input[name=name]').val(),
            'email'    : $('input[name=email]').val(),
            'phone'    : $('input[name=phone]').val(),
            'children' : $('input[name=child__name]').val() + ' ' + $('input[name=child__surname]').val(),
            'birthday' : $('input[name=day]').val() + '/' + $('input[name=month]').val() + '/' + $('input[name=year]').val(),
            'subject'  : $('input[name=subject]').val()
        };
        $.ajax({
            type: "POST",
            url: "mailer.php",
            data: formData,
            success: function(data){
                $('.submit__free__lesson__form input:not(#submit__lesson__form)').val('');
                $('.submit__message').html(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
            }
        });
        event.preventDefault();
    })
});