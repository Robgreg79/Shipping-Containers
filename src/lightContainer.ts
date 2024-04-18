import { ShippingContainer } from "./shippingContainer";

export class LightContainer implements ShippingContainer {
  destination: string;
  cargoWeight: number;

  constructor(destination: string, cargoWeight: number = 0) {
    this.destination = destination;
    this.cargoWeight = cargoWeight;
  }
  getGrossWeight(): number {
    return this.cargoWeight;
  }
}
