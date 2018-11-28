import React from 'react';
import Timer from './timer';
import sinon from 'sinon';
import enzyme, {shallow} from 'enzyme';
import {expect} from 'chai'
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe("***** Timer Tests *****", function() {

    test('Timer renders', () => {
        const wrapper = shallow(<Timer />);
        expect(wrapper).to.not.be.null;
        wrapper.find('timer').exists();
    });
    
    test('Counter Resets', () => {
    
        let getBoard = sinon.stub();
    
        const wrapper = shallow(<Timer turnDelay={5000} getBoard={getBoard} />);
        wrapper.setState({
            nextUpdate: 0
        });
        wrapper.instance().tick();
    
        expect(wrapper).to.not.be.null;
        expect(wrapper.state('nextUpdate')).to.equal(5000);
    });
    
    test('Counter decrements by 100', () => {
    
        let getBoard = sinon.stub();
    
        const wrapper = shallow(<Timer getBoard={getBoard} />);
        wrapper.setState({
            nextUpdate: 5000
        });
        wrapper.instance().tick();
    
        expect(wrapper).to.not.be.null;
        expect(wrapper.state('nextUpdate')).to.equal(4900);
    });
    
});