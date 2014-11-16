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
    mixins: [ValueStore.mixin],

	componentWillUpdate: function(nextProps, nextState){
		console.debug("App.react.componentWillUpdate", this.props.id, nextProps, nextState, ValueStore.getValue());
	},
    _updateValue: function(){
        AppActions.changeValue(this.props.id);
	},
    _startAsyncUpdate: function(){
        AppActions.startAsyncUpdate();
	},

	componentDidMount: function(){
		console.debug("App.react.componentDidMount", this.props.id);
	},
// Uncomment this to use custom callback when the value is changed in the store 
/*
    onValueChangedInStoreCallback: function(){
		console.log("onValueChangedInStoreCallback", this.props.id);
		this.forceUpdate();
    },
*/

    render: function() {
		var xs = ValueStore.getValue();
		console.debug("App.react.render (1)", this.props.id, xs, ValueStore.dispatcherIndex);
		_sleep(10000);

		console.debug("App.react.render (2)", this.props.id, xs);
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
