import React from 'react';
import Landing from './landing';
import renderer from 'react-test-renderer';
import enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

test('Landing renders', () => {
    const component = renderer.create(
        <Landing />
    );
    let tree = component.toJSON();
    expect(tree).not.toBeNull();
});

test('Landing renders', () => {
    const wrapper = mount(<Landing />);
    expect(wrapper).not.toBeNull();
});

test('Landing renders', () => {
    const wrapper = mount(<Landing />);
    wrapper.setState({
        username: "Kris",
        countdown: 5,
        gameStarted: true,
        board: ["@.........\n....#.....\n..........\n....~.....\n..........\n..........\n..........\n..........\n..........\n..........\n"]
    })

    expect(wrapper).not.toBeNull();
});