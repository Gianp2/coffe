import React, { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';
import { ProductCard } from './ProductCard';
import { Filter, Coffee, LayoutGrid, List, RotateCcw, Search, X } from 'lucide-react';
import { CategoryId, DietaryTag } from '../types';

const DIETARY_TAGS: (DietaryTag | 'Todos')[] = [
  'Todos',
  'Destacado',
  'Especialidad',
  'Vegano',
  'Sin TACC',
  'Vegetariano',
  'Orgánico',
  'Nuevo',
];

export const ProductList: React.FC = () => {
  const { 
    products, 
    categories, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    selectedTag, 
    setSelectedTag,
    isProgrammaticScroll,
    highlightedCategory,
    showToast
  } = useMenu();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Check if filtering across all menu
  const isFiltering = searchQuery.trim() !== '' || selectedTag !== 'Todos';

  // Filtered products when searching or tag-filtering
  const filteredProducts = products.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.originNotes && p.originNotes.toLowerCase().includes(query)) ||
      (p.tastingNotes && p.tastingNotes.some((n) => n.toLowerCase().includes(query)));

    const matchesTag =
      selectedTag === 'Todos' || (p.tags && p.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  // Scroll-spy: automatically highlight active category tab when scrolling (disabled during programmatic smooth scroll)
  useEffect(() => {
    if (isFiltering || isProgrammaticScroll) return;

    const handleScroll = () => {
      if (isProgrammaticScroll) return;

      const categorySections = categories
        .map((cat) => document.getElementById(`category-${cat.id}`))
        .filter(Boolean) as HTMLElement[];

      const navHeight = 65;
      const scrollPosition = window.scrollY + navHeight + 50;

      for (let i = categorySections.length - 1; i >= 0; i--) {
        const section = categorySections[i];
        if (section.offsetTop <= scrollPosition) {
          const catId = section.id.replace('category-', '') as CategoryId;
          if (catId !== activeCategory) {
            setActiveCategory(catId);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories, isFiltering, activeCategory, setActiveCategory, isProgrammaticScroll]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag('Todos');
    showToast('Filtros restablecidos. Mostrando toda la carta', 'info');
  };

  // Keep track of displayed category count for dividers
  let displayedCategoryCount = 0;

  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-6 pb-20 flex-1 w-full">
      {/* Header & Controls Area */}
      <div className="mb-6 space-y-3.5">
        {/* Top Status and Grid/List Toggle */}
        <div className="flex items-center justify-between gap-3 pb-0.5">
          <span className="text-xs font-semibold text-[#7E695B]">
            Mostrando toda la carta de la cafetería
          </span>

          {/* View Mode Toggle: Grid or List */}
          <div className="inline-flex p-1 rounded-xl border border-[#DED0BF] bg-[#ECE3D4] shrink-0 shadow-2xs">
            <button
              id="btn-view-mode-grid"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#261A14] text-[#FAF5EF] shadow-2xs'
                  : 'text-[#7A6759] hover:text-[#261A14]'
              }`}
              title="Vista en cuadrícula con fotos"
              aria-label="Vista en cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              id="btn-view-mode-list"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#261A14] text-[#FAF5EF] shadow-2xs'
                  : 'text-[#7A6759] hover:text-[#261A14]'
              }`}
              title="Vista en lista compacta"
              aria-label="Vista en lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar right below "Mostrando toda la carta..." */}
        <div className="w-full relative">
          <div className="relative flex items-center group">
            <Search className="w-4 h-4 absolute left-4 text-[#9C8A7B] group-focus-within:text-[#8B4513] pointer-events-none transition-colors" />
            <input
              id="input-search-menu"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar café, tostón, croissant, matcha, tarta..."
              className="w-full bg-[#FAF7F2] hover:bg-[#FFFDFB] focus:bg-[#FFFFFF] text-[#2C2420] placeholder-[#9C8A7B] text-sm pl-11 pr-10 py-3 rounded-2xl border border-[#DED0BF] focus:border-[#C48C5B] focus:ring-2 focus:ring-[#C48C5B]/20 outline-none transition-all duration-200 shadow-xs"
            />
            {searchQuery && (
              <button
                id="btn-clear-search"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 text-[#9C8A7B] hover:text-[#2C2420] rounded-full transition-colors cursor-pointer"
                title="Borrar búsqueda"
                aria-label="Borrar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dietary / Characteristic Filter Chips */}
        <div className="w-full -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5 pb-0.5">
          {DIETARY_TAGS.map((tag) => {
            const isSelected = selectedTag === tag;
            const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
            return (
              <button
                key={tag}
                id={`filter-tag-${tagSlug}`}
                onClick={() => setSelectedTag(tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#2E1F18] text-[#FAF6F0] shadow-sm font-bold scale-[1.02] ring-2 ring-[#2E1F18]/20'
                    : 'bg-[#ECE3D4] hover:bg-[#E3D7C5] text-[#634E3F] border border-[#DDD0BF]'
                }`}
              >
                <span>{tag}</span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Indicator Badge */}
        {isFiltering && (
          <div 
            id="filter-status-banner"
            className="p-3.5 rounded-2xl border border-[#D8C7B5] bg-[#EFE6DA] text-[#2E2019] flex items-center justify-between gap-3 shadow-lux transition-all mt-2"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-[#261A14] text-[#E0A96D] flex items-center justify-center shrink-0 shadow-2xs">
                <Filter className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#261A14]">Resultados</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4A373]/25 text-[#704825]">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'ítem' : 'ítems'}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A6455] truncate mt-0.5">
                  {searchQuery && `"${searchQuery}"`}
                  {searchQuery && selectedTag !== 'Todos' && ' • '}
                  {selectedTag !== 'Todos' && `Filtro: ${selectedTag}`}
                </p>
              </div>
            </div>

            <button
              id="btn-clear-filters"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FFF] text-[#5C2D0C] border border-[#D8C7B5] shadow-2xs transition-all cursor-pointer shrink-0 active:scale-95"
            >
              <RotateCcw className="w-3 h-3 text-[#D4A373]" />
              <span>Limpiar</span>
            </button>
          </div>
        )}
      </div>

      {/* When filtering is active */}
      {isFiltering ? (
        filteredProducts.length === 0 ? (
          <div 
            id="empty-filter-state"
            className="py-16 text-center rounded-3xl border border-[#E8DEC0] bg-[#F4ECE1] text-[#8C7665] p-6 shadow-lux"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#EAE0D2] text-[#8B4513] mx-auto mb-3 flex items-center justify-center border border-[#DFD3C4] shadow-2xs">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display font-bold text-xl text-[#2E2019]">
              Sin resultados para este criterio
            </h3>
            <p className="text-xs mt-1.5 max-w-xs mx-auto text-[#7A6455] leading-relaxed">
              No encontramos platos con los filtros actuales. Prueba buscando otro ingrediente o selecciona otra categoría.
            </p>
            <button
              id="btn-reset-filters-empty"
              onClick={handleClearFilters}
              className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all bg-[#2E2019] hover:bg-[#422F26] text-[#FAF5EF] cursor-pointer inline-flex items-center gap-2 active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Ver toda la carta</span>
            </button>
          </div>
        ) : (
          <div
            id="filtered-products-container"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                layout={viewMode}
              />
            ))}
          </div>
        )
      ) : (
        /* Full Menu with Section Anchors and Elegant Dividers */
        <div id="full-menu-sections" className="space-y-4">
          {categories.map((cat) => {
            const categoryProducts = products.filter(
              (p) => p.categoryId === cat.id
            );
            if (categoryProducts.length === 0) return null;

            const isDividerNeeded = displayedCategoryCount > 0;
            displayedCategoryCount++;
            const isHighlighted = highlightedCategory === cat.id;

            return (
              <React.Fragment key={cat.id}>
                {/* Elegant horizontal divider with subtle decorative motif between sections */}
                {isDividerNeeded && (
                  <div 
                    className="pt-10 pb-4 flex items-center justify-center gap-3.5 select-none" 
                    aria-hidden="true"
                  >
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#DAC9B7] to-[#DAC9B7]/80" />
                    <div className="flex items-center gap-1.5 text-[#C48C5B]/70">
                      <span className="w-1 h-1 rounded-full bg-[#C48C5B]/40" />
                      <span className="w-1.5 h-1.5 rotate-45 border border-[#C48C5B]/60 bg-[#F9F6F0]" />
                      <span className="w-1 h-1 rounded-full bg-[#C48C5B]/40" />
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#DAC9B7] to-[#DAC9B7]/80" />
                  </div>
                )}

                <section
                  id={`category-${cat.id}`}
                  className={`scroll-mt-16 pt-2 rounded-3xl transition-all duration-700 ${
                    isHighlighted 
                      ? 'bg-[#EFE4D6]/50 px-3 py-2.5 -mx-3 shadow-xs' 
                      : ''
                  }`}
                >
                  {/* Category Header with refined accent */}
                  <div className="pb-3 mb-4 flex items-end justify-between gap-3 border-b border-[#EADBCC]">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-5 rounded-full transition-all duration-300 ${
                          isHighlighted
                            ? 'bg-gradient-to-b from-[#E0A96D] to-[#5C2D0C] scale-y-125'
                            : 'bg-gradient-to-b from-[#D4A373] to-[#8B4513]'
                        } shrink-0`} />
                        <h2 className={`font-serif-display font-bold text-2xl sm:text-3xl tracking-tight transition-colors duration-300 ${
                          isHighlighted ? 'text-[#8B4513]' : 'text-[#231915]'
                        }`}>
                          {cat.name}
                        </h2>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full text-[#8C7665] bg-[#EFE6DA]">
                          {categoryProducts.length} {categoryProducts.length === 1 ? 'plato' : 'platos'}
                        </span>
                      </div>
                      {cat.description && (
                        <p className="text-xs mt-1.5 ml-4 leading-relaxed max-w-lg text-[#6B5A4E]">
                          {cat.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Products in this category */}
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                        : 'flex flex-col gap-3'
                    }
                  >
                    {categoryProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        layout={viewMode}
                      />
                    ))}
                  </div>
                </section>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </main>
  );
};
