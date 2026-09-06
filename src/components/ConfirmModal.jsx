export default function ConfirmModal({ open, title, body, confirmLabel, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="dialog">
        <div className="dialog-title">{title}</div>
        <div className="dialog-body">{body}</div>
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
