// index.js
const React = require('react');
const { createRoot } = require('react-dom/client');
const HomePage = require('./src/HomePage'); // Adjust the path based on your file structure
const { JSDOM } = require('jsdom');

// Create a virtual DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Ensure the target container is a DOM element
const rootContainer = dom.window.document.createElement('div');
rootContainer.id = 'root';
dom.window.document.body.appendChild(rootContainer);

const root = createRoot(rootContainer);

// Render your React component
root.render(
    React.createElement(React.StrictMode, null, React.createElement(HomePage, null))
);
