export type UserPayload = {
  _id: string;
  username: string;
  role: string;
  permissions: string[];
  department?: string | null; // ✅ allow null
};
