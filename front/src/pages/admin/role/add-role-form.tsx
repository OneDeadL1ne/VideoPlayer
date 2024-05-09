import { Dispatch, SetStateAction, useMemo } from 'react';

import { z } from 'zod';

import { ErrorCustomAlert } from '@/components/custom-alert/custom-alert.tsx';
import CustomForm, { useForm } from '@/components/form/form.tsx';

import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { Button } from '@/components/ui/button.tsx';
import { FormField } from '@/components/ui/form.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';

import { useErrorToast } from '@/hooks/use-error-toast.tsx';
import { useSuccessToast } from '@/hooks/use-success-toast.tsx';

import { InputField } from '@/components/input/input-field';
import { RoleInterface } from '@/types/role';
import { useCreateRoleMutation, useUpdateRoleMutation } from '@/redux/api/role';

const formSchema = z.object({
	role_name: z.string().min(1, ''),
});

interface AddGenreFormProps {
	role?: RoleInterface;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
}

const AddRoleForm = ({ role, setDialogOpen }: AddGenreFormProps) => {
	const form = useForm({
		schema: formSchema,
		defaultValues: !role ? { role_name: '' } : { role_name: role.role_name },
	});

	const [addRole, { isLoading: isAdding, error: addError, isSuccess: addSuccess }] =
		useCreateRoleMutation();

	const [updateRole, { isLoading: isUpdating, error: updateError, isSuccess: updateSuccess }] =
		useUpdateRoleMutation();

	const handleSubmit = (data: { role_name: string }) => {
		if (role) {
			updateRole({ id_role: role?.id_role, ...data });
		} else {
			addRole(data);
		}
	};

	const addSuccessMsg = useMemo(() => {
		return 'Роль добавлена';
	}, []);

	const updateSuccessMsg = useMemo(() => {
		return 'Роль изменена';
	}, []);

	useSuccessToast(addSuccessMsg, addSuccess, setDialogOpen);
	useSuccessToast(updateSuccessMsg, updateSuccess, setDialogOpen);
	useErrorToast(void 0, addError);

	return (
		<CustomForm className="mt-3 px-8 pb-8 border-0" form={form} onSubmit={handleSubmit}>
			<ScrollArea className="w-full h-[150px]">
				<FormField
					control={form.control}
					name="role_name"
					render={({ field }) => (
						<InputField
							className="text-accent-foreground ml-1 "
							classNameInput="border border-input"
							label={'Название'}
							isRequired
							{...field}
							disabled={isAdding || isUpdating}
						/>
					)}
				/>

				{addError && <ErrorCustomAlert error={addError} className="mt-3" />}
				{updateError && <ErrorCustomAlert error={updateError} className="mt-3" />}
				<Button
					className="mt-5  ml-1 text-white"
					type="submit"
					disabled={isAdding || isUpdating}
				>
					{isAdding || isUpdating ? (
						<LoadingSpinner className="text-white" />
					) : !role ? (
						'Добавить'
					) : (
						'Изменить'
					)}
				</Button>
			</ScrollArea>
		</CustomForm>
	);
};

export default AddRoleForm;
