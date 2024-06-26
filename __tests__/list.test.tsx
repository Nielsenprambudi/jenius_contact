import React from "react";
import renderer from 'react-test-renderer';
import List from "../src/screens/list";

test('renderer correctly', () => {
    const renderComp = renderer.create(<List/>).toJSON();
    expect(renderComp).toMatchSnapshot();
})