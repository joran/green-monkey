var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var ValueStore  = function(){
	assign(this, EventEmitter.prototype);
    var thiz = this;

	var _value = ["some intial value"];

    // Register to handle all updates
    thiz.dispatcherIndex = AppDispatcher.register(function(payload) {
        var action = payload.action;
        switch(action.actionType){
            case AppConstants.CHANGE_VALUE:
            _value.push(action.value);
            console.debug("ValueStore dispatcher callback ", action.value, _value);
                break;
            default:
                return true;
        }
        thiz.emit(CHANGE_EVENT);
        return true;
    })

    thiz.getOnValueChangedCallback = function(that){
        if(!that.onValueChangedInStoreCallback){
		    that.onValueChangedInStoreCallback = function(){
				console.log("ValueStore.getOnValueChangedCallback default callback", that.props.id);
				that.forceUpdate();
			};
		}
		return that.onValueChangedInStoreCallback;
	};
	
    return {
		dispatcherIndex: thiz.dispatcherIndex,

		getValue: function(){
			return _value;
		},
		mixin: {
			componentDidMount: function() {
				console.log(" ValueStore.mixin.componentDidMount", this.props.id)
				thiz.on(CHANGE_EVENT, thiz.getOnValueChangedCallback(this));
			},
			componentWillUnmount: function() {
				console.log(" ValueStore.mixin.componentWillUnmount", this.props.id)
				thiz.removeListener(CHANGE_EVENT, thiz.getOnValueChangedCallback(this));
			},
            dispatcherIndex: thiz.dispatcherIndex
		}
	}

}();

module.exports = ValueStore;
