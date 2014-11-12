/**
 * @jsx React.DOM
 */
var React = require('react');
var ValueStore = require('../stores/ValueStore');
var AppActions = require('../actions/AppActions');

function _getStateFromStore(){
    var v = ValueStore.getValue();
    console.debug("App.react._getStateFromStore", v);
    return {
        value: v,
    };
};

function _sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var App = React.createClass({
    getInitialState: function() { 
        return _getStateFromStore();
    },
    componentWillMount: function(){
        ValueStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        ValueStore.removeChangeListener(this._onChange);
    },
	componentWillUpdate: function(nextProps, nextState){
		console.debug("App.react.componentWillUpdate", nextProps, nextState);
	},
    _onChange : function(){
        this.setState(_getStateFromStore());
    },
    _updateValue: function(){
        AppActions.changeValue(0);
	},
    _startAsyncUpdate: function(){
        AppActions.startAsyncUpdate();
	},
    render: function() {
		var xs = this.state.value;
		console.debug("App.react.render 1", xs.length);

        if(xs[xs.length-1] === 0){
			console.debug("App.react.render 2", xs.length);
			_sleep(100000);
			console.debug("App.react.render 3", xs.length);
		}
		console.debug("App.react.render 4", xs);
		var xss = xs.map(function(x){return (<section>{x}</section>)}); 
        return (
            <div>
                <button onClick={this._updateValue}>Update value</button>
                <button onClick={this._startAsyncUpdate}>Start async update</button>
                <section>{xss}</section>
            </div>
        );
    }
});


module.exports = App;
