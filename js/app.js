/**
 * @jsx React.DOM
 */

var React = require('react');

var App = require('./components/App.react');

React.renderComponent(
   <div><App id={1}/><App id={2}/></div>,
    document.getElementById('content')
);

