var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _value = ["some value..."];

var CHANGE_EVENT = 'change';

var ValueStore = assign({}, EventEmitter.prototype, {
    getValue: function(){
        console.debug("ValueStore.getValue", _value);
        return _value;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // Register to handle all updates
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.CHANGE_VALUE:
            console.debug("ValueStore dispatcher callback", action.value);
            _value.push(action.value);
                break;
            default:
                return true;
        }
        ValueStore.emitChange();
        return true;
    })

});

module.exports = ValueStore;
