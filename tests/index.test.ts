import { ShippingContainer } from "../src/shippingContainer";
import { Transporter } from "../src/transporter";
import { HeavyContainer } from "../src/heavyContainer";
import { LightContainer } from "../src/lightContainer";
import { Ship } from "../src/ship";
import {
  findContainerByDestination,
  findOverweighTransporters,
  isSafeToAddContainer,
} from "../src/functions";
import { Truck } from "../src/truck";

test("destination and cargoWeight to be set to Japan and 100 from parameters and Gross weight is 100", () => {
  const light = new LightContainer("Japan", 100);
  expect(light.destination).toBe("Japan");
  expect(light.cargoWeight).toBe(100);
  expect(light.getGrossWeight()).toBe(100);
});

test("cargoWeight defaults to 0 when omitted from contructor and Gross weight is 0", () => {
  const cargo1 = new LightContainer("Cleveland");
  expect(cargo1.cargoWeight).toBe(0);
  expect(cargo1.getGrossWeight()).toBe(0);
});

test("tareWeight, destination, and cargoWeight is set from constructor and Gross weight is 205", () => {
  const cargo2 = new HeavyContainer("Akron", 105, 100);
  expect(cargo2.destination).toBe("Akron");
  expect(cargo2.cargoWeight).toBe(100);
  expect(cargo2.tareWeight).toBe(105);
  expect(cargo2.getGrossWeight()).toBe(205);
});

test("cargoWeight is set to 0 when omitted from constructor and Gross weight is 115", () => {
  const cargo3 = new HeavyContainer("Akron", 115);
  expect(cargo3.destination).toBe("Akron");
  expect(cargo3.cargoWeight).toBe(0);
  expect(cargo3.tareWeight).toBe(115);
  expect(cargo3.getGrossWeight()).toBe(115);
});

test("maxWeight is set and container is null in new truck instance", () => {
  const truck1 = new Truck(100);
  expect(truck1.maxWeight).toBe(100);
  expect(truck1.container).toBe(null);
});
test("addContainer sets the container property and getTotalWeight returns gross weight and true for overweight", () => {
  const truck2 = new Truck(150);
  const cargo2 = new HeavyContainer("Akron", 120, 100);
  truck2.addContainer(cargo2);
  expect(truck2.getTotalWeight()).toBe(220);
  expect(truck2.container).toBe(cargo2);
  expect(truck2.isOverweight()).toBe(true);
});
test("addContainer sets the container property and getTotalWeight returns gross weight and false for overweight", () => {
  const truck3 = new Truck(100);
  const cargo4 = new HeavyContainer("Toronto", 50, 40);
  truck3.addContainer(cargo4);
  expect(truck3.getTotalWeight()).toBe(90);
  expect(truck3.container).toBe(cargo4);
  expect(truck3.isOverweight()).toBe(false);
});
test("addContainer sets the container property and getTotalWeight returns gross weight and false for overweight", () => {
  const truck3 = new Truck(50);
  const cargo4 = new LightContainer("Toronto", 50);
  truck3.addContainer(cargo4);
  expect(truck3.getTotalWeight()).toBe(50);
  expect(truck3.container).toBe(cargo4);
  expect(truck3.isOverweight()).toBe(false);
});
test("addContainer sets the container property and getTotalWeight 0 when omitted and false for overweight", () => {
  const truck3 = new Truck(60);
  const cargo4 = new LightContainer("Poland");
  truck3.addContainer(cargo4);
  expect(truck3.getTotalWeight()).toBe(0);
  expect(truck3.container).toBe(cargo4);
  expect(truck3.isOverweight()).toBe(false);
});
test("addContainer sets the container property and getTotalWeight 0 when omitted and false for overweight", () => {
  const truck3 = new Truck(70);
  const cargo4 = new LightContainer("Mexico", 90);
  truck3.addContainer(cargo4);
  expect(truck3.getTotalWeight()).toBe(90);
  expect(truck3.container).toBe(cargo4);
  expect(truck3.isOverweight()).toBe(true);
});

