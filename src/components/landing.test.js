import React from 'react';
import LoginPage from './landing';
import renderer from 'react-test-renderer';

test('LoginPage renders', () => {
  const component = renderer.create(
      <LoginPage />
  );
  let tree = component.toJSON();
  expect(tree).not.toBeNull();
});