import { ConflictError } from "../common/errors/ConflictError";
import Manager, { IManager } from "../models/manager.model";

export class ManagerRepository {
  async createManager(managerData: IManager) {
    const existingManager = await Manager.findOne({
      email: managerData.email.toLowerCase(),
    });

    if (existingManager) throw new ConflictError("Email already taken");

    const newManager = new Manager({
      ...managerData,
      email: managerData.email.toLowerCase(),
    });
    const savedManager = await newManager.save();

    const managerObj = savedManager.toObject();
    const { password, ...managerWithoutPassword } = managerObj;
    return managerWithoutPassword;
  }

  async findByEmail(email: string) {
    return Manager.findOne({ email });
  }
}
