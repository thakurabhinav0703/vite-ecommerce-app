import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import './Toast.css';

const Toast = () => {
  const { toast, setToast } = useCart();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon success-icon" size={20} />;
      case 'warning':
        return <AlertTriangle className="toast-icon warning-icon" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon info-icon" size={20} />;
    }
  };

  return (
    <div className={`toast-container toast-${toast.type} animate-fade-in`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={() => setToast(null)}>
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
