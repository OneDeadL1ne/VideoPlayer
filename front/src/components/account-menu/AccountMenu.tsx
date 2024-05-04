import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useErrorToast } from '@/hooks/use-error-toast';
import { api } from '@/redux/api';
import { useLogoutMutation } from '@/redux/api/auth';
import { getJWTtokens, removeCookieValue } from '@/utils/helpers';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { setLogout, setUser } from '@/redux/reducers/authSlice';
import { useGetUserMutation } from '@/redux/api/user';
import { useMemo } from 'react';
import { Skeleton } from '../ui/skeleton';

export default function AccountMenu() {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { user } = useAppSelector((s) => s.auth);

	const [fetchUser, { data: userFetch, isLoading: isUserLoading, isSuccess: isUserSuccess }] =
		useGetUserMutation();
	const [logout, { error }] = useLogoutMutation();
	const userName = useMemo(() => {
		if (!user) {
			fetchUser();
			if (isUserSuccess) {
				dispatch(setUser(userFetch));
			}
		}
		if (userFetch?.nickname) {
			return `${userFetch.nickname}`;
		}
		if (user?.nickname) {
			return `${user.nickname}`;
		}
	}, [user, userFetch]);

	const handleLogout = () => {
		const refreshToken = getJWTtokens().refreshToken;

		if (refreshToken) {
			logout({ refresh_token: refreshToken! });
			removeCookieValue('refreshToken');
		}

		removeCookieValue('accessToken');

		dispatch(api.util.resetApiState());
		dispatch(setLogout());
	};

	useErrorToast(handleLogout, error);

	return (
		<div className="flex items-center justify-center mr-5 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="cursor-pointer flex items-center justify-center gap-1">
						<div className="font-pop text-[14px] text-accent-foreground">
							{isUserLoading ? (
								<Skeleton className="w-[120px] h-5 rounded-xl" />
							) : (
								<p>{userName}</p>
							)}
						</div>
						<Avatar>
							{/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
							<AvatarFallback>
								<User color="#fff" />
							</AvatarFallback>
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="flex flex-col rounded-xl mt-1 gap-1 py-2 bg-secondary outline-black/50 border-neutral-600 text-accent-foreground"
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
