import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { Card, CardContent } from '../ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TabPage {
	value: string;
	head: string;
	count?: number;
	isDialog?: boolean;
	content: ReactElement;
}

export interface TabsProps {
	tabs: TabPage[];
	initialTab?: TabPage;
	getCurrentPage?: (value: string) => void;
	setDialogOpen?: Dispatch<SetStateAction<boolean>>;
	loading?: boolean;
}

export default function CustomTabs({
	tabs,
	initialTab = tabs[0],
	getCurrentPage,
	setDialogOpen,
	loading,
}: TabsProps) {
	return (
		<Tabs
			defaultValue={initialTab.value}
			className="overflow-auto w-full h-full"
			onValueChange={getCurrentPage}
		>
			<ScrollArea className="w-full">
				<TabsList className="gap-2 ml-7 mb-3">
					{tabs.map((tab, key) => (
						<TabsTrigger
							key={key}
							value={tab.value}
							className={
								tabs[0].isDialog
									? 'data-[state=active]:text-primary   uppercase'
									: ''
							}
						>
							{loading ? (
								<div className="flex gap-2">
									<Skeleton className="w-[85px] h-6 mt-2 rounded-xl" />
									<Skeleton className="w-[85px] h-6 mt-2 rounded-xl" />
									<Skeleton className="w-[85px] h-6 mt-2 rounded-xl" />
								</div>
							) : (
								<>
									{tab.head}
									{typeof tab.count !== 'undefined' && (
										<div className="ml-2 px-1 py-[2px] bg-border rounded-md">
											<p className="text-body-light text-xs">{tab.count}</p>
										</div>
									)}
								</>
							)}
						</TabsTrigger>
					))}
				</TabsList>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<Separator className="w-full bg-[#E8E9EB]" decorative />
			{tabs.map((tab, key) => {
				if (tab.isDialog) {
					return (
						<TabsContent
							key={key}
							value={tab.value}
							className="w-full border-0  focus-visible:ring-offset-0 focus-visible:ring-0 ring-0 "
						>
							<ScrollArea className="w-full max-h-[691px]">
								{React.cloneElement(tab.content, {
									setDialogOpen,
								})}
								<ScrollBar orientation="vertical" />
							</ScrollArea>
						</TabsContent>
					);
				} else {
					return (
						<TabsContent key={key} value={tab.value} className="w-full mt-8 ">
							<Card className="p-5 content-center rounded-2xl ">
								<CardContent className="p-0">{tab.content}</CardContent>
							</Card>
						</TabsContent>
					);
				}
			})}
		</Tabs>
	);
}
