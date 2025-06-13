import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface Bike {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  kmDriven: number;
  fuelType: 'Petrol' | 'Electric';
  engine: string;
  images: string[];
  location: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  description: string;
  features: string[];
  serviceHistory: Array<{
    date: string;
    type: string;
    cost: number;
    description: string;
  }>;
  documents: Array<{
    type: string;
    verified: boolean;
  }>;
  isAvailable: boolean;
  tags: string[];
}

export const useBikesStore = defineStore('bikes', () => {
  const bikes = ref<Bike[]>([
    {
      id: '1',
      brand: 'Honda',
      model: 'CB Shine',
      year: 2021,
      price: 65000,
      kmDriven: 12000,
      fuelType: 'Petrol',
      engine: '124cc',
      images: [
        'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2393819/pexels-photo-2393819.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      location: 'Mumbai, Maharashtra',
      condition: 'Excellent',
      description:
        'Well-maintained Honda CB Shine with complete service history. Single owner vehicle.',
      features: [
        'Self Start',
        'Digital Console',
        'LED Headlight',
        'Disc Brake',
      ],
      serviceHistory: [
        {
          date: '2024-01-15',
          type: 'Regular Service',
          cost: 2500,
          description: 'Engine oil change, filter replacement',
        },
        {
          date: '2023-10-20',
          type: 'Major Service',
          cost: 4500,
          description: 'Complete engine checkup',
        },
      ],
      documents: [
        { type: 'RC', verified: true },
        { type: 'Insurance', verified: true },
        { type: 'PUC', verified: true },
      ],
      isAvailable: true,
      tags: ['Best Seller', 'Low KM'],
    },
    {
      id: '2',
      brand: 'TVS',
      model: 'Jupiter',
      year: 2020,
      price: 58000,
      kmDriven: 18500,
      fuelType: 'Petrol',
      engine: '110cc',
      images: [
        'https://images.pexels.com/photos/2954992/pexels-photo-2954992.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2954988/pexels-photo-2954988.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      location: 'Pune, Maharashtra',
      condition: 'Good',
      description:
        'Reliable TVS Jupiter scooter perfect for city commuting. Good mileage and comfort.',
      features: [
        'Electric Start',
        'Mobile Charging Port',
        'Under Seat Storage',
        'Tubeless Tyres',
      ],
      serviceHistory: [
        {
          date: '2024-02-10',
          type: 'Regular Service',
          cost: 2200,
          description: 'Oil change and general checkup',
        },
      ],
      documents: [
        { type: 'RC', verified: true },
        { type: 'Insurance', verified: true },
        { type: 'PUC', verified: false },
      ],
      isAvailable: true,
      tags: ['Fuel Efficient', 'City Ride'],
    },
    {
      id: '3',
      brand: 'Bajaj',
      model: 'Pulsar NS200',
      year: 2022,
      price: 95000,
      kmDriven: 8500,
      fuelType: 'Petrol',
      engine: '200cc',
      images: [
        'https://images.pexels.com/photos/2393827/pexels-photo-2393827.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2393825/pexels-photo-2393825.jpeg?auto=compress&cs=tinysrgb&w=800',
      ],
      location: 'Nagpur, Maharashtra',
      condition: 'Excellent',
      description:
        'Sporty Bajaj Pulsar NS200 with aggressive styling and powerful performance.',
      features: [
        'ABS',
        'Digital Console',
        'LED DRL',
        'Mono Shock',
        'Liquid Cooling',
      ],
      serviceHistory: [
        {
          date: '2024-01-05',
          type: 'Regular Service',
          cost: 3200,
          description: 'Complete service with brake pad replacement',
        },
      ],
      documents: [
        { type: 'RC', verified: true },
        { type: 'Insurance', verified: true },
        { type: 'PUC', verified: true },
      ],
      isAvailable: true,
      tags: ['Sports', 'Performance'],
    },
  ]);

  const searchQuery = ref('');
  const selectedBrand = ref('');
  const priceRange = ref([0, 200000]);
  const selectedFuelType = ref('');

  const filteredBikes = computed(() => {
    return bikes.value.filter((bike) => {
      const matchesSearch =
        bike.brand.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        bike.model.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchesBrand =
        !selectedBrand.value || bike.brand === selectedBrand.value;
      const matchesPrice =
        bike.price >= priceRange.value[0] && bike.price <= priceRange.value[1];
      const matchesFuel =
        !selectedFuelType.value || bike.fuelType === selectedFuelType.value;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesPrice &&
        matchesFuel &&
        bike.isAvailable
      );
    });
  });

  const getBikeById = (id: string) => {
    return bikes.value.find((bike) => bike.id === id);
  };

  return {
    bikes,
    searchQuery,
    selectedBrand,
    priceRange,
    selectedFuelType,
    filteredBikes,
    getBikeById,
  };
});
