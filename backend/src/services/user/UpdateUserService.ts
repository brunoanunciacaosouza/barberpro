import prismaClient from "../../prisma";
import { Request, Response } from "express";

interface UserRequest {
  user_id: string;
  name: string;
  endereco: string;
}

class UpdateUserService {
  async execute({ user_id, name, endereco }: UserRequest) {
    try {
      const userAlreadyExist = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExist) {
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name: name,
          endereco: endereco,
        },
        select: {
          name: true,
          email: true,
          endereco: true,
        },
      });

      return userUpdated;
    } catch (error) {
      throw new Error("Error an update user!");
    }
  }
}

export { UpdateUserService };
