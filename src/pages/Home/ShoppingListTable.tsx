/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';

import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
  getFilteredRowModel,
  Table,
  Column,
} from '@tanstack/react-table';
import { CaretDown, CaretLeft, CaretLeftDouble, CaretRight, CaretRightDouble, CaretUp, Pencil, Plus } from '@/assets/Icons';
import Button from '@/components/Button';
import { useProductContext } from '@/contexts/product/ProductContext';
import { useAuthContext } from '@/contexts/auth/AuthContext';
import { useLocalizeContext } from '@/contexts/locale/LocalizeContext';
import Enums from '@/constants/Enums';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/configurations/firebase';
import { deleteShoppingListPopup } from '@/constants/PopupContents';
import Swal from 'sweetalert2';
import TextField from '@/components/TextField';
import { useNavigate } from 'react-router-dom';
import Notification from '@/components/Notification';
import Select from '@/components/Select';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const Filter = ({
  column,
  table,
  className,
}: {
  column: Column<any, any>
  table: Table<any>
  className?: string
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [
          e.target.value,
          old?.[1],
        ])}
        placeholder="Min"
        className="w-24 rounded border shadow"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e => column.setFilterValue((old: [number, number]) => [
          old?.[0],
          e.target.value,
        ])}
        placeholder="Max"
        className="w-24 rounded border shadow"
      />
    </div>
  ) : (
    <TextField
      className={className}
      inputClassName="h-8 md:w-36"
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder="Search..."
    />
  );
};

