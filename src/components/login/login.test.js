import React from 'react';
import Login from './login';
import enzyme, {shallow} from 'enzyme';
import {expect} from 'chai'
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

enzyme.configure({ adapter: new Adapter() });

describe("***** Login Tests *****", function() {

    test('renderBoard passes when board is rendered on login', () => {
        const wrapper = shallow(<Login/>);
        wrapper.setState({
            username: 'blah'
        });
        wrapper.instance().renderBoard();
        expect(wrapper).to.not.be.null;
    });

    test('username is set equal to a name', () => {
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

    test('async handleSubmit passes', async () => {
        const setUserName = sinon.spy();
        const wrapper = shallow(<Login 
                                    setUserName={setUserName}
                                />);
        wrapper.setState({
            username: 'blah'
        });
        await wrapper.instance().handleSubmit();
        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal('blah');
        expect(setUserName.calledOnce).to.be.true;
    });

});