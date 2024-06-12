import { CardContent, Card } from '@/components/ui/card';

import CustomForm, { useForm } from '@/components/form/form';
import { InputField } from '@/components/input/input-field';

import { LoadingSpinner } from '@/components/spinner/spinner';
import { Button } from '@/components/ui/button';

import { FormField } from '@/components/ui/form';

import { z } from 'zod';

const formSchema = z.object({
	last_name: z.string().min(1, ''),
	first_name: z.string().min(1, ''),
	patronymic: z.string(),
	nickname: z.string().min(1, ''),
	phone: z.string().min(1, ''),
	id_role: z.number(),
	email: z.string().email().min(1, ''),
	password: z.string().min(1, ''),
	id_gender: z.number(),
});

export default function RegistrationPage() {
	const form = useForm({
		schema: formSchema,
		defaultValues: { first_name: '', last_name: '', patronymic: '', email: '', nickname: '' },
	});

	const handleSubmit = (data: {
		id_user: number;
		email: string;
		first_name: string;
		last_name: string;
		patronymic: string;
		nickname: string;
	}) => {
		console.log(data);
	};

	const isLoading = false;
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
											<p className="text-primary ml-1 mt-3">{'Отчетсво'}</p>
											<InputField
												className="text-primary ml-1   "
												classNameInput="border border-2 text-accent-foreground	 border-primary"
												{...field}
												//disabled={isAdding || isUpdating}
											/>
										</>
									)}
								/>
							</div>

							<div className="mt-5 flex items-center justify-center">
								<Button
									onClick={() => {
										//
									}}
									className="text-white"
									type="submit"
								>
									{isLoading ? <LoadingSpinner /> : 'Зарегистироваться'}
								</Button>
							</div>
						</CustomForm>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
