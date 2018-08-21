(function($) {
    window.twentyTwentyBundle = {
        init: function() {
            this.initTwentyTwenty();
            this.initTwentyTwentyControl();
        },
        initTwentyTwenty: function() {
            $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.5});
            $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.5, orientation: 'vertical'});
        },
        initTwentyTwentyControl: function() {
            var html = '<div class="alert alert-warning twentytwenty-explanation">Mit gedrückter Maus nach links oder rechts schieben.</div>';
            $(document).find('.twentytwenty-handle').css({"left": "50%"});

            $(document).on('mouseenter', '.twentytwenty-handle', function () {
                if ($(document).find('.twentytwenty-explanation').length == 0) {
                    if (!$(this).hasClass('explained')) {
                        $(this).append(html);
                        $(this).addClass('explained');
                        setTimeout(function () {
                            $(document).find('.twentytwenty-explanation').fadeOut(500, function () {
                                $(document).find('.twentytwenty-explanation').remove();

                            });
                        }, 3000);
                    }
                }
            });

            $(document).on('mousedown touchstart', '.twentytwenty-handle', function () {
                checkHandle();
            });


            function checkHandle() {
                var totalWidth = $('.twentytwenty-wrapper').width();

                var interval = setInterval(function () {
                    var left = $(document).find('.twentytwenty-handle').position().left;
                    if (left <= 100) {

                        $(document).find('.twentytwenty-before-label').addClass('push-down');
                    }
                    else if (left >= (totalWidth - 100)) {
                        $(document).find('.twentytwenty-after-label').addClass('push-down');
                    }
                    else {
                        $(document).find('.push-down').removeClass('push-down');
                    }

                }, 2);
            }

            $(document).on('click', '.twentytwenty-before-label', function () {
                var totalWidth = $('.twentytwenty-wrapper').width();

                $('.twentytwenty-handle').animate({"left": totalWidth}, 500);
            });

            $(document).on('click', '.twentytwenty-after-label', function () {
                $('.twentytwenty-handle').animate({"left": "0px"}, 500);
            });

            $(document).on('click', '.twentytwenty-before-label, .twentytwenty-after-label', function () {
                checkHandle();
                var totalWidth = $('.twentytwenty-wrapper').width();
                var interval = setInterval(function () {
                    var handlePos = $('.twentytwenty-handle').css('left');
                    $('img.twentytwenty-before').css({"clip": "rect(0px " + handlePos + " 503px 0px)"});

                    if (handlePos == "0px" || handlePos == totalWidth) {
                        clearInterval(handlePos);
                    }
                }, 1);
            });
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        twentyTwentyBundle.init();
    });
})(jQuery);