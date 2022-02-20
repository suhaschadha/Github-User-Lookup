import { User } from "./user.model";

export interface UserResults{
    total_count: number,
    incomplete_results: boolean,
    items: User[]
}