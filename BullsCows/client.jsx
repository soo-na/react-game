const React = require('react');
const ReactDOM = require('react-dom');


const {hot} = require('react-hot-loader/root');
const BullsCows = require('./bullsCows');
const Hot = hot(BullsCows);

ReactDOM.render(<Hot/>, document.querySelector('#root'));