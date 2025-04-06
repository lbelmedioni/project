import React from 'react';

export function Select({ children, onChange, value, className }) {
  return (
    <select 
      className={`border p-2 rounded w-full ${className}`} 
      value={value} 
      onChange={onChange}
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
