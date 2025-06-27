export interface PermissionDto {
  userId: string;
  productId: string;
  phoneNumber: string;
  access?: boolean;
  expiresAt?: Date;
}
