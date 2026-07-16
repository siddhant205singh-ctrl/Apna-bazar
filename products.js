const PRODUCTS = [
  // Fruits & Vegetables
  {
    id: "fv-1",
    name: "Fresh Red Tomatoes",
    category: "fruits-veg",
    price: 40,
    originalPrice: 50,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?w=500&auto=format&fit=crop&q=60",
    description: "Farm-fresh, juicy red tomatoes. Handpicked and packed under hygienic conditions. Perfect for curries, salads, and soups.",
    rating: 4.5,
    inStock: true,
    tag: "Fresh"
  },
  {
    id: "fv-2",
    name: "Fresh Potatoes (Aloo)",
    category: "fruits-veg",
    price: 30,
    originalPrice: 35,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60",
    description: "Premium quality potatoes, rich in carbohydrates. A staple for every household. Direct from local farms.",
    rating: 4.6,
    inStock: true,
    tag: "Staple"
  },
  {
    id: "fv-3",
    name: "Fresh Green Coriander (Dhania)",
    category: "fruits-veg",
    price: 15,
    originalPrice: 20,
    unit: "1 Bunch",
    image: "https://images.unsplash.com/photo-1588879460618-5a491ef2364c?w=500&auto=format&fit=crop&q=60",
    description: "Fresh aromatic green coriander leaves. Cleaned and ready to add refreshing flavor and garnish to your dishes.",
    rating: 4.8,
    inStock: true,
    tag: "Organic"
  },
  {
    id: "fv-4",
    name: "Bananas (Kela)",
    category: "fruits-veg",
    price: 50,
    originalPrice: 60,
    unit: "1 Dozen",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60",
    description: "Sweet and perfectly ripe yellow bananas. A rich source of potassium and instant energy.",
    rating: 4.4,
    inStock: true,
    tag: "High Energy"
  },

  // Dairy & Bakery
  {
    id: "db-1",
    name: "Amul Taaza Toned Milk",
    category: "dairy",
    price: 27,
    originalPrice: 27,
    unit: "500 ml",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60",
    description: "Homogenized toned milk from Amul. Pasteurized and packed in sterile poly packs. Ideal for tea, coffee, and daily consumption.",
    rating: 4.9,
    inStock: true,
    tag: "Popular"
  },
  {
    id: "db-2",
    name: "Amul Salted Butter",
    category: "dairy",
    price: 56,
    originalPrice: 58,
    unit: "100 g",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=60",
    description: "Classic salted butter from Amul. Utterly Butterly Delicious. Enhances the flavor of toasts, parathas, and baking items.",
    rating: 4.9,
    inStock: true,
    tag: "Daily Essential"
  },
  {
    id: "db-3",
    name: "Fresh Paneer (Cottage Cheese)",
    category: "dairy",
    price: 90,
    originalPrice: 100,
    unit: "200 g",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60",
    description: "Soft, rich, and creamy fresh cottage cheese. High in protein, perfect for making Paneer Butter Masala, Palak Paneer, and tikka.",
    rating: 4.7,
    inStock: true,
    tag: "Fresh"
  },

  // Atta, Rice & Dals
  {
    id: "ar-1",
    name: "Aashirvaad Shudh Chakki Atta",
    category: "staples",
    price: 245,
    originalPrice: 280,
    unit: "5 kg",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60",
    description: "100% pure whole wheat flour milled in traditional chakki process. Retains fiber and nutrients, giving you super-soft rotis.",
    rating: 4.8,
    inStock: true,
    tag: "Best Seller"
  },
  {
    id: "ar-2",
    name: "India Gate Basmati Rice (Premium)",
    category: "staples",
    price: 110,
    originalPrice: 130,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60",
    description: "Aged long-grain basmati rice. Delivers thin, fluffy grains with standard rich aroma. Excellent for biryanis and special pulav.",
    rating: 4.7,
    inStock: true,
    tag: "Aged Grain"
  },
  {
    id: "ar-3",
    name: "Tata Sampann Toor / Arhar Dal",
    category: "staples",
    price: 165,
    originalPrice: 185,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?w=500&auto=format&fit=crop&q=60",
    description: "Unpolished toor dal rich in natural protein and dietary fiber. Delicious taste, cooks easily. Essential for daily Dal Tadka.",
    rating: 4.6,
    inStock: true,
    tag: "Unpolished"
  },

  // Snacks & Sweets
  {
    id: "ss-1",
    name: "Britannia Marie Gold Biscuits",
    category: "snacks",
    price: 35,
    originalPrice: 40,
    unit: "250 g",
    image: "https://images.unsplash.com/photo-1558961309-dbdf71799f5a?w=500&auto=format&fit=crop&q=60",
    description: "Light and crispy tea-time biscuits packed with vitamins and minerals. The ideal partner for your daily morning and evening tea.",
    rating: 4.5,
    inStock: true,
    tag: "Tea Partner"
  },
  {
    id: "ss-2",
    name: "Haldiram's Aloo Bhujia",
    category: "snacks",
    price: 50,
    originalPrice: 55,
    unit: "150 g",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=500&auto=format&fit=crop&q=60",
    description: "A spicy, crispy potato noodle snack seasoned with mint and spices. Traditional Indian namkeen that everyone loves.",
    rating: 4.7,
    inStock: true,
    tag: "Crispy"
  },
  {
    id: "ss-3",
    name: "Cadbury Dairy Milk Silk",
    category: "snacks",
    price: 80,
    originalPrice: 80,
    unit: "60 g",
    image: "https://images.unsplash.com/photo-1548907040-4d42b52115ca?w=500&auto=format&fit=crop&q=60",
    description: "Rich, smooth, and creamy milk chocolate. Melts in the mouth to give a premium chocolate experience.",
    rating: 4.8,
    inStock: true,
    tag: "Sweet Treat"
  },

  // Beverages
  {
    id: "bv-1",
    name: "Tata Tea Gold",
    category: "beverages",
    price: 140,
    originalPrice: 155,
    unit: "250 g",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60",
    description: "A unique blend of fine Assam tea leaves with long leaves for a rich taste and irresistible aroma.",
    rating: 4.7,
    inStock: true,
    tag: "Classic"
  },
  {
    id: "bv-2",
    name: "Nescafe Classic Coffee",
    category: "beverages",
    price: 185,
    originalPrice: 195,
    unit: "50 g",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60",
    description: "100% pure instant coffee powder made from carefully selected beans. Provides a strong and refreshing coffee aroma to start your day.",
    rating: 4.8,
    inStock: true,
    tag: "Instant Brew"
  },
  {
    id: "bv-3",
    name: "Coca-Cola Soft Drink",
    category: "beverages",
    price: 40,
    originalPrice: 40,
    unit: "750 ml",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60",
    description: "Refreshing, bubbly, and sweet cola carbonated beverage. Best enjoyed chilled during gatherings or hot summer days.",
    rating: 4.3,
    inStock: true,
    tag: "Chilled"
  },

  // Household Care
  {
    id: "hh-1",
    name: "Vim Dishwash Liquid Gel",
    category: "household",
    price: 99,
    originalPrice: 110,
    unit: "500 ml",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60",
    description: "Power of 100 lemons. Cuts grease easily and cleans utensils thoroughly, leaving a pleasant lemon scent.",
    rating: 4.7,
    inStock: true,
    tag: "Best Cleaning"
  },
  {
    id: "hh-2",
    name: "Surf Excel Easy Wash Detergent",
    category: "household",
    price: 135,
    originalPrice: 145,
    unit: "1 kg",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop&q=60",
    description: "Premium laundry powder engineered to dissolve completely in water and easily remove tough stains like grease, oil, mud, and ink.",
    rating: 4.6,
    inStock: true,
    tag: "Stain Remover"
  },
  {
    id: "hh-3",
    name: "Dettol Liquid Handwash",
    category: "household",
    price: 95,
    originalPrice: 99,
    unit: "200 ml Refill",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=60",
    description: "Trusted 99.9% germ protection formula from Dettol. Enriched with moisturizers to keep your hands soft, clean, and germ-free.",
    rating: 4.8,
    inStock: true,
    tag: "Antiseptic"
  }
];
