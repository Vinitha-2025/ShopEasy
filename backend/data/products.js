const products = [];

let productId = 1;

// ========================================
// CATEGORY DATA FOR BACKEND
// ========================================

const categories = [
  {
    name: "Women",
    sections: [
      {
        title: "Women Ethnic",
        links: [
          "Sarees",
          "Kurtis",
          "Dress Materials",
          "Lehengas",
          "Salwar Suits",
        ],
      },
      {
        title: "Women Western",
        links: [
          "Dresses",
          "Tops",
          "T-Shirts",
          "Jeans",
          "Skirts",
        ],
      },
      {
        title: "Women Footwear",
        links: [
          "Flats",
          "Heels",
          "Casual Shoes",
          "Sandals",
          "Sports Shoes",
        ],
      },
      {
        title: "Women Accessories",
        links: [
          "Handbags",
          "Wallets",
          "Jewellery",
          "Watches",
          "Sunglasses",
        ],
      },
    ],
  },

  {
    name: "Men",
    sections: [
      {
        title: "Men Clothing",
        links: [
          "Shirts",
          "T-Shirts",
          "Jeans",
          "Trousers",
          "Kurtas",
        ],
      },
      {
        title: "Men Footwear",
        links: [
          "Casual Shoes",
          "Sports Shoes",
          "Sandals",
          "Slippers",
          "Formal Shoes",
        ],
      },
      {
        title: "Men Accessories",
        links: [
          "Watches",
          "Wallets",
          "Belts",
          "Sunglasses",
          "Caps",
        ],
      },
      {
        title: "Men Grooming",
        links: [
          "Beard Care",
          "Hair Care",
          "Face Care",
          "Shaving",
          "Grooming Kits",
        ],
      },
    ],
  },

  {
    name: "Girls",
    sections: [
      {
        title: "Girls Clothing",
        links: [
          "Frocks",
          "Dresses",
          "T-Shirts",
          "Tops",
          "Skirts",
        ],
      },
      {
        title: "Girls Ethnic",
        links: [
          "Lehengas",
          "Pattu Pavadai",
          "Kurti Sets",
          "Ethnic Dresses",
          "Traditional Wear",
        ],
      },
      {
        title: "Girls Footwear",
        links: [
          "Sandals",
          "Flats",
          "Casual Shoes",
          "Sports Shoes",
          "Slippers",
        ],
      },
      {
        title: "Girls Accessories",
        links: [
          "Hair Accessories",
          "Jewellery",
          "Bags",
          "Watches",
          "Sunglasses",
        ],
      },
    ],
  },

  {
    name: "Boys",
    sections: [
      {
        title: "Boys Clothing",
        links: [
          "T-Shirts",
          "Shirts",
          "Jeans",
          "Shorts",
          "Track Pants",
        ],
      },
      {
        title: "Boys Ethnic",
        links: [
          "Kurta Sets",
          "Ethnic Shirts",
          "Dhoti Sets",
          "Traditional Wear",
          "Festive Wear",
        ],
      },
      {
        title: "Boys Footwear",
        links: [
          "Sports Shoes",
          "Sandals",
          "Casual Shoes",
          "Slippers",
          "School Shoes",
        ],
      },
      {
        title: "Boys Accessories",
        links: [
          "Caps",
          "Watches",
          "Bags",
          "Sunglasses",
          "Belts",
        ],
      },
    ],
  },

  {
    name: "Toys",
    sections: [
      {
        title: "Baby Toys",
        links: [
          "Soft Toys",
          "Rattles",
          "Teethers",
          "Baby Musical Toys",
          "Activity Toys",
        ],
      },
      {
        title: "Kids Toys",
        links: [
          "Remote Control Toys",
          "Cars & Vehicles",
          "Dolls",
          "Action Figures",
          "Building Blocks",
        ],
      },
      {
        title: "Educational Toys",
        links: [
          "Learning Toys",
          "Puzzles",
          "Board Games",
          "Math Toys",
          "Science Toys",
        ],
      },
      {
        title: "Outdoor Toys",
        links: [
          "Bicycles",
          "Scooters",
          "Sports Toys",
          "Water Toys",
          "Outdoor Games",
        ],
      },
    ],
  },

  {
    name: "Beauty",
    sections: [
      {
        title: "Makeup",
        links: [
          "Lipstick",
          "Foundation",
          "Compact",
          "Mascara",
          "Makeup Kits",
        ],
      },
      {
        title: "Skin Care",
        links: [
          "Face Wash",
          "Moisturizers",
          "Face Cream",
          "Serums",
          "Face Masks",
        ],
      },
      {
        title: "Hair Care",
        links: [
          "Shampoo",
          "Conditioner",
          "Hair Oil",
          "Hair Serum",
          "Hair Accessories",
        ],
      },
      {
        title: "Beauty Accessories",
        links: [
          "Makeup Brushes",
          "Makeup Organizers",
          "Mirrors",
          "Beauty Tools",
          "Nail Care",
        ],
      },
    ],
  },

  {
    name: "Home & Kitchen",
    sections: [
      {
        title: "Home Decor",
        links: [
          "Wall Decor",
          "Clocks",
          "Photo Frames",
          "Artificial Plants",
          "Showpieces",
        ],
      },
      {
        title: "Kitchen",
        links: [
          "Cookware",
          "Kitchen Tools",
          "Storage Containers",
          "Water Bottles",
          "Lunch Boxes",
        ],
      },
      {
        title: "Home Furnishing",
        links: [
          "Bedsheets",
          "Curtains",
          "Cushion Covers",
          "Pillow Covers",
          "Blankets",
        ],
      },
      {
        title: "Cleaning & Storage",
        links: [
          "Storage Boxes",
          "Laundry Baskets",
          "Cleaning Tools",
          "Dustbins",
          "Organizers",
        ],
      },
    ],
  },
];


