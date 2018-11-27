import React from 'react';
import Landing from './landing';
import enzyme, {mount, shallow} from 'enzyme';
import {expect} from 'chai'
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe("***** Landing Tests *****", function() {

    test('Landing renders with login page', () => {
        const wrapper = mount(<Landing />);
        expect(wrapper).to.not.be.null;
        wrapper.find('loginForm').exists();
        wrapper.find('board').exists();
    });
    
    test('Landing renders with board', () => {
        const wrapper = mount(<Landing />);
        wrapper.setState({
            username: "Kris",
            countdown: 5,
            gameStarted: true,
            board: ["@.........\n....#.....\n....%.....\n....~.....\n.....T....\n..........\n..........\n..........\n..........\n..........\n"]
        })
    
        expect(wrapper).to.not.be.null;
        wrapper.find('piece-ground').exists();
        wrapper.find('piece-player').exists();
        wrapper.find('piece-wall').exists();
        wrapper.find('piece-water').exists();
        wrapper.find('piece-fog').exists();
        wrapper.find('piece-tree').exists();
    });

    test('Username and Board get set', () => {
        const wrapper = shallow(<Landing />);

        let data = {
            board : "@.........\n....#.....\n..........\n....~.....\n..........\n..........\n..........\n..........\n..........\n..........\n",
            nextUpdate : 4360
        }

        wrapper.instance().setUserName("Kris", data);

        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal("Kris");
        expect(wrapper.state('board')).to.eql(["@.........","....#.....","..........","....~.....","..........","..........","..........","..........","..........","..........",""]);
        expect(wrapper.state('gameStarted')).to.equal(true);
        expect(wrapper.state('nextUpdate')).to.equal(4360);
    });

    test('Invalid board data returns error', () => {
        const wrapper = shallow(<Landing />);

        let data = {
            board : "",
            nextUpdate : 4360
        }
        
        wrapper.instance().setUserName("Kris", data);

        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal("Kris");
        expect(wrapper.state('board')).to.eql(["Error................"]);
        expect(wrapper.state('gameStarted')).to.equal(true);
        expect(wrapper.state('nextUpdate')).to.equal(4360);
    });

    test('No data object error', () => {
        const wrapper = shallow(<Landing />);

        let data = {};
        
        wrapper.instance().setUserName("Kris", data);

        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal("Kris");
        expect(wrapper.state('board')).to.eql(["Error................"]);
        expect(wrapper.state('gameStarted')).to.equal(true);
        expect(wrapper.state('nextUpdate')).to.equal(5000);
    });

    test('No data object error', () => {
        const wrapper = shallow(<Landing />);

        let data = {
            board : "@.........\n....#.....\n..........\n....~.....\n..........\n..........\n..........\n..........\n..........\n..........\n",
            nextUpdate : 4360
        }

        wrapper.instance().setUserName("Kris", data);
        wrapper.instance().getBoard();

        expect(wrapper).to.not.be.null;
        expect(wrapper.state('username')).to.equal("Kris");
        expect(wrapper.state('board')).to.eql(["@.........","....#.....","..........","....~.....","..........","..........","..........","..........","..........","..........",""]);
        expect(wrapper.state('gameStarted')).to.equal(true);
        expect(wrapper.state('nextUpdate')).to.equal(4360);
    });

});