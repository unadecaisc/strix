type UserRole = {
  id: number;
  name: string;
  allowedPermissions: string[];
  createdAt: string;
  updatedAt: string;
};

type User = {
  createdAt: string;
  department: string | null;
  departmentId?: number | null;
  email: string;
  id: number;
  name: string;
  phone: string;
  role: UserRole;
  roleId: number;
  updatedAt: string;
  uuid: string;
};
