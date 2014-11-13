var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

/*
var Store  = function(){
	assign(this, EventEmitter.prototype);
	var self = this;
    this._value =  ["some initial value..."];
    this.changeCallbacks = {};

    self.getValue = function(){
        console.debug("Store.getValue", self._value);
        return self._value;
    },

    self.emitChange = function() {
        self.emit(CHANGE_EVENT);
    };

    self.addChangeListener = function(callback) {
        self.on(CHANGE_EVENT, callback);
    };

    self.removeChangeListener = function(callback) {
        self.removeListener(CHANGE_EVENT, callback);
    };

    self.onChangeFun = function(that){
        if (!self.changeCallbacks[that]){
			self.changeCallbacks[that] = function(){
				that.setState({value: self._value});
			};
		}
		return self.changeCallbacks[that];
	}

    self.mixin = {
        getValue : function(){self.getValue();},
	    componentDidMount: function() {
			self.addChangeListener(self.onChangeFun(this));
		},
		componentWillUnmount: function() {
			self.removeChangeListener(self.onChangeFun(this));
		}
	}

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.CHANGE_VALUE:
            console.debug("Store dispatcher callback", action.value);
            self._value.push(action.value);
                break;
            default:
                return true;
        }
        self.emitChange();
        return true;
    })

    return self;
};
*/

var Store  = function(){
	assign(this, EventEmitter.prototype);
	var self = this;
    this.changeCallbacks = {};

    emitChange = function() {
        self.emit(CHANGE_EVENT);
    };

    self.addChangeListener = function(callback) {
        self.on(CHANGE_EVENT, callback);
    };

    self.removeChangeListener = function(callback) {
        self.removeListener(CHANGE_EVENT, callback);
    };

    self.onChangeFun = function(that){
        if (!self.changeCallbacks[that]){
			self.changeCallbacks[that] = that.onChangeCallback;
		}
		return self.changeCallbacks[that];
	}

    self.mixin = {
	    componentDidMount: function() {
			self.addChangeListener(self.onChangeFun(this));
		},
		componentWillUnmount: function() {
			self.removeChangeListener(self.onChangeFun(this));
		}
	}
	assign(self.prototype, {onChangeFun:self.onChangeFun}, EventEmitter.prototype);

};

var ValueStore  = function(){
	assign(this, Store.prototype,EventEmitter.prototype);
	var self = this;
    
	this._value =  ["some other initial value..."];

    self.getValue = function(){
        console.debug("ValueStore.getValue", self._value);
        return self._value;
    },

	self.onChangeCallback =  function(){
		that.setState({value: self._value});
	};

    self.mixin = assign({}, Store.mixin,{
        getValue : function(){self.getValue();},
	})

    emitChange = function() {
        self.emit(CHANGE_EVENT);
    };

    // Register to handle all updates
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.CHANGE_VALUE:
            console.debug("ValueStore dispatcher callback", action.value);
            self._value.push(action.value);
                break;
            default:
                return true;
        }
        self.emitChange();
        return true;
    })
    
    return self;
}();

module.exports = ValueStore;
