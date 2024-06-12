import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	label?: string;
	type?: string;
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
	isRequired?: boolean;
	className?: string;
	classNameInput?: string;
	classNameLabel?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputProps>(function InputField(
	{
		type = 'text',
		label,
		suffixIcon,
		isRequired = false,
		className,
		classNameInput,
		classNameLabel,
		...props
	},
	ref
) {
	return (
		<FormItem className={cn(className)}>
			{label && (
				<FormLabel className={cn(isRequired ? 'label-required' : '', classNameLabelss)}>
					{label}
				</FormLabel>
			)}
			<FormControl>
				<Input
					type={type}
					ref={ref}
					{...props}
					suffixIcon={suffixIcon}
					className={classNameInput}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
});
