import React from "react";
import { shallow } from "enzyme";
import { MapView } from "./MapView";
import { MartaFilter } from "../Mocks/MartaMocks";

describe("MapView ", () => {
  const component = shallow(<MapView buses={MartaFilter} />);

  it("selects bus", () => {
    component.instance().onMarkerClick("40", "20");
    expect(component.state().showingInfoWindow).toEqual(true);
    expect(component.state().selectedBus).toEqual("40");
    expect(component.state().activeMarker).toEqual("20");
  });

  it("clicks map", () => {
    component.instance().onMapClicked();
    expect(component.state().showingInfoWindow).toEqual(false);
    expect(component.state().activeMarker).toEqual(null);
  });
});
