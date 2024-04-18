import { ShippingContainer } from "./shippingContainer";
import { Transporter } from "./transporter";
import { HeavyContainer } from "./heavyContainer";
import { LightContainer } from "./lightContainer";
export class Ship implements Transporter {
  maxWeight: number;
  container: ShippingContainer[];

  constructor(maxWeight: number) {
    this.maxWeight = maxWeight;
    this.container = [];
  }
  addContainer(container: ShippingContainer): void {
    this.container.push(container);
  }
  getTotalWeight(): number {
    if (this.container === null) {
      return 0;
    } else {
      let sum = 0;
      for (let i = 0; i < this.container.length; i++) {
        sum += this.container[i].getGrossWeight();
      }
      return sum;
    }
  }
  isOverweight(): boolean {
    return this.getTotalWeight() > this.maxWeight ? true : false;
  }
}
