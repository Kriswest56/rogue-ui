import React from 'react';
import Board from './board';
import sinon from 'sinon';
import enzyme, {shallow} from 'enzyme';
import {expect} from 'chai'
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

const board = [".....................","....#................",".....................","....~................",".....................",".....................",".....................",".....................",".....................",".....................",
               ".....................","....#................",".....................","....~................",".....................",".....................",".....................",".....................",".....................",".....................","....................."];
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40; 

const preventDefault = sinon.stub();

describe("***** Board Tests *****", function() {

    test('Board renders', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
                                
        expect(wrapper).to.not.be.null;
        expect('board').to.not.be.null;
    });
    
    test('ARROW_LEFT move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ARROW_LEFT,
            preventDefault: preventDefault
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(true);
        wrapper.unmount();
    });

    test('ARROW_UP move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ARROW_UP,
            preventDefault: preventDefault
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(true);
        wrapper.unmount();
    });

    test('ARROW_RIGHT move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ARROW_RIGHT,
            preventDefault: preventDefault
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(true);
        wrapper.unmount();
    });

    test('ARROW_DOWN move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ARROW_DOWN,
            preventDefault: preventDefault
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(true);
        wrapper.unmount();
    });

    test('Invalid move does not get set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: 1
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.unmount();
    });

    test('moveChosen resets to false when component refreshed', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ARROW_DOWN,
            preventDefault: preventDefault
        }

        expect(wrapper.state('moveChosen')).to.equal(false);
        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('moveChosen')).to.equal(true);

        wrapper.instance().setState({
            board: board
        });

        expect(wrapper.state('moveChosen')).to.equal(false);
    });

});