const ExpanderCell = ({ row, setExpanded }: { row: any; setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>> }) => (
  <>
    {row.original.subRows?.length !== undefined && (
      <span
        onClick={e => {
          e.stopPropagation();
          setExpanded((prev: any) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
        }}
        className="flex cursor-pointer select-none justify-end md:items-center md:justify-center"
      >
        <CaretRight className={`size-5 transition-all duration-200 ${row.getIsExpanded() ? 'rotate-90' : 'rotate-0'}`} />
      </span>
    )}
  </>
);

const AddButtonCell = ({ row, setSelectedShoppingList }: { row: any; setSelectedShoppingList: React.Dispatch<React.SetStateAction<{ state: boolean; id: string }>> }) => (
  <Button
    size="icon"
    className="group bg-transparent hover:bg-transparent"
    onClick={e => {
      e.stopPropagation();
      setSelectedShoppingList({ state: true, id: row?.original?.shoppingListId });
    }}
  >
    <Plus className="size-4 text-success/80 group-hover:text-success" />
  </Button>
);

const EditShoppingListButton = ({ row, setEditShoppingList }: { row: any; setEditShoppingList: React.Dispatch<React.SetStateAction<{ state: boolean; data: any }>> }) => (
  <Button
    size="icon"
    variant="ghost"
    className="group bg-transparent hover:bg-transparent"
    onClick={e => {
      e.stopPropagation();
      setEditShoppingList({ state: true, data: row.original });
    }}
  >
    <Pencil className="size-5 text-tra-tetriary/80 group-hover:text-tra-tetriary" />
  </Button>
);

const DeleteButtonCell = ({ row, handleDeleteList }: { row: any; handleDeleteList: (id: string) => void }) => (
  <Button
    size="icon"
    className="group relative bg-transparent hover:bg-transparent"
    onClick={e => {
      e.stopPropagation();
      handleDeleteList(row?.original?.shoppingListId);
    }}
  >
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 39 7"
        className="bin-top z-10 w-4 origin-right transition-transform duration-300 group-hover:rotate-45"
      >
        <line strokeWidth="4" className="stroke-error/80 group-hover:stroke-error" y2="5" x2="39" y1="5" />
        <line strokeWidth="3" className="stroke-error/80 group-hover:stroke-error" y2="1.5" x2="26.0357" y1="1.5" x1="12" />
      </svg>

      {/* Bin Bottom */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 33 39"
        className="bin-bottom z-10 w-4"
      >
        <mask id="path-1-inside-1_8_19" fill="white">
          <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.78086 39 0 37.2091 0 35V0Z" />
        </mask>
        <path
          mask="url(#path-1-inside-1_8_19)"
          className="fill-error/80 stroke-error/80 group-hover:fill-error group-hover:stroke-error"
          d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
        />
        <path strokeWidth="4" className="stroke-error/80 group-hover:stroke-error" d="M12 6L12 29" />
        <path strokeWidth="4" className="stroke-error/80 group-hover:stroke-error" d="M21 6V29" />
      </svg>
    </div>
  </Button>
);

const sortCreateDateFn = (rowA: any, rowB: any) => {
  const parseDate = (dateString: any) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('.');
    return new Date(`${year}-${month}-${day}T${timePart}`);
  };

  const dateA = parseDate(rowA.original.createDateTime);
  const dateB = parseDate(rowB.original.createDateTime);

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
};

const sortPlannedDateFn = (rowA: any, rowB: any) => {
  const parseDate = (dateString: any) => {
    if (!dateString) return new Date(0); // Geçersiz tarihleri sıralamak için en eski tarih
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`);
  };

  const dateA = parseDate(rowA.original.dateToShop);
  const dateB = parseDate(rowB.original.dateToShop);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Bugünün tarihini saat bilgisi olmadan al

  const isDateAInFuture = dateA >= today;
  const isDateBInFuture = dateB >= today;

  if (isDateAInFuture && isDateBInFuture) {
    // İkisi de gelecekteki tarihlerse, artan sırayla sıralayın
    return dateA.getTime() - dateB.getTime();
  } if (!isDateAInFuture && !isDateBInFuture) {
    // İkisi de geçmişteki tarihlerse, azalan sırayla sıralayın
    return dateB.getTime() - dateA.getTime();
  } if (isDateAInFuture && !isDateBInFuture) {
    // dateA gelecekte, dateB geçmişte
    return -1;
  }
  // dateA geçmişte, dateB gelecekte
  return 1;
};

const ShoppingListTable: React.FC<{
  rowData: any[];
  mobileFilterOpen: boolean;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
}> = ({ rowData, mobileFilterOpen, sorting, setSorting }) => {
  const { setSelectedShoppingList, setSelectedProduct, getAllShoppingList, setEditShoppingList } = useProductContext();
  const { allUsersInfo } = useAuthContext();
  const { t, locale } = useLocalizeContext();
  const navigate = useNavigate();
  const { success, error } = Notification();

  const [expanded, setExpanded] = useState<ExpandedState>({});

  const handleDeleteList = async (shoppingListId: string) => {
    const areYouSure = await Swal.fire(deleteShoppingListPopup(t));

    if (areYouSure.isConfirmed) {
      try {
        const docRef = doc(db, 'shopping-list', shoppingListId);
        await deleteDoc(docRef);
        success('Shopping list successfully deleted');
        getAllShoppingList(); // Alışveriş listelerini yeniden yükleyin
      } catch (catchError) {
        error('An error occurred while deleting the shopping list');
        console.error('Error occurred:', catchError);
      }
    }
  };

  const columns = React.useMemo(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }: { row: any }) => <ExpanderCell row={row} setExpanded={setExpanded} />,
      },
      {
        header: 'Shopping List Name',
        accessorKey: 'shoppingListName',
        cell: (info: any) => info.getValue(),
      },
      // {
      //   header: 'Add To Calendar',
      //   accessorKey: 'addToCalendar',
      //   cell: ({ row }: { row: any }) => (
      //     <AddToCalendarButton
      //       // hidden
      //       trigger="click"
      //       hideCheckmark
      //       size="2"
      //       buttonStyle="round"
      //       // customCss="color:red"
      //       label={t('Add to Calendar')}
      //       customLabels={{ apple: t('Apple Calendar'), google: t('Google Calendar'), outlook: t('Outlook Calendar') }}
      //       name={`${row?.original?.shoppingListName} ${t('Shopping List')}`}
      //       startDate={row?.original?.dateToShop}
      //       options={['Apple', 'Google', 'Outlook.com']}
      //       timeZone="Europe/Istanbul"
      //     />
      //   ),
      // },
      {
        header: 'Create Date Time',
        accessorKey: 'createDateTime',
        cell: (info: any) => info.getValue().split(':').slice(0, 2).join(':'),
        sortingFn: sortCreateDateFn,
      },
      {
        header: 'Creator Name',
        accessorKey: 'creatorId',
        cell: (info: any) => (
          <span>
            {allUsersInfo?.filter((e: any) => e.uid === info.getValue())?.[0].firstName}
          </span>
        ),
      },
      {
        header: 'Planned Shopping Date',
        accessorKey: 'dateToShop',
        cell: (info: any) => {
          const dateToShop = dayjs(info.getValue(), 'DD.MM.YYYY');
          const today = dayjs().startOf('day');
          const diffDays = dateToShop.diff(today, 'day');

          const formatDiff = (days: number) => {
            const years = Math.floor(days / 365);
            const months = Math.floor((days % 365) / 30);
            const remainingDays = days % 30;

            const yearStr = years > 0 ? `${years} ${t('year', { count: years })}` : '';
            const monthStr = months > 0 ? `${months} ${t('month', { count: months })}` : '';
            const dayStr = remainingDays > 0 ? `${remainingDays} ${t('day', { count: remainingDays })}` : '';

            return [yearStr, monthStr, dayStr].filter(Boolean).join(' ');
          };

          if (diffDays > 0) {
            return (
              <span className="flex flex-col text-sm md:text-start">
                <span>{dateToShop.format('DD.MM.YYYY')}</span>
                <span>{`(${formatDiff(diffDays)} ${t('after')})`}</span>
              </span>
            );
          } if (diffDays < 0) {
            return (
              <span className="flex flex-col text-sm md:text-start">
                <span>{dateToShop.format('DD.MM.YYYY')}</span>
                <span>{`(${formatDiff(Math.abs(diffDays))} ${t('ago')})`}</span>
              </span>
            );
          }
          return (
            <span className="flex flex-col text-sm md:text-start">
              <span className="text-base font-bold">{t('Today')}</span>
              <span>{dateToShop.format('DD.MM.YYYY')}</span>
            </span>
          );
        },
        sortingFn: sortPlannedDateFn,
      },
      {
        id: 'addNewProduct',
        header: () => null,
        cell: ({ row }: { row: any }) => (
          <div className="mt-4 grid grid-cols-2 items-center justify-between gap-2 md:mt-0 md:grid-cols-3 md:justify-end">
            <AddToCalendarButton
              // hidden
              trigger="click"
              hideBackground
              hideCheckmark
              size="2"
              buttonStyle="round"
              // customCss="color:red"
              label={t('Add to Calendar')}
              customLabels={{ apple: t('Apple Calendar'), google: t('Google Calendar'), outlook: t('Outlook Calendar') }}
              name={`${row?.original?.shoppingListName} ${t('Shopping List')}`}
              startDate={row?.original?.dateToShop}
              options={['Apple', 'Google', 'Outlook.com']}
              timeZone="Europe/Istanbul"
            />
            {row.original.subRows?.length !== undefined && (
              <Button
                size="sm"
                className="h-11 px-2"
                onClick={e => {
                  e.stopPropagation();
                  const shoppingListId = row?.original?.shoppingListId;
                  navigate(`/go-shopping?shoppingListId=${shoppingListId}`);
                }}
              >
                {t('Go Shopping')}
              </Button>
            )}
            <div className="col-span-2 flex justify-end md:col-span-1 md:block">
              <AddButtonCell row={row} setSelectedShoppingList={setSelectedShoppingList} />
              <DeleteButtonCell row={row} handleDeleteList={handleDeleteList} />
              <EditShoppingListButton row={row} setEditShoppingList={setEditShoppingList} />
            </div>
          </div>
        ),
      },
    ],
    [allUsersInfo],
  );

  const subColumns: any = React.useMemo(
    () => [
      {
        header: 'Product Name',
        accessorKey: 'productName',
        cell: ({ row }: { row: any }) => row.productName,
      },
      {
        header: 'Product Brand',
        accessorKey: 'productBrand',
        cell: ({ row }: { row: any }) => (row.productBrand !== '' ? row.productBrand : '-'),
      },
      {
        header: 'Product Quantity',
        accessorKey: 'productQuantity',
        cell: ({ row }: { row: { productQuantity: number; quantityType: keyof typeof Enums.QuantityTypeLabel } }) => `${row.productQuantity} ${t(Enums.QuantityTypeLabel[row.quantityType])}`,
      },
      {
        header: 'Create Date Time',
        accessorKey: 'createDateTime',
        cell: ({ row }: { row: any }) => row.createDateTime.split(':').slice(0, 2).join(':'),
      },
      {
        header: 'Creator Name',
        accessorKey: 'creatorId',
        cell: ({ row }: { row: any }) => (
          <span>
            {allUsersInfo?.filter((e: any) => e.uid === row.creatorId)?.[0].firstName}
          </span>
        ),
      },
      {
        header: 'Product Category',
        accessorKey: 'productCategory',
        cell: ({ row }: { row: { productCategory: keyof typeof Enums.ProductCategory } }) => t(Enums.ProductCategory[row.productCategory]),
      },
      {
        header: 'Note',
        accessorKey: 'note',
        cell: ({ row }: { row: any }) => <div className="max-w-48 truncate text-start hover:whitespace-break-spaces">{row.note !== '' ? row.note : '-'}</div>,
      },
      {
        id: 'editProduct',
        header: () => null,
        cell: ({ row }: { row: any }) => (
          <Button
            size="icon"
            variant="ghost"
            className="group bg-transparent hover:bg-transparent"
            onClick={() => setSelectedProduct({ state: true, data: row, documentId: row.shoppingListId })}
          >
            <Pencil className="size-5 text-tra-tetriary/80 group-hover:text-tra-tetriary" />
          </Button>
        ),
      },
    ],
    [allUsersInfo],
  );

  const data = React.useMemo(
    () => rowData.map(item => ({
      shoppingListId: item.shoppingListId,
      shoppingListName: item.shoppingListName,
      createDateTime: item.createDateTime,
      creatorId: item.creatorId,
      dateToShop: item.dateToShop,
      subRows: item?.shoppingList?.map((product: any) => ({
        productName: product.productName,
        productQuantity: product.productQuantity,
        createDateTime: product.createDateTime,
        creatorId: product.creatorId,
        note: product.note,
        isItBought: product.isItBought,
        productBrand: product.productBrand,
        productCategory: product.productCategory,
        quantityType: product.quantityType,
        productId: product.productId,
        shoppingListId: item.shoppingListId,
      })),
    })),
    [rowData],
  );

  const table = useReactTable({
    data,
    columns,
    state: { expanded, sorting },
    onExpandedChange: setExpanded,
    getSubRows: row => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getExpandedRowModel: getExpandedRowModel(),
    initialState: {
      pagination: {
        pageSize: window.innerWidth < 768 ? data.length : 10, // Show all items on mobile
      },
    },
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        table.setPageSize(data.length); // Show all items on mobile
      } else {
        table.setPageSize(10); // Default page size for larger screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial page size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data.length, table]);

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="mobile-responsive md:hidden">
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileFilterOpen ? 'mb-4 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {table.getHeaderGroups().map(headerGroup => (
            <div key={headerGroup.id} className="grid grid-cols-2 gap-2">
              {headerGroup.headers.map(header => (
                <div key={header.id} className={`col-span-1 rounded-md bg-tra-neutral-light p-2 text-xs ${!header.column.getCanSort() && 'hidden'}`}>
                  <div
                    className={
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === 'asc'
                          ? 'Sort ascending'
                          : header.column.getNextSortingOrder() === 'desc'
                            ? 'Sort descending'
                            : 'Clear sort'
                        : undefined
                    }
                  >
                    {t(flexRender(header.column.columnDef.header, header.getContext()))}
                    {/* {typeof flexRender(header.column.columnDef.header, header.getContext()) === 'string' && (
                    <span className={`flex items-center ${header?.index !== 1 && 'justify-center'} `}>
                      {header.column.getIsSorted() && (header.column.getIsSorted() === 'asc' ? <CaretUp className="ml-2" /> : <CaretDown className="ml-2" />)}
                    </span>
                  )} */}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter className={`${header?.index !== 1 && 'items-center'}`} column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {table.getRowModel().rows
          .filter(row => row.depth === 0)
          .map(row => (
            <React.Fragment key={row.id}>
              <div className={`${!row.getIsExpanded() ? 'mb-4' : 'rounded-b-none'} grid grid-cols-2 rounded-md bg-tra-primary-5/70 py-2`}>
                {row.getVisibleCells().map((cell, i) => {
                  // Only show shoppingListName and dateToShop when not expanded
                  const columnId = table.getHeaderGroups()[0].headers[i]?.column.id;
                  if (!row.getIsExpanded()
                    && columnId !== 'shoppingListName'
                    && columnId !== 'dateToShop'
                    && columnId !== 'addNewProduct'
                    && columnId !== 'expander') {
                    return null;
                  }

                  return (
                    <div
                      key={cell.id}
                      className={cn(
                        'flex items-center px-3 py-0.5 hover:brightness-125',
                        columnId === 'addNewProduct' && 'col-span-2',
                        // columnId === 'dateToShop' && 'col-span-2',
                        columnId === 'creatorId' && 'hidden',
                        columnId === 'createDateTime' && 'hidden',
                        columnId === 'expander' && 'col-span-2 justify-end',
                      )}
                    >
                      {/* <span>
                          {t(flexRender(table.getHeaderGroups()[0].headers[i]?.column.columnDef.header, table.getHeaderGroups()[0].headers[i]?.getContext()))}
                        </span> */}
                      <span className="w-full">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                    </div>
                  );
                })}
              </div>
              {
                row.getIsExpanded() && (
                  <div className={`mb-4 rounded-b-md opacity-0 transition-all duration-500 ${row.getIsExpanded() && 'opacity-100'}`}>
                    {row.original.subRows?.map((subRow: any, subRowIndex: number) => (
                      <div key={subRowIndex} className={`border-b-4 ${subRow.isItBought ? 'bg-success/10 bg-check-image dark:bg-success/30' : 'bg-tra-neutral-light'}`}>
                        {subColumns.map((subColumn: any, index: number) => (
                          <div key={index} className="flex items-center justify-between px-3 py-2">
                            <span>{typeof flexRender(subColumn.header, {}) === 'string' && t(flexRender(subColumn.header, {}))}</span>
                            <span>{flexRender(subColumn.cell, { row: subRow })}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )
              }
            </React.Fragment>
          ))}
      </div>
      <div className="hidden md:table">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} colSpan={header.colSpan} className="bg-tra-primary-15 px-3 py-2 [&:nth-child(2)]:text-start">
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                          : undefined
                      }
                    >
                      {typeof flexRender(header.column.columnDef.header, header.getContext()) === 'string' && (
                        <span className={`flex items-center ${header?.index !== 1 && 'justify-center'} `}>
                          {t(flexRender(header.column.columnDef.header, header.getContext()))}
                          {header.column.getIsSorted() && ({
                            asc: <CaretUp className="ml-2" />,
                            desc: <CaretDown className="ml-2" />,
                          }[header.column.getIsSorted() as string] ?? null)}
                        </span>
                      )}
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter className={`${header?.index !== 1 && 'items-center'}`} column={header.column} table={table} />
                        </div>
                      ) : null}

                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows
              .filter(row => row.depth === 0)
              .map(row => (
                <React.Fragment key={row.id}>
                  <tr onClick={() => setExpanded((prev: any) => ({
                    ...prev,
                    [row.id]: !prev[row.id],
                  }))}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 py-2 text-center last:text-end [&:nth-child(2)]:text-start">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {
                    row.getIsExpanded() && (
                      <tr className={`opacity-0 transition-all duration-500 ${row.getIsExpanded() && 'opacity-100'}`}>
                        <td colSpan={columns.length} style={{ paddingLeft: '3.5rem' }}>
                          <table className="w-full">
                            <thead>
                              <tr>
                                {subColumns.map((subColumn: any, index: any) => (
                                  <th key={index} className="bg-tra-primary-15/80 px-3 py-2 text-base first:rounded-tl-md first:text-start last:rounded-tr-md">
                                    {typeof flexRender(subColumn.header, {}) === 'string' && t(flexRender(subColumn.header, {}))}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {row.original.subRows?.map((subRow: any, subRowIndex: number) => (
                                <tr key={subRowIndex}>
                                  {subColumns.map((subColumn: any, index: number) => (
                                    <td
                                      key={index}
                                      className={`${subRow?.isItBought ? 'bg-success/50' : 'bg-tra-primary-5/70'} px-3 py-2 
                                      text-center first:rounded-bl-md first:text-start last:rounded-br-md last:text-end`}
                                    >
                                      {flexRender(subColumn.cell, { row: subRow })}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )
                  }
                </React.Fragment>
              ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center gap-2 self-end">
          <Button
            variant="outlined"
            size="icon"
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <CaretLeftDouble className="size-5" />
          </Button>
          <Button
            variant="outlined"
            size="icon"
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <CaretLeft className="size-5" />
          </Button>
          <Button
            variant="outlined"
            size="icon"
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <CaretRight className="size-5" />
          </Button>
          <Button
            variant="outlined"
            size="icon"
            type="button"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <CaretRightDouble className="size-5" />
          </Button>
          <div>
            {locale === 'tr' ? 'Toplam' : 'Total'}
            {' '}
            {table.getRowModel().rows.length.toLocaleString()}
            {' '}
            {locale === 'tr' ? 'kayıttan' : 'of'}
            {' '}
            {table.getRowCount().toLocaleString()}
            {' '}
            {locale === 'tr' ? 'kayıt gösteriliyor' : 'Rows Showing'}
          </div>
          <span className="flex items-center gap-1">
            <div>{t('Page')}</div>
            <strong>
              {table.getState().pagination.pageIndex + 1}
              {' '}
              {locale === 'tr' ? 'toplam' : 'of'}
              {' '}
              {table.getPageCount()}
            </strong>
          </span>
          <span className="ml-2 flex items-center gap-2">
            <b>{t('Number of items to show:')}</b>
            <Select
              containerClassName="min-w-[100px]"
              selectClassName="h-8"
              value={table.getState().pagination.pageSize}
              options={[
                { value: 10, content: '10' },
                { value: 20, content: '20' },
                { value: 30, content: '30' },
                { value: 40, content: '40' },
                { value: 50, content: '50' }]}
              onChange={e => {
                table.setPageSize(Number(e));
              }}
              placeHolder="Select Page Size"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListTable;
