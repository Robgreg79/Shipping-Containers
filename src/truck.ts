import { ShippingContainer } from "./shippingContainer";
import { Transporter } from "./transporter";
import { HeavyContainer } from "./heavyContainer";
import { LightContainer } from "./lightContainer";
export class Truck implements Transporter {
  maxWeight: number;
  container: ShippingContainer | null;

  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
    this.container = null;
  }
  addContainer(container: ShippingContainer): void {
    this.container = container;
  }
  getTotalWeight(): number {
    if (this.container === null) {
      return 0;
    } else {
      return this.container.getGrossWeight();
    }
  }
  isOverweight(): boolean {
    return this.getTotalWeight() > this.maxWeight ? true : false;
  }
}
