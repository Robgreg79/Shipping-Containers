import { Ship } from "./ship";
import { ShippingContainer } from "./shippingContainer";
import { Transporter } from "./transporter";

export function findContainerByDestination(
  container: ShippingContainer[],
  destination: string
): ShippingContainer[] {
  return container.filter((container) => container.destination === destination);
}

export function findOverweighTransporters(
  transporters: Transporter[]
): Transporter[] {
  return transporters.filter(
    (transporters) => transporters.isOverweight() === true
  );
}

export function isSafeToAddContainer(
  ship: Ship,
  container: ShippingContainer
): boolean {
  let total = ship.getTotalWeight() + container.getGrossWeight();
 return total <= ship.maxWeight ?  true : false;
}
