import { LoadingSpinner } from '@/components/loaders/spinner.tsx';
import { cn } from '@/lib/utils.ts';

export const PageLoader = ({ className }: { className?: string }) => (
	<div className={cn('w-full flex justify-center items-center h-[100%]', className)}>
		<LoadingSpinner className="w-16 h-16 text-accent-foreground" />
	</div>
);
