type UserRole = {
  id: number;
  name: string;
  allowedPermissions: string[];
  createdAt: string;
  updatedAt: string;
};

enum WorkHoursStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

enum PeriodStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
  CLOSED = "CLOSED",
}

enum RequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

type GlobalSetting = {
  defaultPrice: string;
  studentsCode: string;
  scolarshipCode: string;
  tithCode: string;
};

type MailingList = {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Period = {
  id: number;
  name: string;
  start: Date;
  end: Date;
  status: PeriodStatus;
  createdAt: Date;
  updatedAt: Date;
  workHours: WorkHours[];
  scholarshipPayroll: ScholarshipPayroll[];
};

type Role = {
  id: number;
  name: string;
  allowedPermissions: string[];
  createdAt: Date;
  updatedAt: Date;
  users: User[];
};

type Pricing = {
  id: number;
  price: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  departments: Department[];
};

type Department = {
  id: number;
  name: string;
  code: string;
  pricingId: number;
  createdAt: Date;
  updatedAt: Date;
  pricing: Pricing;
  users: User[];
  students: StudentOnDepartment[];
  hours: WorkHours[];
  scholarshipPayroll: ScholarshipPayroll[];
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  uuid: string;
  roleId: number;
  departmentId?: number;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  department?: Department;
  workHours: WorkHours[];
  scholarshipPayroll: ScholarshipPayroll[];
};

type StudentOnDepartment = {
  id: number;
  studentId: number;
  departmentId: number;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  student: Student;
  department: Department;
};

type Student = {
  id: number;
  name: string;
  email: string;
  phone: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  departments: StudentOnDepartment[];
  workHours: WorkHours[];
  ScholarshipPayroll: ScholarshipPayroll[];
};

type WorkHours = {
  id: number;
  name: string;
  start: Date;
  end: Date;
  amount: number;
  price: number;
  total: number;
  status: WorkHoursStatus;
  registedBy: number;
  studentId: number;
  departmentId: number;
  appliedHourId?: number;
  periodId: number;
  createdAt: Date;
  updatedAt: Date;
  period: Period;
  applier: User;
  student: Student;
  department: Department;
  becaPayroll?: ScholarshipPayroll;
};

type ScholarshipPayroll = {
  id: number;
  hours: number;
  amount: number;
  subtotal: number;
  tithe: number;
  total: number;
  payable: number;
  recivable: number;
  studentId: number;
  departmentId: number;
  periodId: number;
  appliedBy: number;
  createdAt: Date;
  updatedAt: Date;
  period: Period;
  applier: User;
  student: Student;
  department: Department;
  workHours: WorkHours[];
};

type ApiPagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  next_page?: number;
  prev_page?: number;
};
