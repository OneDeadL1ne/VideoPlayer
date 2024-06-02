import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from '../ui/dialog';

import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormField } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { InputField } from '../input/input-field';

import { useAuthMutation } from '@/redux/api/auth';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

import { setAccessToken, setRefreshToken } from '@/redux/reducers/authSlice';
import { LoadingSpinner } from '../spinner/spinner';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import { Checkbox } from '../ui/checkbox';
import { getCurrentColor } from '@/utils/helpers';
import { useLocation, useNavigate } from 'react-router-dom';

const FormSchema = z.object({
	email: z.string(),
	password: z.string(),
	remember_me: z.boolean(),
});

export default function AuthDialog({ active = false }: { active?: boolean }) {
	const [open, setOpen] = useState(active);
	const navigate = useNavigate();
	const { theme } = useAppSelector((s) => s.theme);
	const { isLogin } = useAppSelector((s) => s.auth);
	const [color, setColor] = useState(theme);
	const { pathname } = useLocation();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
			remember_me: false,
		},
	});
	const [passwordShown, setPasswordShown] = useState(false);

	const dispatch = useAppDispatch();

	const [signIn, { data: authData, isLoading, isSuccess: isAuthSuccess, error }] =
		useAuthMutation();

	useEffect(() => {
		if (isAuthSuccess) {
			dispatch(setAccessToken(authData?.accessToken));

			if (form.getValues().remember_me) {
				dispatch(setRefreshToken(authData?.refreshToken));
			}
		}
	}, [isAuthSuccess]);

	function onSubmit(data: z.infer<typeof FormSchema>) {
		signIn(data);
	}

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	useEffect(() => {
		if (!isLogin && !open && active && pathname == '/profile') {
			navigate('/');
		}
	}, [open]);

	useSuccessToast('Успешная Авторизация', isAuthSuccess, setOpen);
	useErrorToast(() => onSubmit(form.getValues()), error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="text-white bg-primary hover:bg-accent  border-primary border-[1px]"
				>
					Войти
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]  bg-secondary	border-0 text-accent-foreground	   ">
				<DialogHeader>
					<DialogTitle>Авторизация</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="  space-y-6 ">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<InputField
									label="Логин"
									isRequired
									type="email"
									classNameInput="border border-input"
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<InputField
									label="Пароль"
									type={passwordShown ? 'text' : 'password'}
									className="mt-3  relative  "
									classNameInput="border border-input"
									suffixIcon={
										<Button
											type="button"
											variant="ghost"
											className="px-4 rounded-l-none rounded-r-xl absolute right-0"
											onClick={() => setPasswordShown(!passwordShown)}
										>
											{passwordShown ? (
												<Eye size={20} strokeWidth={2.4} color={color} />
											) : (
												<EyeOff size={20} strokeWidth={2.4} color={color} />
											)}
										</Button>
									}
									{...field}
								/>
							)}
						/>
						<FormField
							control={form.control}
							name="remember_me"
							render={({ field }) => (
								<Checkbox
									label="Запомнить меня"
									id="remember"
									color={color}
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>

						<div className="relative h-8">
							<Button
								type="submit"
								className="rounded-xl h-[40px] text-white bg-primary "
								variant="default"
							>
								{isLoading ? <LoadingSpinner className="text-white" /> : 'Войти'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
