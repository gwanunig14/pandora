import React from "react";
import { shallow } from "enzyme";
import RouteSelect from "./RouteSelect";
import { MartaFilter } from "../Mocks/MartaMocks";

describe("MapView ", () => {
  const selectRoute = jest.fn();
  const format = jest.fn();
  const preventDefault = jest.fn();
  const addClass = jest.fn();
  const component = shallow(
    <RouteSelect
      selectRoute={selectRoute}
      formatBuses={format}
      buses={MartaFilter}
    />
  );

  it("selects bus", () => {
    component.instance().onClick({
      preventDefault: preventDefault,
      target: {
        outerText: "40",
        classList: { add: addClass }
      }
    });
    expect(selectRoute).toBeCalledTimes(1);
    expect(preventDefault).toBeCalledTimes(1);
    expect(addClass).toBeCalledTimes(1);
  });
});
