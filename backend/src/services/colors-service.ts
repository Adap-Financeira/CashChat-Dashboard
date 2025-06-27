import * as colorsRepository from "../repositories/colors-repository";

export async function getAllColors() {
  return await colorsRepository.getAll();
}
