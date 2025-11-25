export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    district: string;
    phone: string;
    openingHours: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
}

export interface PharmacyStock {
    pharmacyId: string;
    medicineId: string;
    inStock: boolean;
    price: number;
    lastUpdated: string;
}
  
export const pharmacies: Pharmacy[] = [
    {
      id: "1",
      name: "Pharmacie Centrale de Brazzaville",
      address: "Avenue Félix Eboué",
      district: "Centre-ville",
      phone: "+242 06 123 4567",
      openingHours: "Lun-Sam: 8h-20h, Dim: 9h-18h",
      coordinates: {
        latitude: -4.2634,
        longitude: 15.2429,
      },
    },
    {
      id: "2",
      name: "Pharmacie du Plateau",
      address: "Rue Mbochis",
      district: "Plateau",
      phone: "+242 06 234 5678",
      openingHours: "Lun-Sam: 8h-19h",
      coordinates: {
        latitude: -4.2558,
        longitude: 15.2847,
      },
    },
    {
      id: "3",
      name: "Pharmacie de la Paix",
      address: "Avenue Général de Gaulle",
      district: "Poto-Poto",
      phone: "+242 06 345 6789",
      openingHours: "Lun-Ven: 8h-18h, Sam: 9h-17h",
      coordinates: {
        latitude: -4.2495,
        longitude: 15.2682,
      },
    },
    {
      id: "4",
      name: "Pharmacie Moungali",
      address: "Rue Loudima",
      district: "Moungali",
      phone: "+242 06 456 7890",
      openingHours: "Lun-Sam: 8h-20h, Dim: 10h-16h",
      coordinates: {
        latitude: -4.2447,
        longitude: 15.2534,
      },
    },
    {
      id: "5",
      name: "Pharmacie Bacongo",
      address: "Avenue Matsoua",
      district: "Bacongo",
      phone: "+242 06 567 8901",
      openingHours: "Lun-Sam: 8h-19h",
      coordinates: {
        latitude: -4.2826,
        longitude: 15.2564,
      },
    },
    {
      id: "6",
      name: "Pharmacie Makélékélé",
      address: "Rue Mbamou",
      district: "Makélékélé",
      phone: "+242 06 678 9012",
      openingHours: "Lun-Ven: 8h-18h, Sam: 9h-17h",
      coordinates: {
        latitude: -4.2937,
        longitude: 15.2392,
      },
    },
    {
      id: "7",
      name: "Pharmacie de la Santé",
      address: "Avenue de la Libération",
      district: "Centre-ville",
      phone: "+242 06 789 0123",
      openingHours: "Lun-Sam: 8h-20h, Dim: 9h-18h",
      coordinates: {
        latitude: -4.2618,
        longitude: 15.2456,
      },
    },
    {
      id: "8",
      name: "Pharmacie Ouenzé",
      address: "Rue Nganga Edouard",
      district: "Ouenzé",
      phone: "+242 06 890 1234",
      openingHours: "Lun-Sam: 8h-19h",
      coordinates: {
        latitude: -4.2384,
        longitude: 15.2723,
      },
    },
    {
      id: "9",
      name: "Pharmacie Moderne",
      address: "Boulevard Denis Sassou Nguesso",
      district: "Centre-ville",
      phone: "+242 06 901 2345",
      openingHours: "Lun-Sam: 8h-21h, Dim: 9h-19h",
      coordinates: {
        latitude: -4.2601,
        longitude: 15.2498,
      },
    },
    {
      id: "10",
      name: "Pharmacie Talangaï",
      address: "Rue Gamboma",
      district: "Talangaï",
      phone: "+242 06 012 3456",
      openingHours: "Lun-Ven: 8h-18h, Sam: 9h-17h",
      coordinates: {
        latitude: -4.2276,
        longitude: 15.2618,
      },
    },
  ];
  
  export const pharmacyStocks: PharmacyStock[] = [
    { pharmacyId: "1", medicineId: "1", inStock: true, price: 500, lastUpdated: "2025-01-12" },
    { pharmacyId: "1", medicineId: "2", inStock: true, price: 2500, lastUpdated: "2025-01-12" },
    { pharmacyId: "1", medicineId: "3", inStock: false, price: 800, lastUpdated: "2025-01-10" },
    { pharmacyId: "1", medicineId: "5", inStock: true, price: 3000, lastUpdated: "2025-01-12" },
    { pharmacyId: "1", medicineId: "11", inStock: true, price: 15000, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "2", medicineId: "1", inStock: true, price: 450, lastUpdated: "2025-01-12" },
    { pharmacyId: "2", medicineId: "3", inStock: true, price: 750, lastUpdated: "2025-01-12" },
    { pharmacyId: "2", medicineId: "4", inStock: true, price: 600, lastUpdated: "2025-01-11" },
    { pharmacyId: "2", medicineId: "7", inStock: true, price: 3500, lastUpdated: "2025-01-12" },
    { pharmacyId: "2", medicineId: "12", inStock: true, price: 12000, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "3", medicineId: "1", inStock: true, price: 480, lastUpdated: "2025-01-12" },
    { pharmacyId: "3", medicineId: "2", inStock: false, price: 2600, lastUpdated: "2025-01-08" },
    { pharmacyId: "3", medicineId: "6", inStock: true, price: 4000, lastUpdated: "2025-01-12" },
    { pharmacyId: "3", medicineId: "9", inStock: true, price: 2000, lastUpdated: "2025-01-12" },
    { pharmacyId: "3", medicineId: "13", inStock: true, price: 1500, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "4", medicineId: "1", inStock: true, price: 520, lastUpdated: "2025-01-12" },
    { pharmacyId: "4", medicineId: "2", inStock: true, price: 2400, lastUpdated: "2025-01-12" },
    { pharmacyId: "4", medicineId: "3", inStock: true, price: 800, lastUpdated: "2025-01-12" },
    { pharmacyId: "4", medicineId: "5", inStock: true, price: 2900, lastUpdated: "2025-01-12" },
    { pharmacyId: "4", medicineId: "8", inStock: true, price: 1800, lastUpdated: "2025-01-12" },
    { pharmacyId: "4", medicineId: "11", inStock: true, price: 14500, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "5", medicineId: "1", inStock: true, price: 500, lastUpdated: "2025-01-12" },
    { pharmacyId: "5", medicineId: "4", inStock: true, price: 650, lastUpdated: "2025-01-12" },
    { pharmacyId: "5", medicineId: "10", inStock: true, price: 5000, lastUpdated: "2025-01-12" },
    { pharmacyId: "5", medicineId: "14", inStock: true, price: 2500, lastUpdated: "2025-01-12" },
    { pharmacyId: "5", medicineId: "15", inStock: true, price: 1200, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "6", medicineId: "2", inStock: true, price: 2500, lastUpdated: "2025-01-12" },
    { pharmacyId: "6", medicineId: "3", inStock: true, price: 780, lastUpdated: "2025-01-12" },
    { pharmacyId: "6", medicineId: "6", inStock: false, price: 4200, lastUpdated: "2025-01-09" },
    { pharmacyId: "6", medicineId: "11", inStock: true, price: 15500, lastUpdated: "2025-01-12" },
    { pharmacyId: "6", medicineId: "12", inStock: true, price: 11500, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "7", medicineId: "1", inStock: true, price: 490, lastUpdated: "2025-01-12" },
    { pharmacyId: "7", medicineId: "2", inStock: true, price: 2550, lastUpdated: "2025-01-12" },
    { pharmacyId: "7", medicineId: "3", inStock: true, price: 790, lastUpdated: "2025-01-12" },
    { pharmacyId: "7", medicineId: "7", inStock: true, price: 3400, lastUpdated: "2025-01-12" },
    { pharmacyId: "7", medicineId: "9", inStock: true, price: 2100, lastUpdated: "2025-01-12" },
    { pharmacyId: "7", medicineId: "13", inStock: true, price: 1400, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "8", medicineId: "1", inStock: true, price: 510, lastUpdated: "2025-01-12" },
    { pharmacyId: "8", medicineId: "5", inStock: true, price: 2950, lastUpdated: "2025-01-12" },
    { pharmacyId: "8", medicineId: "8", inStock: true, price: 1750, lastUpdated: "2025-01-12" },
    { pharmacyId: "8", medicineId: "10", inStock: true, price: 4800, lastUpdated: "2025-01-12" },
    { pharmacyId: "8", medicineId: "15", inStock: true, price: 1300, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "9", medicineId: "1", inStock: true, price: 480, lastUpdated: "2025-01-12" },
    { pharmacyId: "9", medicineId: "2", inStock: true, price: 2450, lastUpdated: "2025-01-12" },
    { pharmacyId: "9", medicineId: "3", inStock: true, price: 770, lastUpdated: "2025-01-12" },
    { pharmacyId: "9", medicineId: "4", inStock: true, price: 620, lastUpdated: "2025-01-12" },
    { pharmacyId: "9", medicineId: "11", inStock: true, price: 14800, lastUpdated: "2025-01-12" },
    { pharmacyId: "9", medicineId: "14", inStock: true, price: 2400, lastUpdated: "2025-01-12" },
    
    { pharmacyId: "10", medicineId: "1", inStock: true, price: 500, lastUpdated: "2025-01-12" },
    { pharmacyId: "10", medicineId: "6", inStock: true, price: 3900, lastUpdated: "2025-01-12" },
    { pharmacyId: "10", medicineId: "7", inStock: true, price: 3600, lastUpdated: "2025-01-12" },
    { pharmacyId: "10", medicineId: "9", inStock: true, price: 2050, lastUpdated: "2025-01-12" },
    { pharmacyId: "10", medicineId: "12", inStock: true, price: 11800, lastUpdated: "2025-01-12" },
    { pharmacyId: "10", medicineId: "13", inStock: true, price: 1450, lastUpdated: "2025-01-12" },
];
  