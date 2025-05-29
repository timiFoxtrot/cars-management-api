import Car, { ICar } from "../models/car.model";

export class CarRepository {
  async createCar(carData: ICar, managerId: string) {
    const car = new Car({ ...carData, createdBy: managerId });
    return car.save();
  }

  async getCars(queryParams: {
    brand: string;
    model: string;
    minPrice: string;
    maxPrice: string;
    available: string;
    page: string;
    limit: string;
  }) {
    const {
      brand,
      model,
      minPrice,
      maxPrice,
      available,
      page = 1,
      limit = 10,
    } = queryParams;

    const query: any = {};

    if (brand) query.brand = { $regex: brand.toString(), $options: "i" };
    if (model) query.carModel = { $regex: model.toString(), $options: "i" };
    if (available !== undefined) query.available = String(available) === "true";
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = +minPrice;
    if (maxPrice) query.price.$lte = +maxPrice;

    const cars = await Car.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate("category");

    return cars;
  }

  async getCar(carId: string) {
    return Car.findById(carId);
  }

  async updateCar(carId: string, carData: Partial<ICar>, managerId: string) {
    return Car.findOneAndUpdate({ _id: carId, createdBy: managerId }, carData, {
      new: true,
    });
  }

  async deleteCar(carId: string, managerId: string) {
    return Car.findOneAndDelete({ _id: carId, createdBy: managerId });
  }

  async purchaseCar(carId: string, customerId: string) {
    return await Car.findOneAndUpdate(
      { _id: carId, available: true },
      { available: false, purchasedBy: customerId },
      { new: true }
    );
  }
}
