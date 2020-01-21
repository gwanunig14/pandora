import React from "react";
import { shallow } from "enzyme";
import MainView from "./MainView";
import { MartaResponse, MartaFilter } from "./Mocks/MartaMocks";

describe("MainView ", () => {
  const component = shallow(<MainView />);

  it("filters", () => {
    component.instance().formatBuses(MartaResponse);
    expect(component.state().allBuses).toEqual(MartaFilter);
    expect(component.state().selectedBuses).toEqual(MartaFilter);
  });

  it("selects route", () => {
    component.instance().selectRoute("40");
    expect(component.state().selectedBuses).toEqual([MartaFilter[0]]);
    component.instance().selectRoute("32");
    expect(component.state().selectedBuses).toEqual([MartaFilter[1]]);
    component.instance().selectRoute("15");
    expect(component.state().selectedBuses).toEqual([MartaFilter[2]]);
    component.instance().selectRoute("All");
    expect(component.state().selectedBuses).toEqual(MartaFilter);
  });
});
