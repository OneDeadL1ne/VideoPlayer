import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import PlusButton from '../plus-button/plus-button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentColor } from '@/utils/helpers';

const dialogVariants = cva('', {
	variants: {
		size: {
			default: 'sm:max-w-[600px] p-0',
			md: 'sm:max-w-[820px]',
			lg: 'sm:max-w-[1100px]',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface DialogWindowProps extends VariantProps<typeof dialogVariants> {
	header?: ReactNode;
	trigger?: ReactNode | null;
	triggerPermissions?: [];
	content: ReactNode;
	open?: boolean;
	disabled?: boolean;

	setOpen?: Dispatch<SetStateAction<boolean>>;
	className?: string;
}

const DialogWindow = ({
	header,
	trigger = <PlusButton />,
	//triggerPermissions = [],
	content,
	disabled,
	open,
	setOpen,
	size,
	className,
}: DialogWindowProps) => {
	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);

	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{!disabled && (
				<DialogTrigger disabled={disabled} asChild>
					{trigger}
				</DialogTrigger>
			)}
			<DialogContent
				className={cn(dialogVariants({ size }), className)}
				onOpenAutoFocus={(e) => e.preventDefault}
				closeIcon={<X color={color} />}
			>
				<DialogHeader>{header}</DialogHeader>
				{content}
			</DialogContent>
		</Dialog>
	);
};

DialogWindow.displayName = 'DialogWindow';

export default DialogWindow;
