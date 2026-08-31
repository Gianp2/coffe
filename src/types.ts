export type CategoryId =
  | 'cafes-calientes'
  | 'cafes-frios'
  | 'especialidades'
  | 'te-infusiones'
  | 'pasteleria'
  | 'desayunos'
  | 'meriendas'
  | 'combos'
  | 'bebidas';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  iconName: string;
  description: string;
  badge?: string;
}

export type DietaryTag = 
  | 'Vegano' 
  | 'Sin TACC' 
  | 'Vegetariano' 
  | 'Orgánico' 
  | 'Sin Azúcar' 
  | 'Destacado' 
  | 'Especialidad' 
  | 'Nuevo';

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  tags?: DietaryTag[];
  isAvailable: boolean;
  originNotes?: string;
  tastingNotes?: string[];
  preparationTime?: string;
  calories?: number;
  allergens?: string[];
  allowMilkCustomization?: boolean;
  allowTemperatureChoice?: boolean;
}

export interface CafeSettings {
  name: string;
  tagline: string;
  address: string;
  hours: string;
  phone: string;
  instagram: string;
  wifiSsid: string;
  wifiPassword: string;
  currencySymbol: string;
  announcement?: string;
  heroImage: string;
  currentTable?: string;
}
