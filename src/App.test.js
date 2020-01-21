import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import App from "./App";

test("renders App", () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
