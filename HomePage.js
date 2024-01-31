// HomePage.js
const React = require('react');

const HomePage = () => {
    return (
        React.createElement('div', null,
            React.createElement('h1', null, 'Welcome to My Home Page'),
            React.createElement('p', null, 'This is a simple home page for testing.')
        )
    );
};

module.exports = HomePage;