test("maxWeight is set from contructor parameter and container is empty array in new ship instance, with no total weight", () => {
  const ship1 = new Ship(600);
  expect(ship1.maxWeight).toBe(600);
  expect(ship1.container).toEqual([]);
  expect(ship1.getTotalWeight()).toBe(0);
});
test("Calling addContainer adds to container", () => {
  const ship1 = new Ship(600);
  const cargo4 = new LightContainer("Mexico", 90);
  ship1.addContainer(cargo4);
  expect(ship1.maxWeight).toBe(600);
  expect(ship1.container).toEqual([cargo4]);
  expect(ship1.isOverweight()).toBe(false);
});
test("Calling addContainer twice adds both to container and total weight equals 280", () => {
  const ship1 = new Ship(250);
  const cargo4 = new LightContainer("Mexico", 90);
  const cargo5 = new HeavyContainer("Toronto", 90, 100);
  ship1.addContainer(cargo4);
  ship1.addContainer(cargo5);
  expect(ship1.getTotalWeight()).toBe(280);
  expect(ship1.maxWeight).toBe(250);
  expect(ship1.container).toEqual([cargo4, cargo5]);
  expect(ship1.isOverweight()).toBe(true);
});
test("Calling addContainer multiple times adds container and total weight equals 280", () => {
  const ship1 = new Ship(315);
  const cargo4 = new LightContainer("Mexico", 90);
  const cargo5 = new HeavyContainer("Toronto", 90, 100);
  const cargo6 = new LightContainer("London", 15);
  const cargo7 = new HeavyContainer("Russia", 20);
  ship1.addContainer(cargo4);
  ship1.addContainer(cargo5);
  ship1.addContainer(cargo6);
  ship1.addContainer(cargo7);
  expect(ship1.getTotalWeight()).toBe(315);
  expect(ship1.maxWeight).toBe(315);
  expect(ship1.container).toEqual([cargo4, cargo5, cargo6, cargo7]);
  expect(ship1.isOverweight()).toBe(false);
});

test("findContainerByDestination returns an array of containers with Toronto parameter and isSafeToAddContainer to return false", () => {
  const ship1 = new Ship(315);
  const cargo4 = new LightContainer("Mexico", 90);
  const cargo5 = new HeavyContainer("Toronto", 90, 100);
  const cargo6 = new LightContainer("London", 15);
  const cargo7 = new HeavyContainer("Toronto", 20);
  const cargo8 = new LightContainer("London", 15);
  const cargo9 = new HeavyContainer("Toronto", 25);
  const cargo10 = new HeavyContainer("Toronto", 60);
  ship1.addContainer(cargo4);
  ship1.addContainer(cargo5);
  ship1.addContainer(cargo6);
  ship1.addContainer(cargo7);
  ship1.addContainer(cargo8);
  ship1.addContainer(cargo9);
  expect(findContainerByDestination(ship1.container, "Toronto")).toEqual([
    cargo5,
    cargo7,
    cargo9,
  ]);
  expect(findContainerByDestination(ship1.container, "London")).toEqual([
    cargo6,
    cargo8,
  ]);
  expect(isSafeToAddContainer(ship1, cargo10)).toBe(false);
});

test("function returns array of Overweight Transporters and that it is false for SafetoAddContainer", () => {
  const ship1 = new Ship(315);
  const cargo4 = new LightContainer("Mexico", 90);
  const cargo5 = new HeavyContainer("Toronto", 90, 100);
  const cargo6 = new LightContainer("London", 15);
  const cargo7 = new HeavyContainer("Russia", 20);
  const cargo10 = new HeavyContainer("Toronto", 10);
  const cargo11 = new LightContainer("Toronto", 5);
  ship1.addContainer(cargo4);
  ship1.addContainer(cargo5);
  ship1.addContainer(cargo6);
  ship1.addContainer(cargo7);
  const ship2 = new Ship(250);
  const cargo2 = new LightContainer("Mexico", 90);
  const cargo3 = new HeavyContainer("Toronto", 90, 100);
  ship2.addContainer(cargo2);
  ship2.addContainer(cargo3);
  const ship3 = new Ship(5000);

  const truck3 = new Truck(70);
  const cargo8 = new LightContainer("Mexico", 90);
  truck3.addContainer(cargo8);
  const truck4 = new Truck(60);
  const cargo9 = new LightContainer("Poland");
  truck4.addContainer(cargo9);
  let transportation = [ship1, ship2, truck3, truck4];
  expect(findOverweighTransporters(transportation)).toEqual([ship2, truck3]);
  expect(isSafeToAddContainer(ship1, cargo10)).toBe(false);
  expect(isSafeToAddContainer(ship2, cargo10)).toBe(false);
  expect(isSafeToAddContainer(ship3, cargo10)).toBe(true);
  expect(isSafeToAddContainer(ship1, cargo11)).toBe(false);
  expect(isSafeToAddContainer(ship2, cargo11)).toBe(false);
  expect(isSafeToAddContainer(ship3, cargo11)).toBe(true);
});