// ========================================
// PRODUCT NAME
// ========================================

function getProductName(subcategory, index) {
  const names = [
    "Classic Collection",
    "Premium Style",
    "Trendy Design",
    "Elegant Choice",
    "Modern Collection",
    "Stylish Pick",
    "Best Seller",
  ];

  return `${subcategory} ${names[index - 1]}`;
}


// ========================================
// PRODUCT PRICE
// ========================================

function getPrice(subcategory, index) {
  const prices = {
    Sarees: 599,
    Kurtis: 399,
    "Dress Materials": 499,
    Lehengas: 899,
    "Salwar Suits": 699,

    Dresses: 449,
    Tops: 299,
    "T-Shirts": 249,
    Jeans: 599,
    Skirts: 399,

    Flats: 399,
    Heels: 499,
    "Casual Shoes": 699,
    Sandals: 399,
    "Sports Shoes": 799,

    Handbags: 499,
    Wallets: 299,
    Jewellery: 249,
    Watches: 599,
    Sunglasses: 299,

    Shirts: 499,
    Trousers: 599,
    Kurtas: 449,
    Slippers: 299,
    "Formal Shoes": 899,
    Belts: 249,
    Caps: 199,

    "Beard Care": 299,
    "Hair Care": 349,
    "Face Care": 299,
    Shaving: 249,
    "Grooming Kits": 499,

    Frocks: 399,
    "Pattu Pavadai": 599,
    "Kurti Sets": 449,
    "Ethnic Dresses": 499,
    "Traditional Wear": 599,

    "Hair Accessories": 149,
    Bags: 299,

    "Soft Toys": 299,
    Rattles: 199,
    Teethers: 149,
    "Baby Musical Toys": 399,
    "Activity Toys": 349,

    "Remote Control Toys": 599,
    "Cars & Vehicles": 399,
    Dolls: 349,
    "Action Figures": 499,
    "Building Blocks": 399,

    "Learning Toys": 349,
    Puzzles: 249,
    "Board Games": 399,
    "Math Toys": 299,
    "Science Toys": 499,

    Bicycles: 1999,
    Scooters: 1299,
    "Sports Toys": 399,
    "Water Toys": 249,
    "Outdoor Games": 349,

    Lipstick: 249,
    Foundation: 399,
    Compact: 249,
    Mascara: 299,
    "Makeup Kits": 599,

    "Face Wash": 249,
    Moisturizers: 299,
    "Face Cream": 299,
    Serums: 399,
    "Face Masks": 249,

    Shampoo: 299,
    Conditioner: 299,
    "Hair Oil": 249,
    "Hair Serum": 349,

    "Makeup Brushes": 299,
    "Makeup Organizers": 399,
    Mirrors: 299,
    "Beauty Tools": 249,
    "Nail Care": 199,

    "Wall Decor": 349,
    Clocks: 499,
    "Photo Frames": 299,
    "Artificial Plants": 299,
    Showpieces: 399,

    Cookware: 699,
    "Kitchen Tools": 249,
    "Storage Containers": 399,
    "Water Bottles": 249,
    "Lunch Boxes": 299,

    Bedsheets: 699,
    Curtains: 599,
    "Cushion Covers": 299,
    "Pillow Covers": 249,
    Blankets: 899,

    "Storage Boxes": 399,
    "Laundry Baskets": 349,
    "Cleaning Tools": 249,
    Dustbins: 399,
    Organizers: 299,

    Shorts: 299,
    "Track Pants": 399,
    "Kurta Sets": 499,
    "Ethnic Shirts": 399,
    "Dhoti Sets": 599,
    "Festive Wear": 499,

    "School Shoes": 599,
  };

  const basePrice = prices[subcategory] || 399;

  return basePrice + (index - 1) * 40;
}


