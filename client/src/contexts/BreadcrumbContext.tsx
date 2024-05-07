"use client"
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem.interface';

// Paso 2: Crear un nuevo contexto para el breadcrumb
const BreadcrumbContext = createContext({
  breadcrumb: [] as BreadcrumbItem[],
  addItem: (item: BreadcrumbItem) => { },
  addItems: (items: BreadcrumbItem[]) => { },
  setItems: (items: BreadcrumbItem[]) => { },
  clearItems: () => { },
  removeItem: (item: BreadcrumbItem) => { },
});

// Paso 3: Crear un proveedor para este contexto
export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([]);

  const addItem = useCallback((item: BreadcrumbItem) => {
    setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, item]);
  }, []);

  const addItems = useCallback((items: BreadcrumbItem[]) => {
    setBreadcrumb((prevBreadcrumb) => [...prevBreadcrumb, ...items]);
  }, []);

  const setItems = useCallback((items: BreadcrumbItem[]) => {
    setBreadcrumb(items);
  }, []);

  const clearItems = useCallback(() => {
    setBreadcrumb([]);
  }, []);

  const removeItem = useCallback((item: BreadcrumbItem) => {
    setBreadcrumb((prevBreadcrumb) => prevBreadcrumb.filter(bc => bc !== item));
  }, []);



  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, addItem, setItems, clearItems, addItems, removeItem }}>
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