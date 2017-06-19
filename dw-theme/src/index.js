// accept update of dependency
if (module.hot) {
    module.hot.accept();
    console.log('Webpack 2 with HMR.....');
}

require('./scss/main.scss');
require('./js');