// ========================================
// OLD PRICE
// ========================================

function getOldPrice(subcategory, index) {
  const price = getPrice(subcategory, index);

  return Math.round(price * 1.4);
}


// ========================================
// DESCRIPTION
// ========================================

function getDescription(category, subcategory) {
  return `Discover this stylish ${subcategory.toLowerCase()} from our ${category} collection. Made with quality materials and designed for comfort, style and everyday use.`;
}


// ========================================
// IMAGE
// ========================================

function getImage(category, subcategory, index) {
  const images = {
    Women: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    ],

    Men: [
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc",
      "https://images.unsplash.com/photo-1610652492500-ded49ceeb378",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22",
    ],

    Girls: [
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7",
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8",
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42",
    ],

    Boys: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
    ],

    Toys: [
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
      "https://images.unsplash.com/photo-1560961911-ba7ef651a56c",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
    ],

    Beauty: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    ],

    "Home & Kitchen": [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    ],
  };

  const categoryImages = images[category] || [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
  ];

  const image =
    categoryImages[(index - 1) % categoryImages.length];

  return `${image}?auto=format&fit=crop&w=600&q=80`;
}


// ========================================
// GENERATE PRODUCTS
// ========================================

categories.forEach((category) => {
  category.sections.forEach((section) => {
    section.links.forEach((subcategory) => {

      // 7 products for every subcategory
      for (let i = 1; i <= 7; i++) {
        products.push({
          productId: productId++,

          name: getProductName(subcategory, i),

          category: category.name,

          subcategory: subcategory,

          price: getPrice(subcategory, i),

          oldPrice: getOldPrice(subcategory, i),

          rating: Number(
            (4 + (i * 0.1)).toFixed(1)
          ),

          reviews: 20 + i * 15,

          description: getDescription(
            category.name,
            subcategory
          ),

          image: getImage(
            category.name,
            subcategory,
            i
          ),

          stock: 10 + i * 5,
        });
      }

    });
  });
});


// ========================================
// CHECK TOTAL PRODUCTS
// ========================================

console.log("-----------------------------------");
console.log("Products Generated:", products.length);
console.log("-----------------------------------");

module.exports = products;