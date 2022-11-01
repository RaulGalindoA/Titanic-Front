import { Person } from './person';
export interface ApiResponse {
    message: string;
    isSuccess: boolean;
    data?: Person[]
    length?: number;
}
