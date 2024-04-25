import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RefreshButton from "../refresh-button/refresh-button.tsx";
import { Button } from "../ui/button.tsx";

interface PageLayoutProps {
	title?: string;
	subtitle?: string;
	backButtonEnabled?: boolean;
	actionButton?: React.ReactNode;

	rightBlock?: React.ReactNode;
	onRefreshClick?: () => void;
	isLoading?: boolean;
	children?: React.ReactNode;
}

export const PageLayout = ({
	title,
	subtitle,
	backButtonEnabled = false,
	actionButton,

	rightBlock,
	onRefreshClick,
	isLoading,
	children,
}: PageLayoutProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col p-7 w-full">
			<div className="flex justify-between items-start mb-10">
				<div>
					<div className="flex items-center justify-start font-[700] font-pop text-[28px] gap-3">
						{backButtonEnabled && (
							<Button
								className="text-foreground"
								variant={"link"}
								onClick={() => navigate(-1)}
							>
								<ChevronLeft />
							</Button>
						)}
						<h1>{title}</h1>
						{actionButton}
						{typeof onRefreshClick !== "undefined" && (
							<RefreshButton onClick={onRefreshClick} isLoading={isLoading} />
						)}
					</div>
					{subtitle && <p className="font-medium text-body-light">{subtitle}</p>}
				</div>
				{rightBlock}
			</div>
			{children}
		</div>
	);
};
