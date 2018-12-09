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
const DELETE = 88;
const ITEM_SWITCH = 80;
const ITEM_LEFT = 65;
const ITEM_UP = 87;
const ITEM_RIGHT = 68;
const ITEM_DOWN = 83;

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

    test('DELETE move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
        let actionHandler = sinon.spy();
        const event = {
            keyCode: DELETE,
            preventDefault: preventDefault
        }

        wrapper.instance().actionHandler = actionHandler;
        wrapper.instance().handleKeyDown(event);
        expect(actionHandler.calledOnce).to.be.true;
        wrapper.unmount();
    });

    test('ITEM_UP move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
        let useItem = sinon.spy();
        const event = {
            keyCode: ITEM_UP,
            preventDefault: preventDefault
        }

        wrapper.instance().useItem = useItem;
        wrapper.instance().handleKeyDown(event);
        expect(useItem.calledOnce).to.be.true;
        wrapper.unmount();
    });

    test('ITEM_DOWN move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
        let useItem = sinon.spy();
        const event = {
            keyCode: ITEM_DOWN,
            preventDefault: preventDefault
        }

        wrapper.instance().useItem = useItem;
        wrapper.instance().handleKeyDown(event);
        expect(useItem.calledOnce).to.be.true;
        wrapper.unmount();
    });

    test('ITEM_LEFT move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
        let useItem = sinon.spy();
        const event = {
            keyCode: ITEM_LEFT,
            preventDefault: preventDefault
        }

        wrapper.instance().useItem = useItem;
        wrapper.instance().handleKeyDown(event);
        expect(useItem.calledOnce).to.be.true;
        wrapper.unmount();
    });

    test('ITEM_RIGHT move gets set', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);
        let useItem = sinon.spy();
        const event = {
            keyCode: ITEM_RIGHT,
            preventDefault: preventDefault
        }

        wrapper.instance().useItem = useItem;
        wrapper.instance().handleKeyDown(event);
        expect(useItem.calledOnce).to.be.true;
        wrapper.unmount();
    });

    test('ITEM_SWITCH happens', () => {    
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        const event = {
            keyCode: ITEM_SWITCH,
            preventDefault: preventDefault
        }

        wrapper.instance().handleKeyDown(event);
        expect(wrapper.state('heldItem')).to.equal('fish');
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

    test('fish added when fishing towards water', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        wrapper.instance().state.heldItem = 'fish';
        wrapper.instance().state.moveChosen = false;
        wrapper.instance().state.direction = {left: '~'};
        wrapper.instance().state.fishAmount = 0;
        wrapper.instance().useItem('left');
        expect(wrapper.state('fishAmount')).to.equal(1);
    });

    test('fish not added when not fishing towards water', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        wrapper.instance().state.heldItem = 'fish';
        wrapper.instance().state.moveChosen = false;
        wrapper.instance().state.direction = {left: '.'};
        wrapper.instance().state.fishAmount = 0;
        wrapper.instance().useItem('left');
        expect(wrapper.state('fishAmount')).to.equal(0);
    });

    test('fish not added when movechosen is true', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        wrapper.instance().state.heldItem = 'fish';
        wrapper.instance().state.moveChosen = true;
        wrapper.instance().state.direction = {left: '~'};
        wrapper.instance().state.fishAmount = 0;
        wrapper.instance().useItem('left');
        expect(wrapper.state('fishAmount')).to.equal(0);
    });

    test('heldItem switches properly', () => {
        const wrapper = shallow(<Board 
                                    board={board}
                                    username={"Kris"}
                                />);

        wrapper.instance().switchHeldItem();
        expect(wrapper.state('heldItem')).to.equal('fish');
        wrapper.instance().switchHeldItem();
        expect(wrapper.state('heldItem')).to.equal('wand');
        wrapper.instance().switchHeldItem();
        expect(wrapper.state('heldItem')).to.equal('nothing');
    });
    
});