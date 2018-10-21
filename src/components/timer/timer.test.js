import React from 'react';
import Timer from './timer';
import sinon from 'sinon';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe("***** Timer Tests *****", function() {

    test('Timer renders', () => {
        const wrapper = shallow(<Timer />);
        expect(wrapper).not.toBeNull();
        expect('timer').not.toBeNull();
    });
    
    test('Counter Resets', () => {
    
        let getBoard = sinon.stub();
    
        const wrapper = shallow(<Timer getBoard={getBoard} />);
        wrapper.setState({
            nextUpdate: 0
        });
        wrapper.instance().tick();
    
        expect(wrapper).not.toBeNull();
        expect(wrapper.state('nextUpdate')).toBe(5000);
    });
    
    test('Counter decrements by 100', () => {
    
        let getBoard = sinon.stub();
    
        const wrapper = shallow(<Timer getBoard={getBoard} />);
        wrapper.setState({
            nextUpdate: 5000
        });
        wrapper.instance().tick();
    
        expect(wrapper).not.toBeNull();
        expect(wrapper.state('nextUpdate')).toBe(4900);
    });
    
});