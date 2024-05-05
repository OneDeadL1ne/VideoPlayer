import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils.ts';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getCurrentColor } from '@/utils/helpers';

interface RefreshButtonProps {
	isLoading?: boolean;
	onClick: () => void;
}

const RefreshButton = ({ onClick, isLoading }: RefreshButtonProps) => {
	const [isSpinning, setIsSpinning] = useState(false);

	const handleClick = () => {
		setIsSpinning(true);
		onClick();
	};

	useEffect(() => {
		if (!isLoading) {
			setIsSpinning(false);
		}
	}, [isLoading]);

	const { theme } = useAppSelector((s) => s.theme);
	const [color, setColor] = useState(theme);
	useEffect(() => {
		setColor(getCurrentColor());
	}, [theme]);

	return (
		<Button
			variant="outline"
			size="icon"
			className="bg-secondary border-0 rounded-3xl flex items-center justify-center p-[7px] size-8"
			onClick={handleClick}
		>
			<div className={cn(isSpinning && isLoading && 'animate-spin')}>
				<RefreshCw color={color} size={17} />
			</div>
		</Button>
	);
};

export default RefreshButton;
