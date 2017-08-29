jQuery(function ($) {
    var eventCotainer = $('.event__container'),
        days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


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
                tabletContainer = eventCotainer.closest('.table__wrapper'),
                notEmptyEventContainer = tabletContainer.find('.event__container[data-subject="' + eventName + '"][data-day="' + eventDay + '"]:first');

            notEmptyEventContainer.height('fullHeight').nextAll().addClass('hidden');
            notEmptyEventContainer.prevAll().addClass('hidden');

            tabletContainer.find('.event__container[data-subject="' + eventName + '"][data-day="' + eventDay + '"]:not(:first)')
                .addClass('hovered__event');
        },
        function () {
            eventCotainer.removeClass('hovered__event hidden');
        }
    );

    if($(window).width() <= 678) {
        generateMobileTable();
    }

    $(window).resize(function () {
        if($(window).width() <= 678) {
            generateMobileTable();
        }
    });

    function generateMobileTable () {
        $.each(days, function (index, value) {
            var dayContainer = $('.small__table__day__subjects.' + value);
            dayContainer.children(':not(.hidden)').remove();
            $('.table__wrapper.active').find('.event__container:not(.empty)[data-day=' + value + ']').map(function (indx, element) {
                var subjectName = $(element).find('.subject__name').text(),
                    subjectTime = $(element).find('.hours__start').text() + ' - ' + $(element).find('.hours__end').text(),
                    newSubject = dayContainer.find('.small__table__subject__wrapper:first-child').clone().removeClass('hidden');

                newSubject.find('.small__subject__name').text(subjectName);
                newSubject.find('.small__subject__hours').text(subjectTime);
                dayContainer.append(newSubject[0].outerHTML);
            });
        });
    }


    $('[data-tab]').on('click', function () {
        if (!$(this).closest('li').hasClass('selected')) {
            $('.table__wrapper[data-content=' + $(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active');
        }

        if($(window).width() <= 678) {
            generateMobileTable();
        }
    })
});