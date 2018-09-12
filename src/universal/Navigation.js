import React from 'react';
import Landing from '../universal/components/Landing';

module.exports.navigate = function(page) {
    
    switch (page) {
        case 'landing':
            return <Landing />;

        default:
            return null
    }

}