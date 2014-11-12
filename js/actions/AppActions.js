var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var i = 100;

    var _changeValue = function(value){
	    console.debug("AppActions._changeValue", value);
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_VALUE,
            value: value

        });
    };

	var _startAsyncUpdate = function(){
	    console.debug("AppActions._startAsyncUpdate");
        _changeValue("async value " + i++);
        setTimeout(function(){
		    _startAsyncUpdate();
        }, 1000);
    }

var AppActions = {
    changeValue: function(value){
        _changeValue(value);
    },
    startAsyncUpdate: function(){
	    console.debug("AppActions.startAsyncUpdate");
	    _startAsyncUpdate();
    }
};

module.exports = AppActions;