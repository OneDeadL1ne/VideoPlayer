import { Dispatch, ReactNode, SetStateAction } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import PlusButton from '../plus-button/plus-button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '../ui/dialog';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

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
	setOpen?: Dispatch<SetStateAction<boolean>>;
	className?: string;
}

const DialogWindow = ({
	header,
	trigger = <PlusButton />,
	triggerPermissions = [],
	content,
	open,
	setOpen,
	size,
	className,
}: DialogWindowProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent
				className={cn(dialogVariants({ size }), className)}
				onOpenAutoFocus={(e) => e.preventDefault}
				closeIcon={<X />}
			>
				<DialogHeader>{header}</DialogHeader>
				{content}
			</DialogContent>
		</Dialog>
	);
};

DialogWindow.displayName = 'DialogWindow';

export default DialogWindow;
