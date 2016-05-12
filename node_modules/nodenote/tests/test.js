/**
 * Mocha unit tests
 */
var nodeNote = require('../index.js');
var mocha = require('mocha');
var assert = require('assert');

describe('nodeNote object', function() {
    // nodenote should be a valid object
    it('nodenote should be a valid object', function() {
        assert.ok(typeof nodeNote == 'object');
    });

    var NotificationName = 'test1';
    var userInfo = {'note-name':NotificationName};
    var payload = {'foo':'bar'};

    // test both observer and the instance
    it('add observer successfully', function() {
        nodeNote.addObserver(NotificationName, Observer1);
    });

    // test one notification sent with no error
    it('send notification successfully', function() {
        nodeNote.sendNotification(NotificationName, payload, userInfo);
    });


    // observer
    var Observer1 = function(note) {
        describe('notification object', function() {
            it('notification should be a valid object', function() {
                assert.ok(typeof note == 'object');
            });
            // test note is notification object so it has properties
            it('notification object has property name', function () {
                assert.ok(note.hasOwnProperty('name'));
            });
            it('notification object has function getUserInfo', function () {
                assert.ok(typeof note.getUserInfo == 'function');
            });
            // test user info
            it('user info should match', function() {
                assert.equal(note.userInfo, userInfo);
            });
            // test payload
            it('payload should match', function() {
                assert.equal(note.object, payload);
            });
        });
    };

});

