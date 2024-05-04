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
import { useAppDispatch } from '@/hooks/reduxHooks';

import { setAccessToken, setRefreshToken } from '@/redux/reducers/authSlice';
import { LoadingSpinner } from '../spinner/spinner';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import { Checkbox } from '../ui/checkbox';

const FormSchema = z.object({
	email: z.string(),
	password: z.string(),
	remember_me: z.boolean(),
});

export default function AuthDialog() {
	const [open, setOpen] = useState(false);

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
	useSuccessToast('Успешная Авторизация', isAuthSuccess, setOpen);
	useErrorToast(() => onSubmit(form.getValues()), error);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Войти</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] bg-secondary	border-accent-foreground text-accent-foreground	   ">
				<DialogHeader>
					<DialogTitle>Авторизация</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="  space-y-6 ">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<InputField label="Логин" isRequired className="" {...field} />
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
									suffixIcon={
										<Button
											type="button"
											variant="ghost"
											className="px-4 rounded-l-none rounded-r-xl absolute right-0"
											onClick={() => setPasswordShown(!passwordShown)}
										>
											{passwordShown ? (
												<Eye size={20} strokeWidth={2.4} color="#3F434A" />
											) : (
												<EyeOff
													size={20}
													strokeWidth={2.4}
													color="#3F434A"
												/>
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
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>

						<div className="relative h-8">
							<Button
								type="submit"
								className="rounded-xl h-[40px]  bg-primary "
								variant="default"
							>
								{isLoading ? <LoadingSpinner /> : 'Войти'}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
