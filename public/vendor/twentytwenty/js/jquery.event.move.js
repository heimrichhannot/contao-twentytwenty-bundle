(function() {
    const threshold = 8; // Schwellenwert für Bewegung
    const eventOptions = { bubbles: true, cancelable: true };

    function createEvent(type, properties = {}) {
        let event = new CustomEvent(type, eventOptions);
        Object.assign(event, properties);
        return event;
    }

    function triggerEvent(element, type, properties) {
        let event = createEvent(type, properties);
        element.dispatchEvent(event);
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function isPrimaryButton(e) {
        return e.button === 0 && !e.ctrlKey && !e.altKey;
    }

    function startMoveEvent(e) {
        if (!isPrimaryButton(e)) return;

        let startX = e.pageX, startY = e.pageY;
        let target = e.target;
        let active = true;

        function moveHandler(event) {
            let distX = event.pageX - startX;
            let distY = event.pageY - startY;

            if ((distX ** 2 + distY ** 2) < (threshold ** 2)) return;

            triggerEvent(target, "movestart", { startX, startY, pageX: event.pageX, pageY: event.pageY, distX, distY });
            document.removeEventListener("mousemove", moveHandler);
            document.addEventListener("mousemove", moveEvent);
            document.addEventListener("mouseup", endMoveEvent);
        }

        function moveEvent(event) {
            let distX = event.pageX - startX;
            let distY = event.pageY - startY;
            triggerEvent(target, "move", { startX, startY, pageX: event.pageX, pageY: event.pageY, distX, distY });
        }

        function endMoveEvent(event) {
            let distX = event.pageX - startX;
            let distY = event.pageY - startY;
            triggerEvent(target, "moveend", { startX, startY, pageX: event.pageX, pageY: event.pageY, distX, distY });
            document.removeEventListener("mousemove", moveEvent);
            document.removeEventListener("mouseup", endMoveEvent);
        }

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", function() {
            document.removeEventListener("mousemove", moveHandler);
        });
    }

    function startTouchEvent(e) {
        let touch = e.changedTouches[0];
        let startX = touch.pageX, startY = touch.pageY;
        let target = touch.target;

        function moveHandler(event) {
            let touchMove = event.changedTouches[0];
            let distX = touchMove.pageX - startX;
            let distY = touchMove.pageY - startY;

            if ((distX ** 2 + distY ** 2) < (threshold ** 2)) return;

            triggerEvent(target, "movestart", { startX, startY, pageX: touchMove.pageX, pageY: touchMove.pageY, distX, distY });
            document.removeEventListener("touchmove", moveHandler);
            document.addEventListener("touchmove", moveEvent);
            document.addEventListener("touchend", endMoveEvent);
        }

        function moveEvent(event) {
            let touchMove = event.changedTouches[0];
            let distX = touchMove.pageX - startX;
            let distY = touchMove.pageY - startY;
            triggerEvent(target, "move", { startX, startY, pageX: touchMove.pageX, pageY: touchMove.pageY, distX, distY });
        }

        function endMoveEvent(event) {
            let touchMove = event.changedTouches[0];
            let distX = touchMove.pageX - startX;
            let distY = touchMove.pageY - startY;
            triggerEvent(target, "moveend", { startX, startY, pageX: touchMove.pageX, pageY: touchMove.pageY, distX, distY });
            document.removeEventListener("touchmove", moveEvent);
            document.removeEventListener("touchend", endMoveEvent);
        }

        document.addEventListener("touchmove", moveHandler, { passive: false });
        document.addEventListener("touchend", function() {
            document.removeEventListener("touchmove", moveHandler);
        });
    }

    document.addEventListener("mousedown", startMoveEvent);
    document.addEventListener("touchstart", startTouchEvent, { passive: true });

})();
