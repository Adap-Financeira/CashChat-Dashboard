import Colors from "../models/Colors";

export async function getAll() {
  return await Colors.find();
}

export async function getByName(name: string) {
  return await Colors.findOne({ name });
}

export async function getByValue(value: string) {
  return await Colors.findOne({ value });
}

export async function getManyByValues(values: string[]) {
  return await Colors.find({ value: { $in: values } });
}
