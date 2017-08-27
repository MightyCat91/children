jQuery(function ($) {
    var eventCotainer = $('.event__container');

    $('.timetable__table tr').each(function () {
        var rowHeight = $(this).innerHeight();
        $(this).children('td').height(rowHeight);
    });


    $('#selected__age').hover(
        function () {
            $('.age__tabs').removeClass('hidden');
        },
        function () {
            $('.age__tabs').addClass('hidden');
        }
    );

    $('.age__tabs li').on('click', function () {
        $('.showed__age').text($(this).children('a').attr('title'));
        $('.age__tabs li').removeClass('selected');
        $(this).addClass('selected');
        $('.age__tabs').addClass('hidden');
    });

    eventCotainer.hover(
        function () {
            var eventName = $(this).data('subject'),
                eventDay = $(this).data('day'),
                notEmptyEventContainer = eventCotainer.filter('[data-subject="' + eventName + '"][data-day="' + eventDay + '"]:first');

            notEmptyEventContainer.height('fullHeight').next().addClass('hidden');
            notEmptyEventContainer.prev().addClass('hidden');

            eventCotainer
                .filter('[data-subject="' + eventName + '"][data-day="' + eventDay + '"]:not(:first)')
                .addClass('hovered__event');
        },
        function () {
            eventCotainer.removeClass('hovered__event hidden');
        }
    )
});