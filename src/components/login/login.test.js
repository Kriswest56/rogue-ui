import React from 'react';
import axios from 'axios';
import Login from './login';
import enzyme, {shallow} from 'enzyme';
import {expect} from 'chai'
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe("***** Login Tests *****", function() {
    test('', () => {
        const wrapper = shallow(<Login/>);
        wrapper.setState({
            username: 'blah'
        });
        wrapper.instance().renderBoard();
        expect(wrapper).to.not.be.null;
    });

    test('', () => {
        const event = {
            target: {
                value: 'blahblah'
            }
        };
        const wrapper = shallow(<Login/>);
        expect(wrapper.state('username')).to.equal('');
        wrapper.instance().handleChange(event);
        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal('blahblah');
    });

    test('', () => {
        const wrapper = shallow(<Login/>);
        wrapper.setState({
            username: 'blah'
        });
        wrapper.instance().handleSubmit();
        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal('blah');
    });

});