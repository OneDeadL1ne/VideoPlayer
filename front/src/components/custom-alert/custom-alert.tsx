import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ErrorInterface } from '@/types/fetch';

interface CustomAlertProps {
	message?: string;
	type?: 'error' | 'warning' | 'success' | 'regular' | 'select';
	className?: string;
	onAcceptClick?: () => void;
	onCancelClick?: () => void;
}

export function CustomAlert({
	message,
	type = 'error',
	onAcceptClick,
	onCancelClick,
	className,
}: CustomAlertProps) {
	const isTypeSelect = type === 'select';

	return (
		<Alert
			variant={type}
			className={cn(
				isTypeSelect ? 'h-[121px] w-[380px]' : 'h-[60px] w-full',
				'h-fit',
				className
			)}
		>
			<div className="flex items-center gap-6 ">
				<AlertCircle
					className={cn('h-6 w-6 self-start', isTypeSelect && 'text-destructive')}
				/>
				<div className={isTypeSelect ? 'grid grid-rows-2' : 'grid grid-rows-1'}>
					<AlertDescription>{message || 'Ошибка'}</AlertDescription>
					{isTypeSelect && (
						<div className="flex justify-center gap-7">
							<Button
								className="h-[40px] rounded-xl w-[120px]"
								onClick={onCancelClick}
							>
								Нет
							</Button>
							<Button
								className="h-[40px] rounded-xl w-[120px] bg-background border-[1px] border-[#E8E9EB] border-solid hover:bg-transparent text-destructive"
								onClick={onAcceptClick}
							>
								Да
							</Button>
						</div>
					)}
				</div>
			</div>
		</Alert>
	);
}

export const ErrorCustomAlert = ({
	error,
	className,
}: {
	error?: FetchBaseQueryError | SerializedError | undefined;
	className?: string;
}) => {
	const errorData = error as { status: number; data: ErrorInterface };

	return (
		<CustomAlert
			className={cn('mt-3', className)}
			message={errorData.data ? errorData.data.message : 'Ошибка'}
		/>
	);
};
