export interface User {
  id?: string;
  name: string;
  phoneNumber: string;
  email: string;
  password?: string;
  currentSubscription?: string[];
}
