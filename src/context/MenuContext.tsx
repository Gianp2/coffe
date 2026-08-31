import React, { createContext, useContext, useState, useRef } from 'react';
import { Category, Product, CafeSettings, CategoryId, DietaryTag } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/initialMenu';
import { smoothScrollToElement } from '../utils/smoothScroll';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'amber';
}

interface MenuContextType {
  categories: Category[];
  products: Product[];
  settings: CafeSettings;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
  selectedTag: DietaryTag | 'Todos';
  setSelectedTag: (tag: DietaryTag | 'Todos') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  // Selected dish detail modal
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;

  // Currency formatter
  formatPrice: (amount: number) => string;

  // Programmatic smooth scroll to category
  scrollToCategory: (catId: CategoryId) => void;
  isProgrammaticScroll: boolean;
  highlightedCategory: CategoryId | null;

  // Global Toast Alert
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'info' | 'amber') => void;
  hideToast: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [settings] = useState<CafeSettings>(INITIAL_SETTINGS);

  const [activeCategory, setActiveCategory] = useState<CategoryId>('cafes-calientes');
  const [selectedTag, setSelectedTag] = useState<DietaryTag | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false);
  const [highlightedCategory, setHighlightedCategory] = useState<CategoryId | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Global Toast state
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formatPrice = (amount: number) => {
    return `${settings.currencySymbol} ${amount.toLocaleString('es-AR')}`;
  };

  const showToast = (message: string, type: 'success' | 'info' | 'amber' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    
    setToast({
      id: Math.random().toString(),
      message,
      type,
    });

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const hideToast = () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(null);
  };

  const scrollToCategory = (categoryId: CategoryId) => {
    const hadFilter = searchQuery.trim() !== '' || selectedTag !== 'Todos';
    if (hadFilter) {
      setSearchQuery('');
      setSelectedTag('Todos');
    }

    setActiveCategory(categoryId);
    setIsProgrammaticScroll(true);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);

    const delay = hadFilter ? 80 : 20;

    setTimeout(() => {
      const targetElement = document.getElementById(`category-${categoryId}`);
      if (targetElement) {
        smoothScrollToElement(targetElement, {
          offset: 68,
          onComplete: () => {
            setHighlightedCategory(categoryId);
            
            scrollTimeoutRef.current = setTimeout(() => {
              setIsProgrammaticScroll(false);
            }, 100);

            highlightTimeoutRef.current = setTimeout(() => {
              setHighlightedCategory(null);
            }, 1200);
          },
        });
      } else {
        setIsProgrammaticScroll(false);
      }
    }, delay);
  };

  return (
    <MenuContext.Provider
      value={{
        categories,
        products,
        settings,
        activeCategory,
        setActiveCategory,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        formatPrice,
        scrollToCategory,
        isProgrammaticScroll,
        highlightedCategory,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
