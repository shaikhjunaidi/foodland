export type MealCategory = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'beverages-desserts';

export interface MenuItem {
  id: string;
  name: string;
  nativeName?: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'beverages-desserts';
  mealTimes: ('breakfast' | 'lunch' | 'dinner')[];
  description: string;
  price?: number;
  priceLabel: string;
  isProvisionalPrice?: boolean;
  provisionalNote?: string;
  highlight?: boolean;
  dietaryTags: string[];
  ingredientsSummary: string;
  imageUrl?: string;
}

export interface ReservationFormData {
  customerName: string;
  reservationDate: string;
  preferredTime: string;
  numberOfGuests: number;
  phoneNumber: string;
  specialRequests?: string;
}

export interface ReservationSubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  referenceId?: string;
  message?: string;
  submittedData?: ReservationFormData;
}
