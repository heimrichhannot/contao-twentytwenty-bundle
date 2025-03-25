document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".twentytwenty-container").forEach(container => {
    let isVertical = container.dataset.orientation === "vertical";
    let beforeImg = container.querySelector("img:first-child");
    let afterImg = container.querySelector("img:last-child");

    let wrapper = document.createElement("div");
    wrapper.className = `twentytwenty-wrapper twentytwenty-${isVertical ? "vertical" : "horizontal"}`;
    container.parentNode.insertBefore(wrapper, container);
    wrapper.appendChild(container);

    let overlay = document.createElement("div");
    overlay.className = "twentytwenty-overlay";
    overlay.innerHTML = `<div class="twentytwenty-before-label">Vorher</div>
                             <div class="twentytwenty-after-label">Nachher</div>`;
    container.appendChild(overlay);

    let handle = document.createElement("div");
    handle.className = "twentytwenty-handle";
    handle.innerHTML = `<span class="twentytwenty-${isVertical ? "down" : "left"}-arrow"></span>
                            <span class="twentytwenty-${isVertical ? "up" : "right"}-arrow"></span>`;
    container.appendChild(handle);

    beforeImg.classList.add("twentytwenty-before");
    afterImg.classList.add("twentytwenty-after");

    let sliderPct = 0.9; // Standardposition in der Mitte
    let offsetX = 0, offsetY = 0, imgWidth = 0, imgHeight = 0;
    let dragging = false;

    function calcOffset(dimensionPct) {
      let w = beforeImg.offsetWidth;
      let h = beforeImg.offsetHeight;
      return {
        w: w + "px",
        h: h + "px",
        cw: (dimensionPct * w) + "px",
        ch: (dimensionPct * h) + "px"
      };
    }

    function adjustContainer(offset) {
      if (isVertical) {
        beforeImg.style.clip = `rect(0, ${offset.w}, ${offset.ch}, 0)`;
      } else {
        beforeImg.style.clip = `rect(0, ${offset.cw}, ${offset.h}, 0)`;
      }
      container.style.height = offset.h;
    }

    function adjustSlider(pct) {
      let offset = calcOffset(pct);
      handle.style[isVertical ? "top" : "left"] = isVertical ? offset.ch : offset.cw;
      adjustContainer(offset);
    }

    function startDragging(event) {
      event.preventDefault();
      dragging = true;
      let rect = container.getBoundingClientRect();
      offsetX = rect.left;
      offsetY = rect.top;
      imgWidth = beforeImg.offsetWidth;
      imgHeight = beforeImg.offsetHeight;
    }

    function stopDragging() {
      dragging = false;
    }

    function moveSlider(event) {
      if (!dragging) return;

      let pageX = event.type.includes("touch") ? event.touches[0].pageX : event.pageX;
      let pageY = event.type.includes("touch") ? event.touches[0].pageY : event.pageY;

      sliderPct = isVertical ? (pageY - offsetY) / imgHeight : (pageX - offsetX) / imgWidth;
      sliderPct = Math.max(0, Math.min(1, sliderPct)); // Begrenzen auf 0-1
      adjustSlider(sliderPct);
    }

    handle.addEventListener("mousedown", startDragging);

    document.addEventListener("mousemove", moveSlider);
    document.addEventListener("touchmove", moveSlider, { passive: true });
    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
    adjustSlider(sliderPct);
  });
});
