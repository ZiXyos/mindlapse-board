import type { ProductWithVariantsAndCategories } from "@mindboard/shared";
import { domain } from "@mindboard/shared";

export const productsPlaceholder: Array<ProductWithVariantsAndCategories> = [
  {
    id: domain.Identifier("prod_001"),
    name: "MacBook Pro 16-inch",
    slug: "macbook-pro-16",
    description: "Powerful laptop for professionals with M3 Pro chip",
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:15:00Z",
    variants: [
      {
        id: domain.Identifier("var_001"),
        productId: domain.Identifier("prod_001"),
        sku: "MBP16-512-SG",
        name: "512GB - Space Gray",
        options: { storage: "512GB", color: "Space Gray" },
        position: 1,
        price: domain.Price(249900),
        stockQuantity: 25,
        currency: "USD",
        pricesJson: { USD: 2499, EUR: 2299, KRW: 3300000, JPY: 370000 },
        isDefault: true,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-03-20T14:15:00Z"
      },
      {
        id: domain.Identifier("var_002"),
        productId: domain.Identifier("prod_001"),
        sku: "MBP16-1TB-SG",
        name: "1TB - Space Gray",
        options: { storage: "1TB", color: "Space Gray" },
        position: 2,
        price: domain.Price(279900),
        stockQuantity: 18,
        currency: "USD",
        pricesJson: { USD: 2799, EUR: 2599, KRW: 3700000, JPY: 415000 },
        isDefault: false,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-03-20T14:15:00Z"
      }
    ],
    categories: [
      { id: "cat_001", name: "Laptops" },
      { id: "cat_002", name: "Apple" }
    ],
    defaultVariant: {
      id: domain.Identifier("var_001"),
      productId: domain.Identifier("prod_001"),
      sku: "MBP16-512-SG",
      name: "512GB - Space Gray",
      options: { storage: "512GB", color: "Space Gray" },
      position: 1,
      price: domain.Price(249900),
      stockQuantity: 25,
      currency: "USD",
      pricesJson: { USD: 2499, EUR: 2299, KRW: 3300000, JPY: 370000 },
      isDefault: true,
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-03-20T14:15:00Z"
    },
    priceRange: {
      min: domain.Price(249900),
      max: domain.Price(279900),
      currency: "USD"
    },
    totalStock: 43
  },
  {
    id: domain.Identifier("prod_002"),
    name: "iPhone 15 Pro",
    slug: "iphone-15-pro",
    description: "Latest iPhone with titanium design and A17 Pro chip",
    isActive: true,
    createdAt: "2024-02-10T09:00:00Z",
    updatedAt: "2024-03-25T16:45:00Z",
    variants: [
      {
        id: domain.Identifier("var_003"),
        productId: domain.Identifier("prod_002"),
        sku: "IP15P-128-NT",
        name: "128GB - Natural Titanium",
        options: { storage: "128GB", color: "Natural Titanium" },
        position: 1,
        price: domain.Price(99900),
        stockQuantity: 45,
        currency: "USD",
        pricesJson: { USD: 999, EUR: 949, KRW: 1320000, JPY: 148000 },
        isDefault: true,
        createdAt: "2024-02-10T09:00:00Z",
        updatedAt: "2024-03-25T16:45:00Z"
      },
      {
        id: domain.Identifier("var_004"),
        productId: domain.Identifier("prod_002"),
        sku: "IP15P-256-BT",
        name: "256GB - Blue Titanium",
        options: { storage: "256GB", color: "Blue Titanium" },
        position: 2,
        price: domain.Price(109900),
        stockQuantity: 32,
        currency: "USD",
        pricesJson: { USD: 1099, EUR: 1049, KRW: 1450000, JPY: 163000 },
        isDefault: false,
        createdAt: "2024-02-10T09:00:00Z",
        updatedAt: "2024-03-25T16:45:00Z"
      }
    ],
    categories: [
      { id: "cat_003", name: "Smartphones" },
      { id: "cat_002", name: "Apple" }
    ],
    defaultVariant: {
      id: domain.Identifier("var_003"),
      productId: domain.Identifier("prod_002"),
      sku: "IP15P-128-NT",
      name: "128GB - Natural Titanium",
      options: { storage: "128GB", color: "Natural Titanium" },
      position: 1,
      price: domain.Price(99900),
      stockQuantity: 45,
      currency: "USD",
      pricesJson: { USD: 999, EUR: 949, KRW: 1320000, JPY: 148000 },
      isDefault: true,
      createdAt: "2024-02-10T09:00:00Z",
      updatedAt: "2024-03-25T16:45:00Z"
    },
    priceRange: {
      min: domain.Price(99900),
      max: domain.Price(109900),
      currency: "USD"
    },
    totalStock: 77
  },
  {
    id: domain.Identifier("prod_003"),
    name: "Samsung Galaxy S24 Ultra",
    slug: "galaxy-s24-ultra",
    description: "Premium Android smartphone with S Pen and AI features",
    isActive: true,
    createdAt: "2024-01-20T11:15:00Z",
    updatedAt: "2024-03-18T10:30:00Z",
    variants: [
      {
        id: domain.Identifier("var_005"),
        productId: domain.Identifier("prod_003"),
        sku: "GS24U-256-TG",
        name: "256GB - Titanium Gray",
        options: { storage: "256GB", color: "Titanium Gray" },
        position: 1,
        price: domain.Price(119900),
        stockQuantity: 28,
        currency: "USD",
        pricesJson: { USD: 1199, EUR: 1149, KRW: 1580000, JPY: 178000 },
        isDefault: true,
        createdAt: "2024-01-20T11:15:00Z",
        updatedAt: "2024-03-18T10:30:00Z"
      }
    ],
    categories: [
      { id: "cat_003", name: "Smartphones" },
      { id: "cat_004", name: "Samsung" }
    ],
    defaultVariant: {
      id: domain.Identifier("var_005"),
      productId: domain.Identifier("prod_003"),
      sku: "GS24U-256-TG",
      name: "256GB - Titanium Gray",
      options: { storage: "256GB", color: "Titanium Gray" },
      position: 1,
      price: domain.Price(119900),
      stockQuantity: 28,
      currency: "USD",
      pricesJson: { USD: 1199, EUR: 1149, KRW: 1580000, JPY: 178000 },
      isDefault: true,
      createdAt: "2024-01-20T11:15:00Z",
      updatedAt: "2024-03-18T10:30:00Z"
    },
    priceRange: {
      min: domain.Price(119900),
      max: domain.Price(119900),
      currency: "USD"
    },
    totalStock: 28
  },
  {
    id: domain.Identifier("prod_004"),
    name: "Sony WH-1000XM5",
    slug: "sony-wh1000xm5",
    description: "Industry-leading noise canceling wireless headphones",
    isActive: true,
    createdAt: "2024-01-05T08:45:00Z",
    updatedAt: "2024-03-22T13:20:00Z",
    variants: [
      {
        id: domain.Identifier("var_006"),
        productId: domain.Identifier("prod_004"),
        sku: "WH1000XM5-BK",
        name: "Black",
        options: { color: "Black" },
        position: 1,
        price: domain.Price(39900),
        stockQuantity: 65,
        currency: "USD",
        pricesJson: { USD: 399, EUR: 379, KRW: 526000, JPY: 59000 },
        isDefault: true,
        createdAt: "2024-01-05T08:45:00Z",
        updatedAt: "2024-03-22T13:20:00Z"
      },
      {
        id: domain.Identifier("var_007"),
        productId: domain.Identifier("prod_004"),
        sku: "WH1000XM5-SL",
        name: "Silver",
        options: { color: "Silver" },
        position: 2,
        price: domain.Price(39900),
        stockQuantity: 42,
        currency: "USD",
        pricesJson: { USD: 399, EUR: 379, KRW: 526000, JPY: 59000 },
        isDefault: false,
        createdAt: "2024-01-05T08:45:00Z",
        updatedAt: "2024-03-22T13:20:00Z"
      }
    ],
    categories: [
      { id: "cat_005", name: "Audio" },
      { id: "cat_006", name: "Headphones" }
    ],
    defaultVariant: {
      id: domain.Identifier("var_006"),
      productId: domain.Identifier("prod_004"),
      sku: "WH1000XM5-BK",
      name: "Black",
      options: { color: "Black" },
      position: 1,
      price: domain.Price(39900),
      stockQuantity: 65,
      currency: "USD",
      pricesJson: { USD: 399, EUR: 379, KRW: 526000, JPY: 59000 },
      isDefault: true,
      createdAt: "2024-01-05T08:45:00Z",
      updatedAt: "2024-03-22T13:20:00Z"
    },
    priceRange: {
      min: domain.Price(39900),
      max: domain.Price(39900),
      currency: "USD"
    },
    totalStock: 107
  },
  {
    id: domain.Identifier("prod_005"),
    name: "Dell XPS 13",
    slug: "dell-xps-13",
    description: "Ultrabook with InfinityEdge display and premium build quality",
    isActive: false,
    createdAt: "2023-12-01T14:00:00Z",
    updatedAt: "2024-03-15T09:30:00Z",
    variants: [
      {
        id: domain.Identifier("var_008"),
        productId: domain.Identifier("prod_005"),
        sku: "XPS13-512-PT",
        name: "512GB - Platinum",
        options: { storage: "512GB", color: "Platinum" },
        position: 1,
        price: domain.Price(129900),
        stockQuantity: 0,
        currency: "USD",
        pricesJson: { USD: 1299, EUR: 1199, KRW: 1710000, JPY: 192000 },
        isDefault: true,
        createdAt: "2023-12-01T14:00:00Z",
        updatedAt: "2024-03-15T09:30:00Z"
      }
    ],
    categories: [
      { id: "cat_001", name: "Laptops" },
      { id: "cat_007", name: "Dell" }
    ],
    defaultVariant: {
      id: domain.Identifier("var_008"),
      productId: domain.Identifier("prod_005"),
      sku: "XPS13-512-PT",
      name: "512GB - Platinum",
      options: { storage: "512GB", color: "Platinum" },
      position: 1,
      price: domain.Price(129900),
      stockQuantity: 0,
      currency: "USD",
      pricesJson: { USD: 1299, EUR: 1199, KRW: 1710000, JPY: 192000 },
      isDefault: true,
      createdAt: "2023-12-01T14:00:00Z",
      updatedAt: "2024-03-15T09:30:00Z"
    },
    priceRange: {
      min: domain.Price(129900),
      max: domain.Price(129900),
      currency: "USD"
    },
    totalStock: 0
  }
]
