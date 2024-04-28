import { useMemo } from 'react';
import { User } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton.tsx';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { useErrorToast } from '@/hooks/use-error-toast';
import { api } from '@/redux/api';
import { useLogoutMutation } from '@/redux/api/auth';

import { getJWTtokens, removeCookieValue } from '@/utils/helpers';

export default function AccountMenu() {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	//const { data: user, isLoading: isUserLoading } = useGetMyUserQuery();
	const [logout, { error }] = useLogoutMutation();
	// const userName = useMemo(() => {
	// 	if (user?.person?.first_name) {
	// 		return `${user.person.first_name} ${user.person?.last_name?.[0]}.`;
	// 	}

	// 	return user?.organization?.short_name || "";
	// }, [user]);

	const handleLogout = () => {
		const refreshToken = getJWTtokens().refreshToken;

		if (refreshToken) {
			logout({ refresh_token: refreshToken! });
			removeCookieValue('refreshToken');
		}

		removeCookieValue('accessToken');

		dispatch(api.util.resetApiState());
	};

	useErrorToast(handleLogout, error);

	return (
		<div className="flex items-center justify-center mr-5 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="cursor-pointer flex items-center justify-center gap-1">
						<User />
						<div className="font-pop text-[14px] text-[#3F434A]">
							{/* {isUserLoading ? (
								<Skeleton className="w-[120px] h-5 rounded-xl" />
							) : (
								<p>{userName}</p>
							)} */}
						</div>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="flex flex-col rounded-xl mt-1 gap-1 py-2"
					align="end"
				>
					<DropdownMenuItem asChild>
						<Button
							onClick={() => navigate('/profile')}
							variant="ghost"
							className="w-full h-5 justify-start p-3 hover:cursor-pointer"
							size="sm"
						>
							Личный кабинет
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Button
							onClick={handleLogout}
							variant="ghost"
							className="w-full text-destructive h-5 justify-start p-3 hover:text-destructive hover:cursor-pointer"
							size="sm"
						>
							Выход
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
