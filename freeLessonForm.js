jQuery(function($){
    $("#phone").mask("+7 (999) 999-99-99");

    $("#submit__lesson__form").on('click', function () {
        $.ajax({
            type: "POST",
            url: "mailer.php",
            dataType: 'json', // oтвeт ждeм в json фoрмaтe
            data: $('.submit__free__lesson__form').serialize(),
            success: function(data){
                // eсли письмо отправлено
                if (!data['error']) {
                    // пoкaжeм сообщение
                    $('#message').html('<span class="zagolovok_bigk">Ваша заявка отправлена!</span>');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { // в случae нeудaчнoгo зaвeршeния зaпрoсa к сeрвeру
                alert(xhr.status); // пoкaжeм oтвeт сeрвeрa
                alert(thrownError); // и тeкст oшибки
            },
        });
    })
});