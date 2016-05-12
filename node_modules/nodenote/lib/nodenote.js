/**
 * Default entry
 * node notification system
 * NOTE: it will keep running until it reaches the timeout setting (default 30 seconds) or all is done
 */
var note = {};

// notification object
var notification = require('./model/notification');

notification.verbose = false;

// notification cache
note.notifications = {};

// observers

/**
 * default observer to catch all
 * if there, will catch all - so don't need to set individual ones
 * @param note
 */
note.defaultObserver = function(note) {};

note.observers = {};

/**
 * observer add
 * @param NotificationName
 * @param callback
 */
note.addObserver = function(NotificationName, callback)
{
    if (typeof callback == 'undefined') {
        return;
    }

    if (!note.observers[NotificationName]) {
        note.observers[NotificationName] = [];
    }
    // supports multiple callbacks
    note.observers[NotificationName].push(callback);

};

note.setDefaultObserver = function(callback)
{
    note.defaultObserver = callback;

};

/**
 * remove all callbacks for a notification name from observer
 * @param NotificationName
 */
note.removeObserver = function(NotificationName)
{
    note.observers[NotificationName] = [];

};

// push notifications

/**
 * send out notification
 * we don't worry about catching them here, it will be done
 * by observer
 * @param name
 * @param object
 * @param userinfo
 */
note.sendNotification = function(name, object, userinfo)
{
    note.notifications[name] = notification.create(name, object, userinfo);

    // loop and catch notifications
    while(note.shouldRun()) {
        note.process();
    }

};

// controls

note.shouldRun = function()
{
    if (Object.keys(note.notifications).length <= 0) {
        if (note.verbose) console.log('No notification found, exiting');
        return false;
    }

    return true;
};

/**
 * find callbacks and run them
 */
note.process = function()
{
    if (note.verbose) console.log('Existing Notifications:', note.notifications);
    for (var name in note.notifications) {
        if (!note.observers[name]) {
            note.defaultObserver(note.notifications[name]);
        } else {
            var callbacks = note.observers[name];
            if (callbacks.length > 0) {
                for (var i in callbacks) {
                    var callback = callbacks[i];
                    if (typeof callback != 'undefined') {
                        callback(note.notifications[name]);
                    }
                }
            }
        }
        // remove notification - after loop
        delete note.notifications[name];
    }

};


module.exports = note;


