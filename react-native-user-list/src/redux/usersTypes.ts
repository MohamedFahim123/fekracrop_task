export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

export interface UsersState {
  users: User[];
  visibleCount: number;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}
