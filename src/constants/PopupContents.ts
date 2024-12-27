/* eslint-disable @typescript-eslint/no-explicit-any */
export const deleteShoppingListPopup = (t: any) => ({
  title: (t('Are you sure?')),
  text: (t('Do you want to delete the shopping list?')),
  showCancelButton: true,
  confirmButtonText: (t('Yes, Delete List')),
  cancelButtonText: (t('No, Don\'t Delete List')),
  buttonsStyling: false,
  customClass: {
    container: 'z-1500',
    confirmButton: 'order-2 bg-error w-[45%] text-white py-3 text-sm md:text-lg font-semibold rounded-md',
    cancelButton: 'order-1 bg-transparent border border-tra-neutral-black text-tra-neutral-black w-[45%] py-3 text-sm md:text-lg font-semibold rounded-md',
    actions: 'w-full flex justify-between px-8 py-4',
    title: 'text-2xl text-tra-neutral-black',
    popup: 'rounded-3xl bg-tra-neutral-light',
    htmlContainer: '!text-tra-neutral-black',
  },
});

export const deleteProductPopup = (t: any) => ({
  title: (t('Are you sure?')),
  text: (t('Do you want to delete the product?')),
  showCancelButton: true,
  confirmButtonText: (t('Yes, Delete Product')),
  cancelButtonText: (t('No, Don\'t Delete Product')),
  buttonsStyling: false,
  customClass: {
    container: 'z-1500',
    confirmButton: 'pointer-events-auto order-2 bg-error w-[45%] text-white py-3 text-sm md:text-lg font-semibold rounded-md',
    cancelButton: 'pointer-events-auto order-1 bg-transparent border border-tra-neutral-black text-tra-neutral-black w-[45%] py-3 text-sm md:text-lg font-semibold rounded-md',
    actions: 'w-full flex justify-between px-8 py-4',
    title: 'text-2xl text-tra-neutral-black',
    popup: 'rounded-3xl bg-tra-neutral-light',
    htmlContainer: '!text-tra-neutral-black',
  },
});
