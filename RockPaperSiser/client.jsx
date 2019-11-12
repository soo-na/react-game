const React = require('react');
const ReactDOM = require('react-dom');

const {hot} = require('react-hot-loader/root');
const rockPaperSiser = require('./rockPaperSiser');
const Hot = hot(rockPaperSiser);

ReactDOM.render(<Hot/>, document.querySelector('#root'));