// types/User.ts
export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'Active' | 'Inactive';
  }
  
  // types/Role.ts
  export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
  }
  
  // types/Permission.ts
  export interface Permission {
    id: number;
    name: string;
    description: string;
  }
  