"use client"
import { createContext, ReactNode, useContext, useState } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem.interface';

// Paso 2: Crear un nuevo contexto para el breadcrumb
const BreadcrumbContext = createContext({
    breadcrumb: [] as BreadcrumbItem[],
    addItem: (item: BreadcrumbItem) => {},
    addItems: (items: BreadcrumbItem[]) => {},
    removeItem: (item: BreadcrumbItem) => {},
});

// Paso 3: Crear un proveedor para este contexto
export const BreadcrumbProvider = ({ children }: {children: ReactNode}) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  const addItem = (item: BreadcrumbItem) => {
    setBreadcrumb([...breadcrumb, item]);
  };

  const addItems = (items: BreadcrumbItem[]) => {
    setBreadcrumb([...breadcrumb, ...items]);
  };

  const removeItem = (item: BreadcrumbItem) => {
    setBreadcrumb(breadcrumb.filter(bc => bc !== item));
  };

  const setItems = (items: BreadcrumbItem[]) => {
    setBreadcrumb(items);
  }

  const clearItems = () => {
    setBreadcrumb([]);
  }
  

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, addItem, addItems, removeItem }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

// Paso 5: Crear un hook personalizado que utilice este contexto
export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumb debe ser usado dentro de un BreadcrumbProvider');
  }
  return context;
};