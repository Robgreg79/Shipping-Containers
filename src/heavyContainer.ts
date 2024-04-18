import { ShippingContainer } from "./shippingContainer";

export class HeavyContainer implements ShippingContainer {
  destination: string;
  cargoWeight: number;
  tareWeight: number;

  constructor(
    destination: string,
    tareWeight: number,
    cargoWeight: number = 0
  ) {
    this.destination = destination;
    this.cargoWeight = cargoWeight;
    this.tareWeight = tareWeight;
  }
  getGrossWeight(): number {
    return this.cargoWeight + this.tareWeight;
  }
}
