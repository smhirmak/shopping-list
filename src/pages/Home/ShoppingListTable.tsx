import React from 'react';

import {
  Column,
  Table,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import { CaretRight } from '@/assets/Icons';

const ShoppingListTable: React.FC<{ rowData: any[] }> = ({ rowData }) => {
  console.log(rowData);
  const columns = React.useMemo(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => (
          <span
            {...{
              onClick: row.getToggleExpandedHandler(),
              className: 'cursor-pointer select-none flex justify-center items-center',
            }}
          >
            <CaretRight className={`size-5 transition-all duration-200 ${row.getIsExpanded() ? 'rotate-90' : 'rotate-0'}`} />
          </span>
        ),
      },
      {
        header: 'Shopping List Id',
        accessorKey: 'shoppingListId',
        cell: info => info.getValue(),
      },
      {
        header: 'Shopping List Name',
        accessorKey: 'shoppingListName',
        cell: info => info.getValue(),
      },
      {
        header: 'Create Date Time',
        accessorKey: 'createDateTime',
        cell: info => info.getValue(),
      },
      {
        header: 'Create Id',
        accessorKey: 'creatorId',
        cell: info => info.getValue(),
      },
      {
        header: 'Date To Shop',
        accessorKey: 'dateToShop',
        cell: info => info.getValue(),
      },
    ],
    [],
  );

  const subColumns = React.useMemo(
    () => [
      {
        header: 'Product Name',
        accessorKey: 'productName',
      },
      {
        header: 'Product Brand',
        accessorKey: 'productBrand',
      },
      {
        header: 'Product Quantity',
        accessorKey: 'productQuantity',
      },
      {
        header: 'Quantity Type',
        accessorKey: 'quantityType',
      },
      {
        header: 'Create Date Time',
        accessorKey: 'createDateTime',
      },
      {
        header: 'Create Id',
        accessorKey: 'creatorId',
      },
      {
        header: 'Note',
        accessorKey: 'note',
      },
      {
        header: 'Product Category',
        accessorKey: 'productCategory',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => rowData.map(item => ({
      shoppingListId: item.shoppingListId,
      shoppingListName: item.shoppingListName,
      createDateTime: item.createDateTime,
      creatorId: item.creatorId,
      dateToShop: item.dateToShop,
      subRows: item?.shoppingList?.map(product => ({
        productName: product.productName,
        productQuantity: product.productQuantity,
        createDateTime: product.createDateTime,
        creatorId: product.creatorId,
        note: product.note,
        productBrand: product.productBrand,
        productCategory: product.productCategory,
        quantityType: product.quantityType,
      })),
    })),
    [rowData],
  );

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan} style={{ border: '1px solid', padding: '6px' }}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows
            .filter(row => row.depth === 0) // Yalnızca ana satırları al
            .map(row => (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={{ border: '1px solid', padding: '6px' }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length} style={{ paddingLeft: '3.5rem' }}>
                      <table className="w-full">
                        <thead>
                          <tr>
                            {subColumns.map(subColumn => (
                              <th key={subColumn.id} style={{ border: '1px solid', padding: '6px' }}>
                                {flexRender(subColumn.header, {})}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {row.original.subRows?.map((subRow, subRowIndex) => (
                            <tr key={subRowIndex}>
                              {subColumns.map(subColumn => (
                                <td key={subColumn.id} style={{ border: '1px solid', padding: '6px' }}>
                                  {subRow[subColumn.accessorKey]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};
// const Filter = ({
//   column,
//   table,
// }: {
//   column: Column<any, any>
//   table: Table<any>
// }) => {
//   const firstValue = table
//     .getPreFilteredRowModel()
//     .flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={e => column.setFilterValue((old: [number, number]) => [
//           e.target.value,
//           old?.[1],
//         ])}
//         placeholder="Min"
//         className="w-24 rounded border shadow"
//       />
//       <input
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={e => column.setFilterValue((old: [number, number]) => [
//           old?.[0],
//           e.target.value,
//         ])}
//         placeholder="Max"
//         className="w-24 rounded border shadow"
//       />
//     </div>
//   ) : (
//     <input
//       type="text"
//       value={(columnFilterValue ?? '') as string}
//       onChange={e => column.setFilterValue(e.target.value)}
//       placeholder="Search..."
//       className="w-36 rounded border shadow"
//     />
//   );
// };

export default ShoppingListTable;
