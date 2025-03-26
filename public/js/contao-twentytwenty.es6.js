import "../vendor/css/twentytwenty-no-compass.scss";


// Funktion zur Initialisierung
document.addEventListener("DOMContentLoaded", function () {
    twentyTwentyBundle.init();
});

const twentyTwentyBundle = {
    init: function () {
        this.initTwentyTwenty();
        this.initTwentyTwentyControl();
    },

    initTwentyTwenty: function () {
        document.querySelectorAll(".twentytwenty-container").forEach(container => {
            let isVertical = container.dataset.orientation === "vertical";

            let handle = document.createElement("div");
            handle.className = "twentytwenty-handle";
            handle.innerHTML = `<span class="twentytwenty-arrow"></span>`;
            container.appendChild(handle);




            handle.addEventListener("mousedown", startDragging);
            handle.addEventListener("touchstart", startDragging, { passive: true });

            function startDragging(event) {
                event.preventDefault();
                let rect = container.getBoundingClientRect();

                function moveHandle(e) {
                    let clientX = e.clientX || e.touches[0].clientX;
                    let percent = ((clientX - rect.left) / rect.width) * 100;
                    percent = Math.max(0, Math.min(100, percent));

                    handle.style.left = percent + "%";

                }

                function stopDragging() {
                    document.removeEventListener("mousemove", moveHandle);
                    document.removeEventListener("touchmove", moveHandle);
                    document.removeEventListener("mouseup", stopDragging);
                    document.removeEventListener("touchend", stopDragging);
                }

                document.addEventListener("mousemove", moveHandle);
                document.addEventListener("touchmove", moveHandle);
                document.addEventListener("mouseup", stopDragging);
                document.addEventListener("touchend", stopDragging);
            }
        });
    },

    initTwentyTwentyControl: function () {
        /*  let explanation = document.createElement("div");
          explanation.className = "alert alert-warning twentytwenty-explanation";
          explanation.innerText = "Mit gedrückter Maus nach links oder rechts schieben.";

          document.addEventListener("mouseover", function (event) {
              if (event.target.matches(".twentytwenty-handle") && !document.querySelector(".twentytwenty-explanation")) {
                  event.target.appendChild(explanation);
                  setTimeout(() => {
                      if (explanation.parentNode) explanation.parentNode.removeChild(explanation);
                  }, 3000);
              }
          });*/

        document.addEventListener("click", function (event) {
            if (event.target.matches(".twentytwenty-before-label")) {
                let wrapper = event.target.closest(".twentytwenty-wrapper");
                moveSlider(wrapper, 100);
            }
            if (event.target.matches(".twentytwenty-after-label")) {
                let wrapper = event.target.closest(".twentytwenty-wrapper");
                moveSlider(wrapper, 0);
            }
        });

        function moveSlider(wrapper, percent) {

            let handle = wrapper.querySelector(".twentytwenty-handle");
            let beforeImage = wrapper.querySelector("img.twentytwenty-before");

            // Setzt die Animation für den Handle
            handle.style.transition = "left 1.3s ease";
            handle.style.left = percent + "%";

            // Berechnet und aktualisiert das Clipping für das "before"-Bild
            beforeImage.style.transition = "clip-path 1.3s ease";
            beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;

            // Nach der Animation den Transition-Effekt wieder entfernen
            setTimeout(() => {
                handle.style.transition = "";
                beforeImage.style.transition = "";
            }, 500);
        }


    }
};

export default twentyTwentyBundle;
