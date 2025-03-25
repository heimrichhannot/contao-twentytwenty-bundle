(function() {
    window.twentyTwentyBundle = {
        init: function() {
            this.initTwentyTwenty();
            this.initTwentyTwentyControl();
        },

        initTwentyTwenty: function() {
            document.querySelectorAll(".twentytwenty-container").forEach(container => {
                let isVertical = container.getAttribute("data-orientation") === "vertical";
                new TwentyTwenty(container, {
                    default_offset_pct: 0.5,
                    orientation: isVertical ? "vertical" : "horizontal"
                });
            });
        },

        initTwentyTwentyControl: function() {
            const explanationHTML = '<div class="alert alert-warning twentytwenty-explanation">Mit gedrückter Maus nach links oder rechts schieben.</div>';

            document.querySelectorAll('.twentytwenty-handle').forEach(handle => {
                handle.style.left = "50%";
            });

            document.addEventListener('mouseenter', function(event) {
                if (event.target.classList.contains('twentytwenty-handle')) {
                    if (!document.querySelector('.twentytwenty-explanation') && !event.target.classList.contains('explained')) {
                        event.target.insertAdjacentHTML('beforeend', explanationHTML);
                        event.target.classList.add('explained');
                        setTimeout(() => {
                            let explanation = document.querySelector('.twentytwenty-explanation');
                            if (explanation) {
                                explanation.style.opacity = '0';
                                setTimeout(() => explanation.remove(), 500);
                            }
                        }, 3000);
                    }
                }
            });

            document.addEventListener('mousedown', () => this.checkHandle());
            document.addEventListener('touchstart', () => this.checkHandle());

            // WICHTIG: Hier `() => {}` nutzen, damit `this` sich auf `twentyTwentyBundle` bezieht
            document.addEventListener('click', event => {
                if (event.target.classList.contains('twentytwenty-before-label')) {
                    this.moveSlider('right');
                } else if (event.target.classList.contains('twentytwenty-after-label')) {
                    this.moveSlider('left');
                }
            });
        },

        checkHandle: function() {
            function update() {
                let handle = document.querySelector('.twentytwenty-handle');
                let beforeLabel = document.querySelector('.twentytwenty-before-label');
                let afterLabel = document.querySelector('.twentytwenty-after-label');
                let wrapper = document.querySelector('.twentytwenty-wrapper');

                if (!handle || !beforeLabel || !afterLabel || !wrapper) return;

                let left = handle.offsetLeft;
                let totalWidth = wrapper.clientWidth;

                if (left <= 100) {
                    beforeLabel.classList.add("push-down");
                } else {
                    beforeLabel.classList.remove("push-down");
                }

                if (left >= (totalWidth - 100)) {
                    afterLabel.classList.add("push-down");
                } else {
                    afterLabel.classList.remove("push-down");
                }

                let percent = (left / totalWidth) * 100;
                let beforeImage = document.querySelector("img.twentytwenty-before");
                if (beforeImage) {
                    beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
                }

                requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        },

        moveSlider: function(direction) {
            let handle = document.querySelector('.twentytwenty-handle');
            let beforeImage = document.querySelector('img.twentytwenty-before');
            let wrapper = document.querySelector('.twentytwenty-wrapper');

            if (!handle || !beforeImage || !wrapper) return;

            let totalWidth = wrapper.clientWidth;
            let targetPosition = direction === 'right' ? totalWidth : 0;

            handle.style.transition = "left 0.5s ease";
            handle.style.left = targetPosition + "px";

            beforeImage.style.transition = "clip-path 0.5s ease";
            beforeImage.style.clipPath = `inset(0 ${direction === 'right' ? 0 : 100}% 0 0)`;

            setTimeout(() => {
                handle.style.transition = "";
                beforeImage.style.transition = "";
            }, 500);
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        twentyTwentyBundle.init();
    });
})();
