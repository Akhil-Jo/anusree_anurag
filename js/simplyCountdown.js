(function(exports) {
    'use strict';

    var extend,
        createElements,
        createCountdownElt,
        simplyCountdown;

    extend = function(out) {
        var i,
            obj,
            key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    createCountdownElt = function(countdown, parameters, typeClass) {
        var innerSectionTag,
            sectionTag,
            amountTag,
            wordTag,
            valueTag;

        sectionTag = document.createElement('div');
        amountTag = document.createElement('span');
        wordTag = document.createElement('span');
        valueTag = document.createElement('span');
        innerSectionTag = document.createElement('div');

        innerSectionTag.appendChild(amountTag);
        innerSectionTag.appendChild(wordTag);
        innerSectionTag.appendChild(valueTag);
        sectionTag.appendChild(innerSectionTag);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);
        valueTag.classList.add(parameters.valueClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag,
            value: valueTag
        };
    };

    createElements = function(parameters, countdown) {
        var spanTag;

        if (!parameters.inline) {
            return {
                days: createCountdownElt(countdown, parameters, 'simply-days-section'),
                hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
                minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
                seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
            };
        }

        var container = document.createElement('div');
        container.classList.add(parameters.inlineClass);

        var digitContainer = document.createElement('div');
        digitContainer.classList.add(parameters.inlineClass);
        container.appendChild(digitContainer);

        spanTag = document.createElement('span');
        spanTag.classList.add(parameters.wordClass);
        container.appendChild(spanTag);

        var valueTag = document.createElement('span');
        container.appendChild(valueTag);

        countdown.appendChild(container);

        return {
            container: container,
            digit: spanTag,
            text: digitContainer,
            value: valueTag
        };
    };

    simplyCountdown = function(elt, args) {
        var parameters = extend({
            year: 2024,
            month: 1,
            day: 14,
            hours: 12,
            minutes: 0,
            seconds: 0,
            enableUtc: true,
            refresh: 1000,
            inline: false,
            inlineClass: 'simply-countdown-inline',
            sectionClass: 'simply-section',
            amountClass: 'simply-amount',
            wordClass: 'simply-word',
            valueClass: 'simply-value',
            zeroPad: false,
            words: {
                days: 'Days',
                hours: 'Hours',
                minutes: 'Minutes',
                seconds: 'Seconds'
            },
            onEnd: function() {
                console.log('Countdown ended!');
            }
        }, args);

        var interval,
            targetDate,
            targetTmpDate,
            now,
            nowUtc,
            secondsLeft,
            days,
            hours,
            minutes,
            seconds,
            cd = document.querySelectorAll(elt);

        targetTmpDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        if (parameters.enableUtc) {
            targetDate = new Date(
                targetTmpDate.getUTCFullYear(),
                targetTmpDate.getUTCMonth(),
                targetTmpDate.getUTCDate(),
                targetTmpDate.getUTCHours(),
                targetTmpDate.getUTCMinutes(),
                targetTmpDate.getUTCSeconds()
            );
        } else {
            targetDate = targetTmpDate;
        }

        Array.prototype.forEach.call(cd, function(countdown) {
            var fullCountDown = createElements(parameters, countdown);

            var refresh = function() {
                now = new Date();
                if (parameters.enableUtc) {
                    nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000); // Adjust to UTC
                    secondsLeft = (targetDate - nowUtc.getTime()) / 1000;
                } else {
                    secondsLeft = (targetDate - now.getTime()) / 1000;
                }

                if (secondsLeft > 0) {
                    days = parseInt(secondsLeft / 86400, 10);
                    secondsLeft %= 86400;

                    hours = parseInt(secondsLeft / 3600, 10);
                    secondsLeft %= 3600;

                    minutes = parseInt(secondsLeft / 60, 10);
                    seconds = parseInt(secondsLeft % 60, 10);
                } else {
                    days = 0;
                    hours = 0;
                    minutes = 0;
                    seconds = 0;
                    window.cancelAnimationFrame(interval); // Stop the animation frame loop
                    parameters.onEnd();
                }

                // Update the countdown display
                if (parameters.inline) {
                    // Updated display for inline mode
                    fullCountDown.container.innerHTML =
                        '<div>' + days + '<br><span>' + parameters.words.days + '</span></div>' +
                        '<div>' + hours + '<br><span>' + parameters.words.hours + '</span></div>' +
                        '<div>' + minutes + '<br><span>' + parameters.words.minutes + '</span></div>' +
                        '<div>' + seconds + '<br><span>' + parameters.words.seconds + '</span></div>';

                    // For inline display, update the content of the valueTag
                    fullCountDown.container.style.display = 'flex';
                    fullCountDown.value.textContent = days;
                } else {
                    // Existing code for non-inline mode
                    fullCountDown.days.amount.textContent = (parameters.zeroPad && days < 10 ? '0' : '') + days;
                    fullCountDown.hours.amount.textContent = (parameters.zeroPad && hours < 10 ? '0' : '') + hours;
                    fullCountDown.minutes.amount.textContent = (parameters.zeroPad && minutes < 10 ? '0' : '') + minutes;
                    fullCountDown.seconds.amount.textContent = (parameters.zeroPad && seconds < 10 ? '0' : '') + seconds;

                    // Update labels for non-inline mode
                    fullCountDown.days.word.textContent = parameters.words.days;
                    fullCountDown.hours.word.textContent = parameters.words.hours;
                    fullCountDown.minutes.word.textContent = parameters.words.minutes;
                    fullCountDown.seconds.word.textContent = parameters.words.seconds;
                }

                // Request the next animation frame
                interval = window.requestAnimationFrame(refresh);
            };

            // Start the animation frame loop
            interval = window.requestAnimationFrame(refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;
}(window));

if (window.jQuery) {
    (function($, simplyCountdown) {
        'use strict';

        function simplyCountdownify(el, options) {
            simplyCountdown(el, options);
        }

        $.fn.simplyCountdown = function(options) {
            return simplyCountdownify(this.selector, options);
        };
    }(jQuery, window.simplyCountdown));
}
