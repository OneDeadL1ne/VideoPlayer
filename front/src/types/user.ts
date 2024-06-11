// USER

import { PersonInterface } from './person';
import { RoleInterface } from './role';

export interface UserInterface {
	id_user: number;
	email: string;
	nickname: string;
	is_subscription: boolean;
	is_deleted: boolean;
	role: RoleInterface;
	person: PersonInterface;
	avatar_url?: string;
	photo_url?: string;
}
