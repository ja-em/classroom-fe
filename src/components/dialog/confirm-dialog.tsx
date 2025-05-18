'use client';

import { useEffect, useRef } from 'react';

export const ConfirmDialog = ({
  open,
  onOpenChange,
  onConfirm,
  confirmLabel,
  cancelLabel,
  dialogTitle,
  dialogDesc,
  dialogId,
  loading,
}: {
  open: boolean;
  dialogId: string;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  dialogTitle?: string;
  dialogDesc?: string;
  loading?: boolean;
}) => {
  const DIALOG_ID = dialogId;

  const dialogRef = useRef<HTMLDialogElement>(null);
  // dialogRef.current.sh
  useEffect(() => {
    dialogRef.current = document.getElementById(DIALOG_ID) as HTMLDialogElement;
  }, []);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <dialog id={DIALOG_ID} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{dialogTitle}</h3>
        <p className="py-4">{dialogDesc}</p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelLabel ?? 'Cancel'}
          </button>
          <button
            className="btn btn-neutral"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <span className="loading loading-spinner" />}
            {confirmLabel ?? 'OK'}
          </button>
        </div>
      </div>
    </dialog>
  );
};
