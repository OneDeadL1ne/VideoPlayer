import { User } from 'lucide-react';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useErrorToast } from '@/hooks/use-error-toast';
import { api } from '@/redux/api';
import { useLogoutMutation } from '@/redux/api/auth';
import {
	getCurrentColor,
	getCurrentColorScheme,
	getJWTtokens,
	removeCookieValue,
} from '@/utils/helpers';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { setLogout, setUser } from '@/redux/reducers/authSlice';
import { useGetUserMutation } from '@/redux/api/user';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import { AvatarImage } from '../ui/avatar';
import { useTheme } from '@/hooks/useTheme';

export default function AccountMenu() {
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const { user } = useAppSelector((s) => s.auth);

	const [mode, handleChange] = useTheme(getCurrentColorScheme());

	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);

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
		removeCookieValue('accessToken');
		dispatch(setLogout());

		dispatch(api.util.resetApiState());

		if (refreshToken) {
			logout({ refresh_token: refreshToken! });
			removeCookieValue('refreshToken');
		}
		navigate('/');
	};

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	useErrorToast(handleLogout, error);

	return (
		<div className="flex items-center justify-center mr-5 gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="cursor-pointer flex items-center justify-center gap-1">
						<div className="font-pop text-[14px] text-accent-foreground ">
							{isUserLoading ? (
								<Skeleton className="w-[120px] h-5 rounded-xl" />
							) : (
								<p className="hidden sm:inline-block">{userName}</p>
							)}
						</div>
						<Avatar>
							{user?.avatar_url && user?.avatar_url.length != 0 ? (
								<AvatarImage
									className="h-10 w-10 rounded-full self-center"
									src={user.avatar_url}
									alt={`@${user.nickname}`}
								/>
							) : (
								<AvatarFallback className="bg-secondary">
									<User color={color} />
								</AvatarFallback>
							)}
						</Avatar>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="flex flex-col rounded-xl mt-1 gap-1 py-2 bg-accent   border-0 text-muted-foreground"
					align="end"
				>
					{user?.role.role_name != 'Пользователь' && (
						<DropdownMenuItem asChild>
							<Button
								onClick={() => navigate('/admin/films')}
								variant="ghost"
								className="w-full h-5 justify-start p-3  hover:cursor-pointer  "
								size="sm"
							>
								Админ панель
							</Button>
						</DropdownMenuItem>
					)}
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
					<DropdownMenuSub>
						<DropdownMenuSubTrigger className="flex items-center">
							<span className="text-center  w-full">
								{mode == 'light' ? 'Светлая' : 'Темная'}
							</span>
							<div className="">
								{mode == 'light' ? (
									<SunIcon
										color={color}
										className="rotate-0 h-4 w-4 scale-100 transition-all dark:-rotate-90 dark:scale-0"
									/>
								) : (
									<MoonIcon
										className="rotate-0 h-4 w-4 scale-100 transition-all dark:-rotate-90 dark:scale-0"
										color={color}
									/>
								)}
							</div>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="bg-accent border-0 ">
								<DropdownMenuItem
									onClick={() => handleChange(false)}
									className="cursor-pointer"
								>
									<SunIcon className="mr-2 size-4" color={color} />
									<span className="text-muted-foreground hover:text-accent-foreground">
										Светлая
									</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => handleChange(true)}
									className="cursor-pointer"
								>
									<MoonIcon className="mr-2 size-4" color={color} />
									<span className="text-muted-foreground hover:text-accent-foreground">
										Темная
									</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
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
