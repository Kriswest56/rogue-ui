import React from 'react';
import ReactDOMServer from 'react-dom/server';

const {navigate} = require('../universal/Navigation');

module.exports.pageHandler = function(request, h, pageName) {

    let page = navigate(pageName);

    const body = ReactDOMServer.renderToString(
        <div>
            {page}
        </div>
    )

    return h.view('index.hbs', {body});
}
