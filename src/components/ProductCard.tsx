import React, { useState } from 'react';
import { Product } from '../types';
import { useMenu } from '../context/MenuContext';
import { Sparkles, AlertCircle, Check, Coffee } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { formatPrice } = useMenu();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getTagBadgeStyle = (tag: string) => {
    switch (tag) {
      case 'Especialidad':
        return 'bg-[#3A2216] text-[#F5EDE4] border border-[#6B442E]/60';
      case 'Vegano':
        return 'bg-[#234A36] text-[#E8F5EE] border border-[#3D7A5C]/50';
      case 'Sin TACC':
        return 'bg-[#664614] text-[#FCF4E6] border border-[#A6782E]/50';
      case 'Nuevo':
        return 'bg-[#6E2218] text-[#FDEEEB] border border-[#A8382B]/50';
      case 'Vegetariano':
        return 'bg-[#2D4D38] text-[#EAF4ED] border border-[#487858]/50';
      case 'Orgánico':
        return 'bg-[#384F2B] text-[#EBF4E5] border border-[#587B43]/50';
      case 'Destacado':
        return 'bg-[#5C3617] text-[#FAF0E6] border border-[#915829]/50';
      default:
        return 'bg-[#2E2019] text-[#F9F6F0] border border-[#523A2B]/40';
    }
  };

  if (layout === 'list') {
    return (
      <article
        id={`dish-card-${product.id}`}
        className={`group relative rounded-2xl p-4 border transition-all duration-200 flex items-center justify-between gap-4 select-none ${
          product.isAvailable
            ? 'bg-[#FAF7F2] border-[#EADBCC] hover:border-[#C48C5B]/70 hover:bg-[#FFFDFB] shadow-lux hover:shadow-lux-hover'
            : 'bg-[#F3EFE9] border-[#EADBCC]/50 opacity-60'
        }`}
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-serif-display font-bold tracking-tight truncate text-[#251B17] text-base sm:text-lg group-hover:text-[#8B4513] transition-colors">
                {product.name}
              </h3>
              {product.tags?.map((tag) => (
                <span
                  key={tag}
                  className={`text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs tracking-wide ${getTagBadgeStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {product.originNotes && (
              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-[#9C6D3F] font-semibold">
                <Sparkles className="w-3 h-3 shrink-0 text-[#D4A373]" />
                <span className="truncate">{product.originNotes}</span>
              </p>
            )}

            <p className="mt-1 leading-relaxed line-clamp-2 text-xs text-[#6B5A4E]">
              {product.description}
            </p>

            {product.tastingNotes && product.tastingNotes.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="text-[9.5px] px-2 py-0.5 rounded-md font-medium bg-[#EFE6DA] text-[#6E5442] border border-[#E3D3C1]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#EADBCC]/70 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display font-bold text-lg text-[#2E1F18]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="line-through font-medium text-xs text-[#9E8B7C]">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {product.allowMilkCustomization && (
              <span className="text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold text-[#2E6B4F] bg-[#E7F0EB] border border-[#CFE1D7]">
                <Check className="w-3 h-3 stroke-[2.5]" /> Leche a elección
              </span>
            )}
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative w-22 h-22 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 shadow-2xs bg-[#E8DFC8]/40 border border-[#EADBCC]/80">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#8B4513]">
              <Coffee className="w-5 h-5" />
            </div>
          )}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#EDE4D8] animate-pulse" />
          )}
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-1 text-[10px] text-white font-black uppercase text-center">
              Agotado
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article
      id={`dish-card-${product.id}`}
      className={`group relative rounded-3xl p-4 border transition-all duration-300 flex flex-col justify-between select-none ${
        product.isAvailable
          ? 'bg-[#FAF7F2] border-[#EADBCC] hover:border-[#C48C5B]/70 hover:bg-[#FFFDFB] shadow-lux hover:shadow-lux-hover hover:-translate-y-0.5'
          : 'bg-[#F3EFE9] border-[#EADBCC]/50 opacity-60'
      }`}
    >
      <div>
        {/* Card Image */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-3.5 shadow-2xs bg-[#E8DFC8]/40 border border-[#EADBCC]/80">
          {!imageError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#EDE4D8] text-[#8B4513] text-xs font-bold gap-1.5">
              <Coffee className="w-4 h-4" />
              <span>Ámbar Café</span>
            </div>
          )}

          {/* Shimmer placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-[#EDE4D8] animate-pulse" />
          )}

          {/* Dietary & Highlight Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 max-w-[85%] pointer-events-none">
            {product.tags?.map((tag) => (
              <span
                key={tag}
                className={`text-[9.5px] font-semibold px-2.5 py-0.5 rounded-full shadow-md tracking-wide ${getTagBadgeStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Out of Stock Ribbon */}
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-2">
              <span className="bg-[#B23B2A] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" /> No disponible
              </span>
            </div>
          )}
        </div>

        {/* Dish Title & Description */}
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif-display font-bold leading-snug text-lg text-[#251B17] group-hover:text-[#8B4513] transition-colors">
              {product.name}
            </h3>
          </div>

          {product.originNotes && (
            <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#9C6D3F] font-semibold">
              <Sparkles className="w-3 h-3 shrink-0 text-[#D4A373]" />
              <span className="truncate">{product.originNotes}</span>
            </p>
          )}

          <p className="mt-1.5 leading-relaxed line-clamp-2 text-xs text-[#6B5A4E]">
            {product.description}
          </p>

          {/* Tasting notes */}
          {product.tastingNotes && product.tastingNotes.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {product.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="text-[9.5px] px-2 py-0.5 rounded-md font-medium bg-[#EFE6DA] text-[#6E5442] border border-[#E3D3C1]"
                >
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Price & Extra Option */}
      <div className="mt-3.5 pt-3 border-t border-[#EADBCC]/80 flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-serif-display font-bold text-xl text-[#2E1F18]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="line-through font-medium text-xs text-[#9E8B7C]">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.allowMilkCustomization && (
          <span className="text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold text-[#2E6B4F] bg-[#E7F0EB] border border-[#CFE1D7]">
            <Check className="w-3 h-3 stroke-[2.5]" /> Leche a elección
          </span>
        )}
      </div>
    </article>
  );
};
