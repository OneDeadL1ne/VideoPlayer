import { useMemo, useState } from "react";
import {
	Cell,
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from "@tanstack/react-table";

import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ArrowDown } from "lucide-react";
import { TablePagination } from "./table-pagination";

const SKELETON_ITEMS_COUNT = 5;

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	hasBackground?: boolean;
	onRowClick?: (rowData: TData) => void;
	searchSuffixIconClick?: () => void;
	searchPlaceholder?: string;
	columnVisibility?: VisibilityState;
	getTableInfo?: (
		pageSize: number,
		pageIndex: number,
		sorting: SortingState,
		filter: string
	) => void;
	paginationInfo?: { itemCount: number; pageSize: number; pageIndex: number };
	isLoading?: boolean;
}

function DataTable<TData, TValue>({
	columns,
	data,
	hasBackground,
	onRowClick,

	isLoading,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const tableData = useMemo(
		() => (isLoading ? Array(SKELETON_ITEMS_COUNT).fill({}) : data),
		[isLoading, data]
	);
	const tableColumns = useMemo(
		() =>
			isLoading
				? columns.map((column) => ({
						...column,
						cell: ({ cell }: { cell: Cell<unknown, unknown> }) => {
							const isActions = cell.column.id === "actions";
							const isId = cell.column.id === "id";
							const isSelect = cell.column.id === "select";
							if (isActions || isId) {
								return <Skeleton className="h-6 w-6" />;
							}

							return <Skeleton className={isSelect ? "h-4 w-4" : "h-6 w-[100px]"} />;
						},
				  }))
				: columns,
		[isLoading, columns]
	);
	const table = useReactTable({
		data: tableData,
		columns: tableColumns,

		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div
			className={`${
				hasBackground
					? "bg-white rounded-2xl mt-4 p-6 flex flex-wrap gap-4 items-center justify-start w-full"
					: ""
			}`}
		>
			<ScrollArea className="w-full">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id} className="text-primary uppercase">
										<div className="flex items-center">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
											{header.id !== "select" && header.id !== "actions" && (
												<Button
													variant="ghost"
													className={`py-0 px-1 ${
														header.column.getIsSorted() === "asc" ||
														!header.column.getIsSorted()
															? "rotate-0"
															: "rotate-180"
													}`}
													onClick={() => {
														if (!header.column.getIsSorted()) {
															console.log(
																header.column.getIsSorted()
															);

															header.column.toggleSorting(false);
														}
														header.column.toggleSorting(
															header.column.getIsSorted() === "asc"
														);
													}}
												>
													<ArrowDown />
												</Button>
											)}
										</div>
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className="hover:bg-neutral-200 data-[state=selected]:bg-neutral-300"
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									onClick={(e) => {
										const clickedColumnId = (
											e.target as HTMLTableRowElement
										).getAttribute("data-column-id");
										if (
											typeof onRowClick !== "undefined" &&
											clickedColumnId !== null
										) {
											onRowClick(row.original);
										}
									}}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={`text-[15px] `}
											data-column-id={cell.column.id}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									Ничего не найдено
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<ScrollBar orientation="horizontal" className="bg-primary" />
			</ScrollArea>
			<div className=" w-full flex items-center justify-end space-x-2 py-4">
				{table.getRowModel().rows?.length > 0 && <TablePagination table={table} />}
			</div>
		</div>
	);
}

export default DataTable;
