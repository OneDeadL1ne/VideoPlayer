import { CardContent, Card } from '@/components/ui/card';

import CustomForm, { useForm } from '@/components/form/form';
import { InputField } from '@/components/input/input-field';

import { LoadingSpinner } from '@/components/spinner/spinner';
import { Button } from '@/components/ui/button';

import { FormField } from '@/components/ui/form';

import { z } from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentColor } from '@/utils/helpers';

import { Checkbox } from '@/components/ui/checkbox';
import { useCreateUserMutation } from '@/redux/api/user';
import { useErrorToast } from '@/hooks/use-error-toast';
import { useSuccessToast } from '@/hooks/use-success-toast';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
	last_name: z.string().min(1, ''),
	first_name: z.string().min(1, ''),
	patronymic: z.string(),
	nickname: z.string().min(1, ''),
	phone: z.string().min(1, ''),

	email: z.string().email().min(1, ''),
	password: z.string().min(1, ''),
});

export default function RegistrationPage() {
	const form = useForm({
		schema: formSchema,
		defaultValues: {
			first_name: '',
			last_name: '',
			patronymic: '',
			email: '',

			nickname: '',
			password: '',
			phone: '',
		},
	});
	const [passwordShown, setPasswordShown] = useState(false);
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	const navigate = useNavigate();
	const [registration, { data: authData, isLoading, isSuccess, error }] = useCreateUserMutation();
	const [gender, setGender] = useState('');
	const handleSubmit = (data: {
		first_name: string;
		last_name: string;
		patronymic: string;
		nickname: string;
		phone: string;

		email: string;
		password: string;
	}) => {
		registration({
			email: data.email,
			first_name: data.first_name,
			id_gender: gender == 'men' ? 1 : 2,
			id_role: 1,
			last_name: data.last_name,
			nickname: data.nickname,
			password: data.password,
			patronymic: data.patronymic,
			phone: data.phone,
		});
	};
	const addSuccessMsg = useMemo(() => {
		return 'Успешная регистрация';
	}, []);
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	useEffect(() => {
		if (authData?.status) {
			navigate('/');
		}
	}, [authData]);
	useSuccessToast(addSuccessMsg, isSuccess);
	useErrorToast(void 0, error);
	return (
		<div className="@container h-full flex justify-center  text-accent-foreground">
			<div className="h-full">
				<Card className="@[700px]:w-[500px]  mt-5 bg-secondary border-0">
					<CardContent className="grid  grid-flow-row">
						<CustomForm className="mt-3 px-8 " form={form} onSubmit={handleSubmit}>
							<div>
								<FormField
									control={form.control}
									name="nickname"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Ник'}</p>
											<InputField
												className="text-primary ml-1   "
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Имя'}</p>
											<InputField
												className="text-primary ml-1   "
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>

								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Фамилия'}</p>
											<InputField
												className="text-primary ml-1   "
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>
								<FormField
									control={form.control}
									name="patronymic"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Отчество'}</p>
											<InputField
												className="text-primary ml-1   "
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Телефон'}</p>
											<InputField
												className="text-primary ml-1   "
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Почта'}</p>
											<InputField
												className="text-primary ml-1   "
												type="email"
												isRequired
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<>
											<p className="text-primary ml-1 mt-3">{'Пароль'}</p>
											<InputField
												type={passwordShown ? 'text' : 'password'}
												className="mt-3  relative  "
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												suffixIcon={
													<Button
														type="button"
														variant="ghost"
														className="px-4 rounded-l-none rounded-r-xl absolute right-0"
														onClick={() =>
															setPasswordShown(!passwordShown)
														}
													>
														{passwordShown ? (
															<Eye
																size={20}
																strokeWidth={2.4}
																color={color}
															/>
														) : (
															<EyeOff
																size={20}
																strokeWidth={2.4}
																color={color}
															/>
														)}
													</Button>
												}
												{...field}
											/>
										</>
									)}
								/>
								<div className="text-accent-foreground 	reground ml-1 mt-3">
									<p className="text-primary mb-2">{'Пол'}</p>
									<div className="mb-2">
										<Checkbox
											label="Мужской"
											id="men"
											checked={gender == 'men' ? true : false}
											onCheckedChange={(e) => {
												if (e) {
													setGender('men');
												}
												if (!e) {
													setGender('');
												}
											}}
										/>
									</div>

									<Checkbox
										label="Женский"
										id="women"
										checked={gender == 'women' ? true : false}
										onCheckedChange={(e) => {
											if (e) {
												setGender('women');
											}
											if (!e) {
												setGender('');
											}
										}}
									/>
								</div>
							</div>

							<div className="mt-5 flex items-center justify-center">
								<Button
									onClick={() => {
										console.log(form.formState.errors);
									}}
									className="text-white"
									type="submit"
								>
									{isLoading ? <LoadingSpinner /> : 'Зарегистрироваться'}
								</Button>
							</div>
						</CustomForm>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
