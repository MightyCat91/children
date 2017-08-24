jQuery(function($){
    $("#phone").mask("+7 (999) 999-99-99");

    $("#submit__lesson__form").on('click', function () {
        $.ajax({
            type: "POST",
            url: "mailer.php",
            dataType: 'json', // o��e� ��e� � json �o��a�e
            data: $('.submit__free__lesson__form').serialize(),
            success: function(data){
                // e��� ������ ����������
                if (!data['error']) {
                    // �o�a�e� ���������
                    $('#message').html('<span class="zagolovok_bigk">���� ������ ����������!</span>');
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { // � ����ae �e��a��o�o �a�e��e��� �a��o�a � �e��e��
                alert(xhr.status); // �o�a�e� o��e� �e��e�a
                alert(thrownError); // � �e��� o�����
            },
        });
    })
});