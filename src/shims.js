/*
 * This module provides uniform
 * Shims APIs and globals that are not present in all JS environments,
 * the most common example for Strophe being browser APIs like WebSocket
 * and DOM that don't exist under nodejs.
 *
 * Usually these will be supplied in nodejs by conditionally requiring a
 * NPM module that provides a compatible implementation.
 */

/* global global */

/**
 * WHATWG WebSockets API
 * https://www.w3.org/TR/websockets/
 *
 * Interface to use the web socket protocol
 *
 * Used implementations:
 * - supported browsers: built-in in WebSocket global
 *   https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#Browser_compatibility
 * - nodejs: use standard-compliant 'ws' module
 *   https://www.npmjs.com/package/ws
 */
function getWebSocketImplementation () {
    let WebSocketImplementation = global.WebSocket
    if (typeof WebSocketImplementation === 'undefined') {
        try {
            WebSocketImplementation = require('ws');
        } catch (err) {
            throw new Error('You must install the "ws" package to use Strophe in nodejs.');
        }
    }
    return WebSocketImplementation
}
export const WebSocket = getWebSocketImplementation()
