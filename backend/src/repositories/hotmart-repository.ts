import { TransactionHotmartDto } from "../dto/transaction-hotmart";
import TransactionHotmart from "../models/TransactionHotmart";

export async function create(transaction: TransactionHotmartDto) {
  return await TransactionHotmart.create(transaction);
}
