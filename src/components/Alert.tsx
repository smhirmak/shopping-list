import React, { useState } from 'react';

interface PopupProps {
  title: string;
  text: string;
  confirmText: string;
  cancelText: string;
}

const Popup = ({ title, text, confirmText, cancelText }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<((value: { isConfirmed: boolean }) => void) | null
  >(null);

  const show = (options: PopupProps): Promise<{ isConfirmed: boolean }> => {
    setIsVisible(true);
    return new Promise(resolve => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    if (resolvePromise) resolvePromise({ isConfirmed: true });
    setIsVisible(false);
  };

  const handleCancel = () => {
    if (resolvePromise) resolvePromise({ isConfirmed: false });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="dark:bg-card-bg mx-auto max-w-lg rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-primary-light dark:text-darkenWhite mb-4 text-2xl font-semibold">
          {title}
        </h2>
        <p className="dark:text-darkenWhite mb-6 text-black">
          {text}
        </p>
        <div className="flex w-full justify-between px-8 py-4">
          <button
            onClick={handleCancel}
            className="border-primary-light text-primary-light dark:text-primary-dark order-1 w-[45%] rounded-md border bg-transparent py-3 text-lg font-semibold"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="bg-primary-light dark:bg-primary-dark order-2 w-[45%] rounded-md py-3 text-lg font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Popup bileşenini dışarıdan kullanabilmek için instance'ını oluşturuyoruz
const popupInstance = React.createRef<any>();

export const showPopup = (options: PopupProps) => {
  if (popupInstance.current) {
    return popupInstance.current.show(options);
  }
  return Promise.resolve({ isConfirmed: false });
};

// Popup bileşenini ana uygulama bileşenine ekliyoruz
export const PopupProvider = () => <Popup ref={popupInstance} />;
