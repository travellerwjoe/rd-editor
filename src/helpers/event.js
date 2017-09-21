/**
 * 触发事件
 * @param {object} el 
 * @param {string} eventName 
 */
export function triggerEvent(el, eventName) {
    var event;
    if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, true, true);
    } else if (document.createEventObject) {// IE < 9
        event = document.createEventObject();
        event.eventType = eventName;
    }
    event.eventName = eventName;
    if (el.dispatchEvent) {
        el.dispatchEvent(event);
    } else if (el.fireEvent && window.htmlEvents && window.htmlEvents['on' + eventName]) {// IE < 9
        el.fireEvent('on' + event.eventType, event);// can trigger only real event (e.g. 'click')
    } else if (el[eventName]) {
        el[eventName]();
    } else if (el['on' + eventName]) {
        el['on' + eventName]();
    }
}

/**
 * 添加事件
 * @param {object} el 
 * @param {string} type 
 * @param {function} handler 
 */
export function addEvent(el, type, handler) {
    if (el.addEventListener) {
        el.addEventListener(type, handler, false);
    } else if (el.attachEvent && window.htmlEvents && window.htmlEvents['on' + type]) {// IE < 9
        el.attachEvent('on' + type, handler);
    } else {
        el['on' + type] = handler;
    }
}

/**
 * 移除事件
 * @param {object} el 
 * @param {string} type 
 * @param {function} handler 
 */
export function removeEvent(el, type, handler) {
    if (el.removeventListener) {
        el.removeEventListener(type, handler, false);
    } else if (el.detachEvent && window.htmlEvents && window.htmlEvents['on' + type]) {// IE < 9
        el.detachEvent('on' + type, handler);
    } else {
        el['on' + type] = null;
    }
}