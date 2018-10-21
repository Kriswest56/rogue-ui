import React from 'react';
import Landing from './landing';
import renderer from 'react-test-renderer';
import enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

test('Landing renders with login page', () => {
    const wrapper = mount(<Landing />);
    expect(wrapper).not.toBeNull();
    wrapper.find('loginForm').exists();
    wrapper.find('board').exists();
});

test('Landing renders with board', () => {
    const wrapper = mount(<Landing />);
    wrapper.setState({
        username: "Kris",
        countdown: 5,
        gameStarted: true,
        board: ["@.........\n....#.....\n..........\n....~.....\n..........\n..........\n..........\n..........\n..........\n..........\n"]
    })

    expect(wrapper).not.toBeNull();
    wrapper.find('piece-ground').exists();
    wrapper.find('piece-player').exists();
    wrapper.find('piece-wall').exists();
    wrapper.find('piece-water').exists();
});