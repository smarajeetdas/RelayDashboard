export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  geography: string;
  status: 'Active' | 'Inactive';
  accessibleServices?: string;
  lastLogin?: string;
  createdDate?: string;
  updatedDate?: string;
  projects?: UserProject[];
  associatedUsers?: AssociatedUser[];
}

export interface UserProject {
  id: string;
  name: string;
  role: string;
  description?: string;
}

export interface AssociatedUser {
  id: string;
  name: string;
  role: string;
  email?: string;
}