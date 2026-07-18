// Apna Bazar E-commerce JavaScript Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURATION ---
  const STORE_PHONE = "919214556654"; // Pre-filled store owner number (with country code, no +)
  const ADMIN_PIN = "123456";           // Default PIN to access owner inventory dashboard

  // --- TRANSLATIONS DICTIONARY ---
  const TRANSLATIONS = {
    en: {
      announcement: 'Free Home Delivery for orders above <strong>₹299</strong>! 🚚',
      brand_name: 'Apna Bazar',
      logo_subtitle: 'Apki Apni Dukaan',
      owner_panel: 'Owner Panel',
      quick_chat: 'Quick Chat',
      hero_tag: '✨ Local Social Internship Initiative',
      hero_title: 'Fresh Groceries <br>Delivered in <span class="highlight-text">30 Mins</span>',
      hero_desc: 'Your trusted neighborhood Kirana store, now fully digital. Experience hand-picked freshness, organic produce, and daily staples at wholesale prices.',
      badge_hygiene: '100% Hygienic',
      badge_delivery: 'Express Delivery',
      badge_min_order: 'Min Order ₹50',
      status_open: 'Open Today',
      status_time: '8 AM - 10 PM',
      store_title: 'Apna Bazar Kirana',
      owner_title: 'Store Owner & Manager',
      shop_now: 'Browse Catalog',
      categories_heading: 'Browse Categories',
      cat_all: '📦 All Items',
      cat_fruits_veg: '🥦 Veggies & Fruits',
      cat_dairy: '🥛 Dairy & Bakery',
      cat_staples: '🌾 Atta, Rice & Dals',
      cat_snacks: '🍪 Snacks & Sweets',
      cat_beverages: '🥤 Beverages',
      cat_household: '🧼 Household Care',
      sort_by: 'Sort By:',
      sort_default: 'Relevance',
      sort_low_high: 'Price: Low to High',
      sort_high_low: 'Price: High to Low',
      sort_rating: 'Popularity',
      no_results_title: 'No Items Found',
      no_results_desc: "We couldn't find anything matching your search query. Try searching for milk, potatoes, butter, or snacks!",
      clear_filters: 'Clear Filters',
      basket_title: 'My Basket',
      basket_empty_title: 'Your basket is empty',
      basket_empty_desc: 'Fill it with fresh veggies, milk, staples, or delicious snacks to get started!',
      start_shopping: 'Start Shopping',
      bill_subtotal_label: 'Item Subtotal',
      bill_discount_label: 'Discount Saved',
      bill_delivery_label: 'Delivery Fee',
      bill_total_label: 'Grand Total',
      checkout_btn: 'Proceed to Checkout',
      checkout_title: 'Delivery & Contact Details',
      checkout_desc: 'Complete your order to send it directly to Apna Bazar via WhatsApp.',
      field_name: 'Full Name *',
      field_phone: 'WhatsApp Number *',
      field_handover: 'Order Handover Option *',
      handover_delivery: 'Home Delivery',
      handover_delivery_sub: 'Deliver to address in 30 mins',
      handover_pickup: 'Self Pickup',
      handover_pickup_sub: 'Pick up from store in 15 mins',
      field_address: 'Delivery Address *',
      field_payment: 'Payment Method *',
      pay_cod: '💵 Cash on Delivery',
      pay_upi: '📱 Pay on Delivery (UPI/GPay/PhonePe)',
      field_instructions: 'Special Instructions (Optional)',
      checkout_total_items: 'Total Items:',
      checkout_payable: 'Total Amount to Pay:',
      place_order_btn: 'Place Order on WhatsApp',
      auth_title: 'Store Owner Login',
      auth_desc: 'Please enter your 4-digit security PIN to access the inventory dashboard.',
      auth_submit: 'Verify & Enter',
      footer_desc: 'Apna Bazar is dedicated to serving local communities with top-grade groceries, fresh organic farm produce, and immediate customer assistance. Supporting local vendors, creating local smiles.',
      footer_timings_title: 'Store Timings',
      timings_days: 'Monday - Sunday:',
      timings_hours: '8:00 AM - 10:00 PM',
      delivery_timings_title: 'Home Delivery Timings:',
      delivery_timings_hours: '8:30 AM - 9:30 PM',
      status_open_all_days: 'Open All Days',
      footer_portal_link: 'Store Manager Portal',
      footer_contact_title: 'Contact & Location',
      footer_address: 'Ward No. 12, Main Bazar Road, Near City Center Clock Tower, India',
      footer_copyright: '© 2026 Apna Bazar. All Rights Reserved.',
      internship_credit_text: 'Designed as a <strong>Social Internship Project</strong> to digitize local retail stores.',
      modal_qty_label: 'Qty:',
      safety_delivery: 'Delivery within 30 mins',
      safety_replacement: 'No-questions replacement',
      sold_out: 'Sold Out',
      add_to_cart: 'Add',
      checkout_summary_items_suffix: ' items',
      delivery_free_alert: '🎉 You unlocked <strong>FREE Delivery</strong>!',
      delivery_add_prefix: 'Add <strong>₹',
      delivery_add_suffix: '</strong> more for Free Delivery',
      alert_wrong_pin: '❌ Invalid PIN! Access Denied.',
      confirm_reset: '⚠️ Are you sure you want to restore all original prices and stock? This will delete all your custom changes.',
      alert_reset_success: '✅ Store inventory has been reset to defaults!',
      alert_save_success: '🎉 Store inventory and pricing updated successfully!',
      alert_wrong_auth_pin: '❌ Incorrect PIN! Please try again.',
      alert_checkout_success_prefix: 'Thank you ',
      alert_checkout_success_suffix: '! Your order details have been prepared. You will be redirected to WhatsApp to complete sending the order to the store owner.'
    },
    hi: {
      announcement: '<strong>₹299</strong> से अधिक के ऑर्डर पर मुफ्त होम डिलीवरी! 🚚',
      brand_name: 'अपना बाज़ार',
      logo_subtitle: 'आपकी अपनी दुकान',
      owner_panel: 'मालिक पैनल',
      quick_chat: 'चैट करें',
      hero_tag: '✨ स्थानीय सामाजिक इंटर्नशिप पहल',
      hero_title: 'ताज़ा किराना <br>सामान, मात्र <span class="highlight-text">30 मिनट</span> में',
      hero_desc: 'आपका भरोसेमंद पड़ोस का किराना स्टोर, अब पूरी तरह डिजिटल। थोक भावों पर ताज़ा चुनिंदा फल-सब्ज़ियां, डेयरी उत्पाद और दैनिक अनाज घर बैठे प्राप्त करें।',
      badge_hygiene: '100% स्वच्छ',
      badge_delivery: 'तेज़ डिलीवरी',
      badge_min_order: 'न्यूनतम ऑर्डर ₹50',
      status_open: 'आज खुला है',
      status_time: 'सुबह 8 - रात 10',
      store_title: 'अपना बाज़ार किराना',
      owner_title: 'दुकान स्वामी व प्रबंधक',
      shop_now: 'सामान देखें',
      categories_heading: 'श्रेणियां देखें',
      cat_all: '📦 सभी सामान',
      cat_fruits_veg: '🥦 फल और सब्ज़ियाँ',
      cat_dairy: '🥛 डेयरी और बेकरी',
      cat_staples: '🌾 आटा, चावल और दालें',
      cat_snacks: '🍪 स्नैक्स और मिठाइयाँ',
      cat_beverages: '🥤 पेय पदार्थ',
      cat_household: '🧼 घर की ज़रूरतें',
      sort_by: 'क्रमबद्ध करें:',
      sort_default: 'प्रासंगिकता',
      sort_low_high: 'कीमत: कम से अधिक',
      sort_high_low: 'कीमत: अधिक से कम',
      sort_rating: 'लोकप्रियता',
      no_results_title: 'कोई सामान नहीं मिला',
      no_results_desc: 'हमें आपकी खोज के अनुसार कोई उत्पाद नहीं मिला। दूध, आलू, मक्खन या चिप्स खोज कर देखें!',
      clear_filters: 'फ़िल्टर हटाएं',
      basket_title: 'मेरी टोकरी',
      basket_empty_title: 'आपकी टोकरी खाली है',
      basket_empty_desc: 'खरीदारी शुरू करने के लिए इसमें ताजी सब्जियां, दूध, अनाज या स्वादिष्ट स्नैक्स जोड़ें!',
      start_shopping: 'खरीदारी शुरू करें',
      bill_subtotal_label: 'सामान का मूल्य',
      bill_discount_label: 'बचत',
      bill_delivery_label: 'डिलीवरी शुल्क',
      bill_total_label: 'कुल राशि',
      checkout_btn: 'ऑर्डर करने के लिए बढ़ें',
      checkout_title: 'डिलीवरी और संपर्क विवरण',
      checkout_desc: 'व्हाट्सएप के माध्यम से अपना ऑर्डर सीधे अपना बाज़ार भेजने के लिए विवरण पूरा करें।',
      field_name: 'पूरा नाम *',
      field_phone: 'व्हाट्सएप नंबर *',
      field_handover: 'ऑर्डर प्राप्त करने का विकल्प *',
      handover_delivery: 'घर पर डिलीवरी',
      handover_delivery_sub: '30 मिनट में पते पर डिलीवरी',
      handover_pickup: 'स्वयं दुकान से उठाएं',
      handover_pickup_sub: '15 मिनट में दुकान से उठाएं',
      field_address: 'डिलीवरी का पता *',
      field_payment: 'भुगतान का माध्यम *',
      pay_cod: '💵 डिलीवरी पर नकद भुगतान',
      pay_upi: '📱 डिलीवरी पर यूपीआई (UPI/GPay/PhonePe)',
      field_instructions: 'विशेष निर्देश (वैकल्पिक)',
      checkout_total_items: 'कुल सामान:',
      checkout_payable: 'कुल देय राशि:',
      place_order_btn: 'व्हाट्सएप पर ऑर्डर भेजें',
      auth_title: 'स्टोर मालिक लॉगिन',
      auth_desc: 'इन्वेंट्री डैशबोर्ड तक पहुँचने के लिए कृपया अपना 4-अंकीय सुरक्षा पिन दर्ज करें।',
      auth_submit: 'सत्यापित करें और प्रवेश करें',
      footer_desc: 'अपना बाज़ार स्थानीय समुदायों को उच्च श्रेणी के किराने का सामान, ताज़े जैविक कृषि उत्पाद और तत्काल सहायता प्रदान करने के लिए प्रतिबद्ध है। स्थानीय दुकानदारों का समर्थन, स्थानीय मुस्कान।',
      footer_timings_title: 'दुकान का समय',
      timings_days: 'सोमवार - रविवार:',
      timings_hours: 'सुबह 8:00 - रात 10:00',
      delivery_timings_title: 'होम डिलीवरी का समय:',
      delivery_timings_hours: 'सुबह 8:30 - रात 9:30',
      status_open_all_days: 'सभी दिन खुला है',
      footer_portal_link: 'स्टोर मैनेजर पोर्टल',
      footer_contact_title: 'संपर्क और स्थान',
      footer_address: 'वार्ड नंबर 12, मुख्य बाजार मार्ग, क्लॉक टॉवर के पास, भारत',
      footer_copyright: '© 2026 अपना बाज़ार। सर्वाधिकार सुरक्षित।',
      internship_credit_text: 'स्थानीय दुकानों को डिजिटल बनाने के लिए एक <strong>सामाजिक इंटर्नशिप परियोजना</strong> के रूप में डिज़ाइन किया गया।',
      modal_qty_label: 'मात्रा:',
      safety_delivery: '30 मिनट में सुरक्षित डिलीवरी',
      safety_replacement: 'बिना सवाल पूछे वापसी/बदलाव',
      sold_out: 'आउट ऑफ स्टॉक',
      add_to_cart: 'जोड़ें',
      checkout_summary_items_suffix: ' सामान',
      delivery_free_alert: '🎉 आपने <strong>मुफ्त डिलीवरी</strong> प्राप्त कर ली है!',
      delivery_add_prefix: 'मुफ्त डिलीवरी के लिए <strong>₹',
      delivery_add_suffix: '</strong> और जोड़ें',
      alert_wrong_pin: '❌ गलत पिन! प्रवेश वर्जित है।',
      confirm_reset: '⚠️ क्या आप सच में सभी मूल कीमतें और स्टॉक वापस रिसेट करना चाहते हैं? इससे आपके सभी बदलाव मिट जाएंगे।',
      alert_reset_success: '✅ स्टोर इन्वेंट्री रिसेट कर दी गई है!',
      alert_save_success: '🎉 स्टोर कीमतें और स्टॉक अपडेट कर दिए गए हैं!',
      alert_wrong_auth_pin: '❌ गलत पिन! कृपया पुनः प्रयास करें।',
      alert_checkout_success_prefix: 'धन्यवाद ',
      alert_checkout_success_suffix: '! आपका ऑर्डर विवरण तैयार कर दिया गया है। मालिक को ऑर्डर भेजने के लिए आपको व्हाट्सएप पर भेजा जा रहा है।'
    }
  };

  // --- STATE ---
  let currentLanguage = localStorage.getItem("apnabazar_lang") || "en";
  let cart = [];
  let inventory = [];                 // Dynamic catalog modified by the owner
  let currentCategory = "all";
  let searchQuery = "";
  let sortBy = "default";
  let activeModalProduct = null;

  // --- DOM ELEMENTS ---
  const productsGrid = document.getElementById("products-grid");
  const noResultsState = document.getElementById("no-results");
  const resultsCountText = document.getElementById("results-count");
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  
  // Navigation & Search elements
  const categoryTabs = document.getElementById("category-tabs");
  const searchInputDesktop = document.getElementById("search-input-desktop");
  const searchInputMobile = document.getElementById("search-input-mobile");
  const clearSearchDesktop = document.getElementById("clear-search-desktop");
  const clearSearchMobile = document.getElementById("clear-search-mobile");
  const sortSelect = document.getElementById("sort-select");

  // Cart Drawer elements
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartToggleBtn = document.getElementById("cart-toggle-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const continueShoppingBtn = document.getElementById("continue-shopping-btn");
  
  // Cart Filled vs Empty states
  const cartEmpty = document.getElementById("cart-empty");
  const cartFilled = document.getElementById("cart-filled");
  const cartItemsContainer = document.getElementById("cart-items-container");
  
  // Cart Pricing summary elements
  const cartBadgeCount = document.getElementById("cart-badge-count");
  const cartDrawerCount = document.getElementById("cart-drawer-count");
  const cartTotalPreview = document.getElementById("cart-total-preview");
  const billSubtotal = document.getElementById("bill-subtotal");
  const billDiscount = document.getElementById("bill-discount");
  const billDelivery = document.getElementById("bill-delivery");
  const deliveryProgressFill = document.getElementById("delivery-progress-fill");
  const deliveryProgressText = document.getElementById("delivery-progress-text");
  const deliveryProgressContainer = document.getElementById("delivery-progress-container");
  const billTotal = document.getElementById("bill-total");
  const openCheckoutModalBtn = document.getElementById("open-checkout-modal-btn");

  // Product Detail Modal elements
  const productDetailModal = document.getElementById("product-detail-modal");
  const closeDetailModal = document.getElementById("close-detail-modal");
  const modalProductImage = document.getElementById("modal-product-image");
  const modalProductTag = document.getElementById("modal-product-tag");
  const modalProductCategory = document.getElementById("modal-product-category");
  const modalProductName = document.getElementById("modal-product-name");
  const modalProductUnit = document.getElementById("modal-product-unit");
  const modalProductRatingNum = document.getElementById("modal-product-rating-num");
  const modalProductStars = document.getElementById("modal-product-stars");
  const modalProductPrice = document.getElementById("modal-product-price");
  const modalProductOriginalPrice = document.getElementById("modal-product-original-price");
  const modalProductDiscountPercentage = document.getElementById("modal-product-discount-percentage");
  const modalProductDescription = document.getElementById("modal-product-description");
  const modalDecQtyBtn = document.getElementById("modal-dec-qty");
  const modalIncQtyBtn = document.getElementById("modal-inc-qty");
  const modalQtyVal = document.getElementById("modal-qty-val");
  const modalAddToCartBtn = document.getElementById("modal-add-to-cart-btn");

  // Checkout Modal elements
  const checkoutModal = document.getElementById("checkout-modal");
  const closeCheckoutModal = document.getElementById("close-checkout-modal");
  const checkoutForm = document.getElementById("checkout-form");
  const addressGroup = document.getElementById("address-group");
  const customerAddressInput = document.getElementById("customer-address");
  const deliveryTypeRadios = document.getElementsByName("delivery-type");
  const paymentMethodRadios = document.getElementsByName("payment-method");
  const checkoutSummaryItems = document.getElementById("checkout-summary-items");
  const checkoutSummaryTotal = document.getElementById("checkout-summary-total");

  // Owner Admin Dashboard Modal elements
  const adminDashboardModal = document.getElementById("admin-dashboard-modal");
  const closeAdminModal = document.getElementById("close-admin-modal");
  const adminToggleBtn = document.getElementById("admin-toggle-btn");
  const adminFooterBtn = document.getElementById("admin-footer-btn");
  const adminSearchInput = document.getElementById("admin-search-input");
  const adminResetBtn = document.getElementById("admin-reset-btn");
  const adminProductRows = document.getElementById("admin-product-rows");
  const cancelAdminChangesBtn = document.getElementById("cancel-admin-changes-btn");
  const saveAdminChangesBtn = document.getElementById("save-admin-changes-btn");

  // Owner Authentication Modal elements
  const adminAuthModal = document.getElementById("admin-auth-modal");
  const closeAuthModal = document.getElementById("close-auth-modal");
  const adminAuthForm = document.getElementById("admin-auth-form");
  const adminPasswordInput = document.getElementById("admin-password-input");
  const authErrorMsg = document.getElementById("auth-error-msg");

  // Language toggle button elements
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  const langToggleText = document.getElementById("lang-toggle-text");

  // --- INITIALIZATION ---
  function init() {
    loadInventory();
    loadCart();
    applyLanguage(); // Initial translation render
    setupEventListeners();
    lucide.createIcons();
  }

  // --- TRANSLATION TRANSLATOR ---
  function applyLanguage() {
    // 1. Save language setting
    localStorage.setItem("apnabazar_lang", currentLanguage);

    // 2. Loop and translate static elements
    const transKeyElements = document.querySelectorAll("[data-translate]");
    transKeyElements.forEach(el => {
      const key = el.dataset.translate;
      if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
        el.innerHTML = TRANSLATIONS[currentLanguage][key];
      }
    });

    // 3. Translate Search Placeholders and toggles
    if (currentLanguage === "hi") {
      searchInputDesktop.placeholder = "ताज़ी सब्ज़ियाँ, दूध, मक्खन, आटा खोजें...";
      searchInputMobile.placeholder = "सामान खोजें...";
      langToggleText.textContent = "English";
    } else {
      searchInputDesktop.placeholder = "Search fresh vegetables, dairy, snacks, flour...";
      searchInputMobile.placeholder = "Search for groceries...";
      langToggleText.textContent = "हिन्दी";
    }

    // 4. Redraw lists to sync values
    renderProducts();
    updateCartUI();
  }

  // --- LOCAL STORAGE HELPERS FOR INVENTORY ---
  function loadInventory() {
    const savedInventory = localStorage.getItem("apnabazar_dynamic_inventory");
    if (savedInventory) {
      try {
        const saved = JSON.parse(savedInventory);
        // Automatically merge any new products added to products.js
        let updated = false;
        PRODUCTS.forEach(p => {
          const exists = saved.some(item => item.id === p.id);
          if (!exists) {
            saved.push(JSON.parse(JSON.stringify(p))); // add deep copy
            updated = true;
          }
        });
        inventory = saved;
        if (updated) saveInventory();
      } catch (e) {
        inventory = JSON.parse(JSON.stringify(PRODUCTS)); // fallback deep copy
      }
    } else {
      inventory = JSON.parse(JSON.stringify(PRODUCTS)); // deep copy of original database
      saveInventory();
    }
  }

  function saveInventory() {
    localStorage.setItem("apnabazar_dynamic_inventory", JSON.stringify(inventory));
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Language Toggle button
    langToggleBtn.addEventListener("click", () => {
      currentLanguage = currentLanguage === "en" ? "hi" : "en";
      applyLanguage();
    });

    // Category tabs filtering
    categoryTabs.addEventListener("click", (e) => {
      const tabButton = e.target.closest(".category-tab");
      if (!tabButton) return;
      
      // Update UI
      document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
      tabButton.classList.add("active");
      
      // Update state & render
      currentCategory = tabButton.dataset.category;
      renderProducts();
    });

    // Real-time search inputs
    const handleSearchInput = (e, clearBtn, otherInput) => {
      const value = e.target.value;
      searchQuery = value.trim();
      otherInput.value = value; // Sync desktop and mobile search bars

      // Toggle clear button
      if (searchQuery.length > 0) {
        clearBtn.style.display = "flex";
      } else {
        clearBtn.style.display = "none";
      }

      renderProducts();
    };

    searchInputDesktop.addEventListener("input", (e) => {
      handleSearchInput(e, clearSearchDesktop, searchInputMobile);
    });

    searchInputMobile.addEventListener("input", (e) => {
      handleSearchInput(e, clearSearchMobile, searchInputDesktop);
    });

    // Clear search buttons
    clearSearchDesktop.addEventListener("click", () => {
      searchInputDesktop.value = "";
      searchInputMobile.value = "";
      clearSearchDesktop.style.display = "none";
      clearSearchMobile.style.display = "none";
      searchQuery = "";
      renderProducts();
    });

    clearSearchMobile.addEventListener("click", () => {
      searchInputDesktop.value = "";
      searchInputMobile.value = "";
      clearSearchDesktop.style.display = "none";
      clearSearchMobile.style.display = "none";
      searchQuery = "";
      renderProducts();
    });

    // Reset filters button (no results state)
    resetFiltersBtn.addEventListener("click", () => {
      // Clear searches
      searchInputDesktop.value = "";
      searchInputMobile.value = "";
      clearSearchDesktop.style.display = "none";
      clearSearchMobile.style.display = "none";
      searchQuery = "";

      // Reset category tab
      document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
      document.querySelector('[data-category="all"]').classList.add("active");
      currentCategory = "all";

      // Reset sort
      sortSelect.value = "default";
      sortBy = "default";

      renderProducts();
    });

    // Sort select handler
    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderProducts();
    });

    // Cart Drawer Toggle
    cartToggleBtn.addEventListener("click", openCart);
    closeCartBtn.addEventListener("click", closeCart);
    cartOverlay.addEventListener("click", closeCart);
    continueShoppingBtn.addEventListener("click", closeCart);

    // Detail Modal Closes
    closeDetailModal.addEventListener("click", () => closeProductModal());
    productDetailModal.addEventListener("click", (e) => {
      if (e.target === productDetailModal) closeProductModal();
    });

    // Checkout Modal Open & Close
    openCheckoutModalBtn.addEventListener("click", openCheckout);
    closeCheckoutModal.addEventListener("click", closeCheckout);
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeCheckout();
    });

    // Toggle delivery address field based on handover choice
    deliveryTypeRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        // Toggle active radio card style
        document.querySelectorAll(".radio-card").forEach(card => card.classList.remove("active"));
        e.target.closest(".radio-card").classList.add("active");

        if (e.target.value === "home") {
          addressGroup.style.display = "flex";
          customerAddressInput.setAttribute("required", "required");
        } else {
          addressGroup.style.display = "none";
          customerAddressInput.removeAttribute("required");
        }
      });
    });

    // Toggle active classes on payment pills
    paymentMethodRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        document.querySelectorAll(".payment-option-pill").forEach(pill => pill.classList.remove("active"));
        e.target.closest(".payment-option-pill").classList.add("active");
      });
    });

    // Form submission (WhatsApp redirection)
    checkoutForm.addEventListener("submit", submitOrder);

    // --- OWNER ADMIN PORTAL TRIGGERS ---
    adminToggleBtn.addEventListener("click", openAdminAuthModal);
    adminFooterBtn.addEventListener("click", openAdminAuthModal);

    // Auth Modal Closes
    closeAuthModal.addEventListener("click", closeAdminAuthModal);
    adminAuthModal.addEventListener("click", (e) => {
      if (e.target === adminAuthModal) closeAdminAuthModal();
    });

    // Auth Form Submission
    adminAuthForm.addEventListener("submit", handleAdminAuthSubmit);

    // Dashboard Modal Closes
    closeAdminModal.addEventListener("click", closeAdminDashboard);
    cancelAdminChangesBtn.addEventListener("click", closeAdminDashboard);
    adminDashboardModal.addEventListener("click", (e) => {
      if (e.target === adminDashboardModal) closeAdminDashboard();
    });

    // Admin Real-time Search Input
    adminSearchInput.addEventListener("input", (e) => {
      const search = e.target.value.trim();
      renderAdminTable(search);
    });

    // Admin Restore Defaults Button
    adminResetBtn.addEventListener("click", () => {
      const confirmMsg = TRANSLATIONS[currentLanguage].confirm_reset;
      if (confirm(confirmMsg)) {
        inventory = JSON.parse(JSON.stringify(PRODUCTS)); // deep copy of original database
        saveInventory();
        renderAdminTable(adminSearchInput.value.trim());
        renderProducts();
        updateCartUI(); // sync cart if items changed
        alert(TRANSLATIONS[currentLanguage].alert_reset_success);
      }
    });

    // Save Admin Changes Button
    saveAdminChangesBtn.addEventListener("click", saveAdminInventory);
  }

  // --- CATALOG RENDERING ---
  function renderProducts() {
    productsGrid.innerHTML = "";

    // 1. Filter using the dynamic inventory state
    let filtered = inventory.filter(p => {
      const matchesCategory = (currentCategory === "all" || p.category === currentCategory);
      
      const nameVal = p.name_hi && currentLanguage === "hi" ? p.name_hi : p.name;
      const descVal = p.description_hi && currentLanguage === "hi" ? p.description_hi : p.description;
      const tagVal = p.tag_hi && currentLanguage === "hi" ? p.tag_hi : p.tag;

      const matchesSearch = (nameVal.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             descVal.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             tagVal.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Update count labels
    if (searchQuery) {
      if (currentLanguage === "hi") {
        resultsCountText.textContent = `"${searchQuery}" के लिए ${filtered.length} उत्पाद मिले`;
      } else {
        resultsCountText.textContent = `Found ${filtered.length} items for "${searchQuery}"`;
      }
    } else {
      if (currentLanguage === "hi") {
        resultsCountText.textContent = `${filtered.length} उत्पाद उपलब्ध हैं`;
      } else {
        resultsCountText.textContent = `${filtered.length} products available`;
      }
    }

    // Show/hide empty state
    if (filtered.length === 0) {
      noResultsState.style.display = "block";
      productsGrid.style.display = "none";
      return;
    } else {
      noResultsState.style.display = "none";
      productsGrid.style.display = "grid";
    }

    // 2. Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    // 3. Inject Cards
    filtered.forEach(product => {
      const cartItem = cart.find(item => item.id === product.id);
      const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      
      const card = document.createElement("article");
      card.className = "product-card";
      
      const productName = product.name_hi && currentLanguage === "hi" ? product.name_hi : product.name;
      const productUnit = product.unit_hi && currentLanguage === "hi" ? product.unit_hi : product.unit;
      const productTag = product.tag_hi && currentLanguage === "hi" ? product.tag_hi : product.tag;
      const discountText = currentLanguage === "hi" ? `${discountPercentage}% छूट` : `${discountPercentage}% OFF`;

      // Determine what to render for the cart controls
      let cartControlsHTML = "";
      if (!product.inStock) {
        card.classList.add("out-of-stock");
        cartControlsHTML = `
          <button class="out-of-stock-btn" disabled>
            <i data-lucide="slash"></i> ${TRANSLATIONS[currentLanguage].sold_out}
          </button>
        `;
      } else if (cartItem) {
        cartControlsHTML = `
          <div class="card-qty-selector">
            <button class="card-qty-btn dec-qty" data-id="${product.id}">
              <i data-lucide="minus"></i>
            </button>
            <span class="card-qty-val">${cartItem.quantity}</span>
            <button class="card-qty-btn inc-qty" data-id="${product.id}">
              <i data-lucide="plus"></i>
            </button>
          </div>
        `;
      } else {
        cartControlsHTML = `
          <button class="add-to-cart-btn" data-id="${product.id}">
            ${TRANSLATIONS[currentLanguage].add_to_cart} <i data-lucide="plus"></i>
          </button>
        `;
      }

      card.innerHTML = `
        <div class="product-card-top" data-id="${product.id}">
          ${product.price < product.originalPrice ? `<span class="product-badge">${discountText}</span>` : ""}
          <img src="${product.image}" alt="${productName}" loading="lazy">
          ${!product.inStock ? `<span class="out-of-stock-label">${TRANSLATIONS[currentLanguage].sold_out}</span>` : ""}
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${getCategoryLabel(product.category)}</span>
          <h4 class="product-card-title" data-id="${product.id}">${productName}</h4>
          <span class="product-card-unit">${productUnit}</span>
          
          <div class="rating-pill">
            <i data-lucide="star"></i>
            <span>${product.rating}</span>
          </div>

          <div class="product-card-footer">
            <div class="price-box">
              <div class="price-row">
                <span class="price-current">₹${product.price}</span>
                ${product.price < product.originalPrice ? `<span class="price-original">₹${product.originalPrice}</span>` : ""}
              </div>
            </div>
            <div class="actions-box">
              ${cartControlsHTML}
            </div>
          </div>
        </div>
      `;

      // Set events on details triggers (Image click and title click)
      card.querySelector(".product-card-top").addEventListener("click", () => openProductModal(product.id));
      card.querySelector(".product-card-title").addEventListener("click", () => openProductModal(product.id));

      // Set events on cart buttons if product is in stock
      if (product.inStock) {
        const addBtn = card.querySelector(".add-to-cart-btn");
        if (addBtn) {
          addBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            addToCart(product.id);
          });
        }

        const decBtn = card.querySelector(".dec-qty");
        if (decBtn) {
          decBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            updateQuantity(product.id, -1);
          });
        }

        const incBtn = card.querySelector(".inc-qty");
        if (incBtn) {
          incBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            updateQuantity(product.id, 1);
          });
        }
      }

      productsGrid.appendChild(card);
    });

    lucide.createIcons();
  }

  // --- CART STATE ACTIONS ---
  function addToCart(productId, quantity = 1) {
    const product = inventory.find(p => p.id === productId);
    if (!product || !product.inStock) return; // Prevent adding out-of-stock items

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        name_hi: product.name_hi,
        price: product.price,
        originalPrice: product.originalPrice,
        unit: product.unit,
        unit_hi: product.unit_hi,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    saveCart();
    updateCartUI();
    renderProducts(); // Re-render grid to show quantity buttons
    
    // Animate cart badge to draw attention
    cartToggleBtn.classList.add("wobble-animation");
    setTimeout(() => cartToggleBtn.classList.remove("wobble-animation"), 500);

    // If modal is active, update modal qty indicator
    if (activeModalProduct && activeModalProduct.id === productId) {
      const updatedItem = cart.find(item => item.id === productId);
      modalQtyVal.textContent = updatedItem.quantity;
    }
  }

  function updateQuantity(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index === -1) return;

    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }

    saveCart();
    updateCartUI();
    renderProducts();

    // If modal is active, update modal qty indicator
    if (activeModalProduct && activeModalProduct.id === productId) {
      const updatedItem = cart.find(item => item.id === productId);
      modalQtyVal.textContent = updatedItem ? updatedItem.quantity : 1;
    }
  }

  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderProducts();
    
    // If modal is active, update modal
    if (activeModalProduct && activeModalProduct.id === productId) {
      modalQtyVal.textContent = 1;
    }
  }

  function updateCartUI() {
    // 1. Calculate count & totals
    const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalOriginal = cart.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const discountSaved = totalOriginal - subtotal;
    
    // Delivery fees calculation: Free above ₹299, else ₹39
    let deliveryFee = 0;
    if (subtotal > 0) {
      deliveryFee = subtotal >= 299 ? 0 : 39;
    }
    const totalPayable = subtotal + deliveryFee;

    // 2. Update Header elements
    cartBadgeCount.textContent = totalItemsCount;
    cartDrawerCount.textContent = totalItemsCount;
    cartTotalPreview.textContent = `₹${subtotal}`;

    // 3. Update Cart Sidebar list
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartEmpty.style.display = "flex";
      cartFilled.style.display = "none";
    } else {
      cartEmpty.style.display = "none";
      cartFilled.style.display = "flex";

      cart.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        const cartItemEl = document.createElement("div");
        cartItemEl.className = "cart-item";
        
        const itemName = item.name_hi && currentLanguage === "hi" ? item.name_hi : item.name;
        const itemUnit = item.unit_hi && currentLanguage === "hi" ? item.unit_hi : item.unit;
        const removeLabel = currentLanguage === "hi" ? "हटाएं" : "Remove";

        cartItemEl.innerHTML = `
          <img src="${item.image}" alt="${itemName}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${itemName}</h4>
            <p class="cart-item-weight">${itemUnit}</p>
            <div class="cart-item-price-calc">
              <span class="cart-item-subtotal">₹${itemSubtotal}</span>
              <span class="cart-item-rate">(₹${item.price} x ${item.quantity})</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-item-qty">
              <button class="cart-qty-btn-small dec-cart-qty" data-id="${item.id}">
                <i data-lucide="minus"></i>
              </button>
              <span class="cart-qty-val-small">${item.quantity}</span>
              <button class="cart-qty-btn-small inc-cart-qty" data-id="${item.id}">
                <i data-lucide="plus"></i>
              </button>
            </div>
            <button class="remove-item-btn" data-id="${item.id}">
              <i data-lucide="trash-2"></i> ${removeLabel}
            </button>
          </div>
        `;

        // Event listeners inside Cart items
        cartItemEl.querySelector(".dec-cart-qty").addEventListener("click", () => updateQuantity(item.id, -1));
        cartItemEl.querySelector(".inc-cart-qty").addEventListener("click", () => updateQuantity(item.id, 1));
        cartItemEl.querySelector(".remove-item-btn").addEventListener("click", () => removeFromCart(item.id));

        cartItemsContainer.appendChild(cartItemEl);
      });
    }

    // 4. Update Bill Summary texts
    billSubtotal.textContent = `₹${subtotal}`;
    billDiscount.textContent = `-₹${discountSaved}`;
    billDelivery.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`;
    billTotal.textContent = `₹${totalPayable}`;

    // Delivery progress meter
    if (subtotal === 0) {
      deliveryProgressContainer.style.display = "none";
    } else {
      deliveryProgressContainer.style.display = "block";
      if (subtotal >= 299) {
        deliveryProgressFill.style.width = "100%";
        deliveryProgressText.innerHTML = TRANSLATIONS[currentLanguage].delivery_free_alert;
        deliveryProgressFill.style.backgroundColor = "var(--primary)";
      } else {
        const remaining = 299 - subtotal;
        const percent = Math.min((subtotal / 299) * 100, 100);
        deliveryProgressFill.style.width = `${percent}%`;
        deliveryProgressText.innerHTML = `${TRANSLATIONS[currentLanguage].delivery_add_prefix}${remaining}${TRANSLATIONS[currentLanguage].delivery_add_suffix}`;
        deliveryProgressFill.style.backgroundColor = "var(--secondary)";
      }
    }

    // 5. Update Checkout summary panel values (for checkout modal)
    checkoutSummaryItems.textContent = `${totalItemsCount}${TRANSLATIONS[currentLanguage].checkout_summary_items_suffix}`;
    checkoutSummaryTotal.textContent = `₹${totalPayable}`;

    lucide.createIcons();
  }

  // --- LOCAL STORAGE HELPERS FOR CART ---
  function saveCart() {
    localStorage.setItem("apnabazar_cart", JSON.stringify(cart));
  }

  function loadCart() {
    const saved = localStorage.getItem("apnabazar_cart");
    if (saved) {
      try {
        cart = JSON.parse(saved);
        
        // Sanity Check: Remove any items that are no longer in stock in the dynamic inventory
        let cartChanged = false;
        cart = cart.filter(item => {
          const invProduct = inventory.find(p => p.id === item.id);
          if (invProduct && !invProduct.inStock) {
            cartChanged = true;
            return false;
          }
          // Also sync current pricing
          if (invProduct && invProduct.price !== item.price) {
            item.price = invProduct.price;
            item.originalPrice = invProduct.originalPrice;
            cartChanged = true;
          }
          return true;
        });

        if (cartChanged) saveCart();
      } catch (e) {
        cart = [];
      }
    }
  }

  // --- DRAWER TOGGLE ---
  function openCart() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // disable background scrolling
  }

  function closeCart() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // restore scrolling
  }

  // --- PRODUCT DETAIL MODAL ---
  function openProductModal(productId) {
    const product = inventory.find(p => p.id === productId);
    if (!product) return;

    activeModalProduct = product;
    const cartItem = cart.find(item => item.id === product.id);

    const productName = product.name_hi && currentLanguage === "hi" ? product.name_hi : product.name;
    const productUnit = product.unit_hi && currentLanguage === "hi" ? product.unit_hi : product.unit;
    const productTag = product.tag_hi && currentLanguage === "hi" ? product.tag_hi : product.tag;
    const productDesc = product.description_hi && currentLanguage === "hi" ? product.description_hi : product.description;

    // Populate Fields
    modalProductImage.src = product.image;
    modalProductImage.alt = productName;
    
    // Tag badge
    if (product.tag) {
      modalProductTag.textContent = productTag;
      modalProductTag.style.display = "inline-block";
    } else {
      modalProductTag.style.display = "none";
    }

    modalProductCategory.textContent = getCategoryLabel(product.category);
    modalProductName.textContent = productName;
    modalProductUnit.textContent = productUnit;
    modalProductRatingNum.textContent = product.rating;
    
    // Pricing
    modalProductPrice.textContent = `₹${product.price}`;
    if (product.price < product.originalPrice) {
      modalProductOriginalPrice.textContent = `₹${product.originalPrice}`;
      modalProductOriginalPrice.style.display = "inline-block";
      const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      const discountText = currentLanguage === "hi" ? `${discountPercentage}% छूट` : `${discountPercentage}% OFF`;
      modalProductDiscountPercentage.textContent = discountText;
      modalProductDiscountPercentage.style.display = "inline-block";
    } else {
      modalProductOriginalPrice.style.display = "none";
      modalProductDiscountPercentage.style.display = "none";
    }

    modalProductDescription.textContent = productDesc;
    
    // Quantity indicator
    const currentQty = cartItem ? cartItem.quantity : 1;
    modalQtyVal.textContent = currentQty;

    // Star ratings renderer
    modalProductStars.innerHTML = "";
    const floorRating = Math.floor(product.rating);
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("i");
      star.setAttribute("data-lucide", "star");
      if (i <= floorRating) {
        star.className = "filled";
      }
      modalProductStars.appendChild(star);
    }

    // Modal Actions & Stock enforcement
    const qtySelectorWrapper = productDetailModal.querySelector(".qty-selector");
    
    if (!product.inStock) {
      modalAddToCartBtn.innerHTML = `${TRANSLATIONS[currentLanguage].sold_out} <i data-lucide="slash"></i>`;
      modalAddToCartBtn.style.background = "#e2e8f0";
      modalAddToCartBtn.style.color = "var(--text-muted)";
      modalAddToCartBtn.style.pointerEvents = "none";
      qtySelectorWrapper.style.opacity = "0.5";
      qtySelectorWrapper.style.pointerEvents = "none";
    } else {
      const basketLabel = currentLanguage === "hi" ? "टोकरी में जोड़ें" : "Add to Basket";
      modalAddToCartBtn.innerHTML = `${basketLabel} <i data-lucide="shopping-cart"></i>`;
      modalAddToCartBtn.style.background = "var(--primary)";
      modalAddToCartBtn.style.color = "white";
      modalAddToCartBtn.style.pointerEvents = "auto";
      qtySelectorWrapper.style.opacity = "1";
      qtySelectorWrapper.style.pointerEvents = "auto";
    }

    // Modal Events reset (Remove old events by cloning buttons)
    const newDec = modalDecQtyBtn.cloneNode(true);
    const newInc = modalIncQtyBtn.cloneNode(true);
    const newAdd = modalAddToCartBtn.cloneNode(true);

    modalDecQtyBtn.parentNode.replaceChild(newDec, modalDecQtyBtn);
    modalIncQtyBtn.parentNode.replaceChild(newInc, modalIncQtyBtn);
    modalAddToCartBtn.parentNode.replaceChild(newAdd, modalAddToCartBtn);

    // Re-bind fresh events if product is in stock
    if (product.inStock) {
      document.getElementById("modal-dec-qty").addEventListener("click", () => {
        let qty = parseInt(document.getElementById("modal-qty-val").textContent);
        if (qty > 1) {
          qty--;
          document.getElementById("modal-qty-val").textContent = qty;
          // If it's already in the cart, sync it
          if (cartItem) {
            updateQuantity(product.id, -1);
          }
        }
      });

      document.getElementById("modal-inc-qty").addEventListener("click", () => {
        let qty = parseInt(document.getElementById("modal-qty-val").textContent);
        qty++;
        document.getElementById("modal-qty-val").textContent = qty;
        // If it's already in the cart, sync it
        if (cartItem) {
          updateQuantity(product.id, 1);
        }
      });

      document.getElementById("modal-add-to-cart-btn").addEventListener("click", () => {
        const qty = parseInt(document.getElementById("modal-qty-val").textContent);
        
        if (cartItem) {
          openCart();
          closeProductModal();
        } else {
          addToCart(product.id, qty);
          openCart();
          closeProductModal();
        }
      });
    }

    // Open Modal Layout
    productDetailModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  }

  function closeProductModal() {
    productDetailModal.style.display = "none";
    activeModalProduct = null;
    if (!cartDrawer.classList.contains("active") && !adminDashboardModal.classList.contains("active") && !adminAuthModal.classList.contains("active")) {
      document.body.style.overflow = ""; // Restore scrolling only if drawers are shut
    }
  }

  // --- CHECKOUT MODAL ---
  function openCheckout() {
    if (cart.length === 0) return;
    
    // Sync cart drawer closure
    closeCart();

    checkoutModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Auto focus name input
    setTimeout(() => {
      document.getElementById("customer-name").focus();
    }, 100);
  }

  // --- OWNER AUTHENTICATION MODAL TRIGGERS ---
  function openAdminAuthModal() {
    closeCart();
    closeProductModal();

    // Reset password dialog box inputs
    adminPasswordInput.value = "";
    authErrorMsg.textContent = "";
    adminAuthModal.querySelector(".admin-auth-card").classList.remove("shake-element");

    adminAuthModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    // Auto focus the PIN code field
    setTimeout(() => {
      adminPasswordInput.focus();
    }, 150);
  }

  function closeAdminAuthModal() {
    adminAuthModal.style.display = "none";
    if (!cartDrawer.classList.contains("active") && !adminDashboardModal.classList.contains("active")) {
      document.body.style.overflow = "";
    }
  }

  function handleAdminAuthSubmit(e) {
    e.preventDefault();
    const inputPassword = adminPasswordInput.value.trim();

    if (inputPassword === ADMIN_PIN) {
      closeAdminAuthModal();
      openAdminDashboard(); // PIN verified successfully
    } else {
      // Trigger error & shake card
      authErrorMsg.textContent = TRANSLATIONS[currentLanguage].alert_wrong_auth_pin;
      adminPasswordInput.value = "";
      adminPasswordInput.focus();

      const authCard = adminAuthModal.querySelector(".admin-auth-card");
      authCard.classList.remove("shake-element");
      void authCard.offsetWidth; // trigger reflow
      authCard.classList.add("shake-element");
    }
  }

  function closeCheckout() {
    checkoutModal.style.display = "none";
    document.body.style.overflow = "";
  }

  // --- OWNER ADMIN PORTAL LOGIC ---
  function openAdminDashboard() {
    // Close other drawers
    closeCart();
    closeProductModal();

    // Reset search query & render
    adminSearchInput.value = "";
    renderAdminTable();

    // Show modal
    adminDashboardModal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeAdminDashboard() {
    adminDashboardModal.style.display = "none";
    document.body.style.overflow = "";
  }

  function renderAdminTable(searchFilter = "") {
    adminProductRows.innerHTML = "";

    const filteredInventory = inventory.filter(p => {
      const nameVal = p.name_hi && currentLanguage === "hi" ? p.name_hi : p.name;
      return p.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
             nameVal.toLowerCase().includes(searchFilter.toLowerCase()) ||
             p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
             getCategoryLabel(p.category).toLowerCase().includes(searchFilter.toLowerCase());
    });

    if (filteredInventory.length === 0) {
      adminProductRows.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 30px; color: var(--text-light); font-weight: 600;">
            No matching products in store catalog.
          </td>
        </tr>
      `;
      return;
    }

    filteredInventory.forEach(product => {
      const row = document.createElement("tr");
      const productName = product.name_hi && currentLanguage === "hi" ? product.name_hi : product.name;
      const productUnit = product.unit_hi && currentLanguage === "hi" ? product.unit_hi : product.unit;

      row.innerHTML = `
        <td>
          <div class="admin-prod-cell">
            <img src="${product.image}" alt="${productName}" class="admin-prod-thumb">
            <div>
              <span class="admin-prod-name">${productName}</span>
              <span class="admin-prod-unit">${productUnit}</span>
            </div>
          </div>
        </td>
        <td>
          <span style="font-size: 0.8rem; font-weight: 700; background: #f1f5f9; padding: 4px 8px; border-radius: var(--radius-sm); text-transform: uppercase;">
            ${getCategoryLabel(product.category)}
          </span>
        </td>
        <td>
          <input type="number" min="0" class="admin-price-input current-price-field" data-id="${product.id}" value="${product.price}">
        </td>
        <td>
          <input type="number" min="0" class="admin-price-input original-price-field" data-id="${product.id}" value="${product.originalPrice}">
        </td>
        <td>
          <label class="switch">
            <input type="checkbox" class="stock-toggle-field" data-id="${product.id}" ${product.inStock ? "checked" : ""}>
            <span class="slider-round"></span>
          </label>
        </td>
      `;
      adminProductRows.appendChild(row);
    });
  }

  function saveAdminInventory() {
    // 1. Gather all inputs inside the table
    const currentPriceFields = adminProductRows.querySelectorAll(".current-price-field");
    const originalPriceFields = adminProductRows.querySelectorAll(".original-price-field");
    const stockToggleFields = adminProductRows.querySelectorAll(".stock-toggle-field");

    let inventoryChanged = false;
    let outOfStockIds = [];

    // 2. Loop and map back changes to the dynamic inventory state
    currentPriceFields.forEach(field => {
      const productId = field.dataset.id;
      const val = Number(field.value);
      const product = inventory.find(p => p.id === productId);
      if (product && product.price !== val) {
        product.price = val >= 0 ? val : 0;
        inventoryChanged = true;
      }
    });

    originalPriceFields.forEach(field => {
      const productId = field.dataset.id;
      const val = Number(field.value);
      const product = inventory.find(p => p.id === productId);
      if (product && product.originalPrice !== val) {
        product.originalPrice = val >= 0 ? val : 0;
        // Make sure original price is never less than current price for consistency
        if (product.originalPrice < product.price) {
          product.originalPrice = product.price;
        }
        inventoryChanged = true;
      }
    });

    stockToggleFields.forEach(field => {
      const productId = field.dataset.id;
      const checked = field.checked;
      const product = inventory.find(p => p.id === productId);
      if (product && product.inStock !== checked) {
        product.inStock = checked;
        inventoryChanged = true;
        if (!checked) {
          outOfStockIds.push(productId);
        }
      }
    });

    // 3. Save, sync, and re-render
    if (inventoryChanged) {
      saveInventory();
      
      // Auto remove items from cart if the owner toggled them to Out of Stock
      if (outOfStockIds.length > 0) {
        cart = cart.filter(item => !outOfStockIds.includes(item.id));
        saveCart();
      }

      // Sync existing cart items' pricing with new changes
      let cartUpdated = false;
      cart = cart.map(item => {
        const invProduct = inventory.find(p => p.id === item.id);
        if (invProduct && invProduct.price !== item.price) {
          item.price = invProduct.price;
          item.originalPrice = invProduct.originalPrice;
          cartUpdated = true;
        }
        return item;
      });

      if (cartUpdated) {
        saveCart();
      }

      updateCartUI();
      renderProducts();
    }

    closeAdminDashboard();
    alert(TRANSLATIONS[currentLanguage].alert_save_success);
  }

  // --- CHECKOUT FORM SUBMISSION (WHATSAPP REDIRECTION) ---
  function submitOrder(e) {
    e.preventDefault();

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const handoverType = document.querySelector('input[name="delivery-type"]:checked').value;
    const address = document.getElementById("customer-address").value.trim();
    const payment = document.querySelector('input[name="payment-method"]:checked').value;
    const notes = document.getElementById("order-notes").value.trim();

    // 1. Calculations
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalOriginal = cart.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
    const savings = totalOriginal - subtotal;
    
    let deliveryCharge = 0;
    if (subtotal > 0) {
      deliveryCharge = subtotal >= 299 ? 0 : 39;
    }
    const finalBillAmount = subtotal + deliveryCharge;

    // 2. Format Items String
    let itemsListStr = "";
    cart.forEach((item, index) => {
      const itemSub = item.price * item.quantity;
      const itemName = item.name_hi && currentLanguage === "hi" ? item.name_hi : item.name;
      const itemUnit = item.unit_hi && currentLanguage === "hi" ? item.unit_hi : item.unit;

      itemsListStr += `${index + 1}. *${itemName}* (${itemUnit})\n   Qty: *${item.quantity}*  x  ₹${item.price}  =  *₹${itemSub}*\n`;
    });

    // 3. Format Date/Time
    const now = new Date();
    const dateTimeStr = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 4. Build WhatsApp Message Template (Localized based on current language!)
    let message = "";
    if (currentLanguage === "hi") {
      message = `🛒 *अपना बाज़ार - नया ऑर्डर* 🛒\n`;
      message += `📅 तिथि: ${dateTimeStr}\n`;
      message += `-----------------------------------------------\n\n`;
      
      message += `👤 *ग्राहक का विवरण*\n`;
      message += `नाम: *${name}*\n`;
      message += `फ़ोन: *+91 ${phone}*\n`;
      message += `ऑर्डर प्रकार: *${handoverType === "home" ? "घर पर डिलीवरी 🚚" : "दुकान से उठाना (Self Pickup) 🏪"}*\n`;
      
      if (handoverType === "home") {
        message += `📍 पता: *${address}*\n`;
      }
      message += `\n-----------------------------------------------\n\n`;

      message += `🛍️ *ऑर्डर किए गए सामान*\n`;
      message += itemsListStr;
      message += `\n-----------------------------------------------\n\n`;

      message += `💳 *बिल का विवरण*\n`;
      message += `कुल मूल्य: *₹${subtotal}*\n`;
      if (savings > 0) {
        message += `कुल बचत: *-₹${savings}* 🎉\n`;
      }
      message += `डिलीवरी शुल्क: *${deliveryFee === 0 ? "मुफ्त (FREE)" : "₹" + deliveryCharge}*\n`;
      message += `कुल देय राशि: *₹${finalBillAmount}*\n\n`;
      
      message += `💵 *भुगतान का प्रकार*: *${payment === "cod" ? "डिलीवरी पर नकद (COD)" : "डिलीवरी पर यूपीआई (UPI)"}*\n`;
      
      if (notes) {
        message += `📝 *विशेष निर्देश*: _"${notes}"_\n`;
      }

      message += `\n-----------------------------------------------\n`;
      message += `🙏 *खरीदारी के लिए धन्यवाद!*`;
    } else {
      message = `🛒 *NEW ORDER FROM APNA BAZAR* 🛒\n`;
      message += `📅 Date: ${dateTimeStr}\n`;
      message += `-----------------------------------------------\n\n`;
      
      message += `👤 *CUSTOMER DETAILS*\n`;
      message += `Name: *${name}*\n`;
      message += `Contact: *+91 ${phone}*\n`;
      message += `Handover: *${handoverType === "home" ? "Home Delivery 🚚" : "Self Pickup 🏪"}*\n`;
      
      if (handoverType === "home") {
        message += `📍 Address: *${address}*\n`;
      }
      message += `\n-----------------------------------------------\n\n`;

      message += `🛍️ *ORDERED ITEMS*\n`;
      message += itemsListStr;
      message += `\n-----------------------------------------------\n\n`;

      message += `💳 *BILLING SUMMARY*\n`;
      message += `Items Subtotal: *₹${subtotal}*\n`;
      if (savings > 0) {
        message += `Discount Saved: *-₹${savings}* 🎉\n`;
      }
      message += `Delivery Charges: *${deliveryCharge === 0 ? "FREE" : "₹" + deliveryCharge}*\n`;
      message += `Grand Total: *₹${finalBillAmount}*\n\n`;
      
      message += `💵 *PAYMENT METHOD*: *${payment === "cod" ? "Cash on Delivery" : "Pay via UPI on Delivery"}*\n`;
      
      if (notes) {
        message += `📝 *INSTRUCTIONS*: _"${notes}"_\n`;
      }

      message += `\n-----------------------------------------------\n`;
      message += `🙏 *Thank you for shopping with Apna Bazar!*`;
    }

    // 5. Generate API URL & Redirect
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${STORE_PHONE}&text=${encodedMessage}`;

    // 6. Action: Open link
    window.open(whatsappUrl, "_blank");

    // 7. Clear cart state & cleanup
    cart = [];
    saveCart();
    updateCartUI();
    renderProducts();
    closeCheckout();
    
    // Show user feedback alert
    alert(TRANSLATIONS[currentLanguage].alert_checkout_success_prefix + name + TRANSLATIONS[currentLanguage].alert_checkout_success_suffix);
  }

  // --- HELPER FUNCTIONS ---
  function getCategoryLabel(categoryId) {
    if (currentLanguage === "hi") {
      const labelsHi = {
        "fruits-veg": "फल और सब्ज़ियाँ",
        "dairy": "डेयरी और बेकरी",
        "staples": "आटा, चावल और दालें",
        "snacks": "स्नैक्स और मिठाइयाँ",
        "beverages": "पेय पदार्थ",
        "household": "घर की ज़रूरतें"
      };
      return labelsHi[categoryId] || categoryId;
    }

    const labels = {
      "fruits-veg": "Fruits & Veggies",
      "dairy": "Dairy & Bakery",
      "staples": "Atta, Rice & Dals",
      "snacks": "Snacks & Sweets",
      "beverages": "Beverages",
      "household": "Household Care"
    };
    return labels[categoryId] || categoryId;
  }

  // Start the Application
  init();
});
