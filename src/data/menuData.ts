import { MenuItem } from '../types/restaurant';

/**
 * APPROVED MENU ITEMS ONLY
 * Strictly adhering to client instructions:
 * - Regular Chai: ₹15
 * - Special Chai: ₹30
 * - Set dosa: Price at restaurant (not guessed)
 * - Fried rice: Price at restaurant (not guessed)
 * - Fruit juice: Price at restaurant (not guessed)
 * - Salad: Price at restaurant (not guessed)
 * - Gulab jamun: Price at restaurant (not guessed)
 * - Cold drinks: Price at restaurant (not guessed)
 * 
 * 100% Vegetarian. Serves no eggs.
 */
export const APPROVED_MENU_ITEMS: MenuItem[] = [
  {
    id: 'set-dosa',
    name: 'Set Dosa',
    nativeName: 'ಸೆಟ್ ದೋಸೆ',
    category: 'breakfast',
    mealTimes: ['breakfast', 'dinner'],
    description: 'Soft, light fermented rice and lentil crepes served in a set, accompanied by coconut chutney and vegetable saagu.',
    price: 60,
    priceLabel: '₹60',
    isProvisionalPrice: true,
    provisionalNote: 'Provisional estimate requiring owner approval',
    highlight: true,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Rice, lentils, coconut chutney, seasoned vegetable saagu.',
    imageUrl: '/images/food/set_dosa.jpg'
  },
  {
    id: 'fried-rice',
    name: 'Vegetable Fried Rice',
    nativeName: 'ವೆಜ್ ಫ್ರೈಡ್ ರೈಸ್',
    category: 'lunch',
    mealTimes: ['lunch', 'dinner'],
    description: 'Long-grain basmati rice cooked with fresh seasonal vegetables, herbs, and mild spices.',
    price: 110,
    priceLabel: '₹110',
    isProvisionalPrice: true,
    provisionalNote: 'Provisional estimate requiring owner approval',
    highlight: true,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Basmati rice, mixed seasonal vegetables, aromatic spices.',
    imageUrl: '/images/food/fried_rice.jpg'
  },
  {
    id: 'regular-chai',
    name: 'Regular Chai',
    nativeName: 'ರೆಗ್ಯುಲರ್ ಚಹಾ',
    category: 'beverages-desserts',
    mealTimes: ['breakfast', 'lunch', 'dinner'],
    description: 'Freshly brewed traditional hot tea simmered with milk and spices.',
    price: 15,
    priceLabel: '₹15',
    isProvisionalPrice: false,
    highlight: false,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Fresh tea leaves, milk, spices.',
    imageUrl: '/images/food/regular_chai.jpg'
  },
  {
    id: 'special-chai',
    name: 'Special Chai',
    nativeName: 'ಸ್ಪೆಷಲ್ ಚಹಾ',
    category: 'beverages-desserts',
    mealTimes: ['breakfast', 'lunch', 'dinner'],
    description: 'Rich, specially prepared aromatic spiced tea slow-simmered with premium spices and milk.',
    price: 30,
    priceLabel: '₹30',
    isProvisionalPrice: false,
    highlight: true,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Selected tea leaves, rich milk, aromatic cardamom blend.',
    imageUrl: '/images/food/special_chai.jpg'
  },
  {
    id: 'fruit-juice',
    name: 'Fresh Fruit Juice',
    nativeName: 'ತಾಜಾ ಹಣ್ಣಿನ ರಸ',
    category: 'beverages-desserts',
    mealTimes: ['breakfast', 'lunch', 'dinner'],
    description: 'Freshly squeezed seasonal fruit juice prepared to order.',
    priceLabel: 'Price on request',
    isProvisionalPrice: false,
    highlight: false,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Fresh seasonal fruits.',
    imageUrl: '/images/food/fruit_juice.jpg'
  },
  {
    id: 'salad',
    name: 'Fresh Salad',
    nativeName: 'ಹಸಿ ತರಕಾರಿ ಸಲಾಡ್',
    category: 'lunch',
    mealTimes: ['lunch', 'dinner'],
    description: 'A crisp selection of fresh cut cucumbers, tomatoes, carrots, and garden greens.',
    price: 50,
    priceLabel: '₹50',
    isProvisionalPrice: true,
    provisionalNote: 'Provisional estimate requiring owner approval',
    highlight: false,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Fresh cut vegetables, lemon garnish.',
    imageUrl: '/images/food/salad.jpg'
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    nativeName: 'ಗುಲಾಬ್ ಜಾಮೂನ್',
    category: 'beverages-desserts',
    mealTimes: ['lunch', 'dinner'],
    description: 'Classic milk-based sweet dumplings soaked in fragrant cardamom and sugar syrup.',
    price: 45,
    priceLabel: '₹45',
    isProvisionalPrice: true,
    provisionalNote: 'Provisional estimate requiring owner approval',
    highlight: true,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Milk solids, cardamom sugar syrup.',
    imageUrl: '/images/food/gulab_jamun.jpg'
  },
  {
    id: 'cold-drinks',
    name: 'Cold Drinks',
    nativeName: 'ತಂಪು ಪಾನೀಯಗಳು',
    category: 'beverages-desserts',
    mealTimes: ['lunch', 'dinner'],
    description: 'A selection of chilled bottled beverages and refreshments.',
    priceLabel: 'Price on request',
    isProvisionalPrice: false,
    highlight: false,
    dietaryTags: ['100% Vegetarian', 'No Eggs'],
    ingredientsSummary: 'Chilled packaged refreshments.',
    imageUrl: '/images/food/cold_drinks.jpg'
  }
];

export const MEAL_SECTION_OVERVIEWS = {
  breakfast: {
    title: 'Breakfast',
    subtitle: 'Morning Vegetarian Offerings',
    description: 'Start your morning with fresh Set Dosa (₹60*), freshly brewed Regular Chai (₹15) or Special Chai (₹30), and fresh fruit juice.',
    featuredItemIds: ['set-dosa', 'regular-chai', 'special-chai', 'fruit-juice']
  },
  lunch: {
    title: 'Lunch',
    subtitle: 'Midday Dining',
    description: 'Wholesome vegetarian meal options featuring Vegetable Fried Rice (₹110*), Fresh Salad (₹50*), Fruit Juice, and Cold Drinks (price on request).',
    featuredItemIds: ['fried-rice', 'salad', 'fruit-juice', 'cold-drinks']
  },
  dinner: {
    title: 'Dinner',
    subtitle: 'Evening Dining',
    description: 'A relaxing dinner featuring Set Dosa (₹60*), Vegetable Fried Rice (₹110*), sweet Gulab Jamun (₹45*), and Special Chai (₹30).',
    featuredItemIds: ['set-dosa', 'fried-rice', 'gulab-jamun', 'special-chai']
  }
};
