// Apna Bazar E-commerce JavaScript Application Logic

document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURATION ---
  const STORE_PHONE = "919214556654"; // Pre-filled store owner number (with country code, no +)

  // --- STATE ---
  let cart = [];
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

  // --- INITIALIZATION ---
  function init() {
    loadCart();
    renderProducts();
    updateCartUI();
    setupEventListeners();
    lucide.createIcons();
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
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
      if (e.target === checkoutModal) closeCheckout;
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
  }

  // --- CATALOG RENDERING ---
  function renderProducts() {
    productsGrid.innerHTML = "";

    // 1. Filter
    let filtered = PRODUCTS.filter(p => {
      const matchesCategory = (currentCategory === "all" || p.category === currentCategory);
      const matchesSearch = (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             p.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Update count labels
    if (searchQuery) {
      resultsCountText.textContent = `Found ${filtered.length} items for "${searchQuery}"`;
    } else {
      resultsCountText.textContent = `${filtered.length} products available`;
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
      
      // Determine what to render for the cart controls
      let cartControlsHTML = "";
      if (cartItem) {
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
            Add <i data-lucide="plus"></i>
          </button>
        `;
      }

      card.innerHTML = `
        <div class="product-card-top" data-id="${product.id}">
          ${product.price < product.originalPrice ? `<span class="product-badge">${discountPercentage}% OFF</span>` : ""}
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-card-body">
          <span class="product-card-category">${getCategoryLabel(product.category)}</span>
          <h4 class="product-card-title" data-id="${product.id}">${product.name}</h4>
          <span class="product-card-unit">${product.unit}</span>
          
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

      // Set events on cart buttons
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

      productsGrid.appendChild(card);
    });

    lucide.createIcons();
  }

  // --- CART STATE ACTIONS ---
  function addToCart(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        unit: product.unit,
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
    
    // Delivery fees calculation: Free above ₹299, else ₹30 (subtotal 0 means ₹0)
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
        cartItemEl.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-weight">${item.unit}</p>
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
              <i data-lucide="trash-2"></i> Remove
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
        deliveryProgressText.innerHTML = "🎉 You unlocked <strong>FREE Delivery</strong>!";
        deliveryProgressFill.style.backgroundColor = "var(--primary)";
      } else {
        const remaining = 299 - subtotal;
        const percent = Math.min((subtotal / 299) * 100, 100);
        deliveryProgressFill.style.width = `${percent}%`;
        deliveryProgressText.innerHTML = `Add <strong>₹${remaining}</strong> more for Free Delivery`;
        deliveryProgressFill.style.backgroundColor = "var(--secondary)";
      }
    }

    // 5. Update Checkout summary panel values (for checkout modal)
    checkoutSummaryItems.textContent = `${totalItemsCount} Item${totalItemsCount > 1 ? "s" : ""}`;
    checkoutSummaryTotal.textContent = `₹${totalPayable}`;

    lucide.createIcons();
  }

  // --- LOCAL STORAGE HELPERS ---
  function saveCart() {
    localStorage.setItem("apnabazar_cart", JSON.stringify(cart));
  }

  function loadCart() {
    const saved = localStorage.getItem("apnabazar_cart");
    if (saved) {
      try {
        cart = JSON.parse(saved);
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
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    activeModalProduct = product;
    const cartItem = cart.find(item => item.id === product.id);

    // Populate Fields
    modalProductImage.src = product.image;
    modalProductImage.alt = product.name;
    
    // Tag badge
    if (product.tag) {
      modalProductTag.textContent = product.tag;
      modalProductTag.style.display = "inline-block";
    } else {
      modalProductTag.style.display = "none";
    }

    modalProductCategory.textContent = getCategoryLabel(product.category);
    modalProductName.textContent = product.name;
    modalProductUnit.textContent = product.unit;
    modalProductRatingNum.textContent = product.rating;
    
    // Pricing
    modalProductPrice.textContent = `₹${product.price}`;
    if (product.price < product.originalPrice) {
      modalProductOriginalPrice.textContent = `₹${product.originalPrice}`;
      modalProductOriginalPrice.style.display = "inline-block";
      const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
      modalProductDiscountPercentage.textContent = `${discountPercentage}% OFF`;
      modalProductDiscountPercentage.style.display = "inline-block";
    } else {
      modalProductOriginalPrice.style.display = "none";
      modalProductDiscountPercentage.style.display = "none";
    }

    modalProductDescription.textContent = product.description;
    
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

    // Modal Events reset
    // Remove old events by cloning buttons
    const newDec = modalDecQtyBtn.cloneNode(true);
    const newInc = modalIncQtyBtn.cloneNode(true);
    const newAdd = modalAddToCartBtn.cloneNode(true);

    modalDecQtyBtn.parentNode.replaceChild(newDec, modalDecQtyBtn);
    modalIncQtyBtn.parentNode.replaceChild(newInc, modalIncQtyBtn);
    modalAddToCartBtn.parentNode.replaceChild(newAdd, modalAddToCartBtn);

    // Re-bind fresh events
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
        // Already in cart, do a confirmation animation
        openCart();
        closeProductModal();
      } else {
        addToCart(product.id, qty);
        openCart();
        closeProductModal();
      }
    });

    // Open Modal Layout
    productDetailModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  }

  function closeProductModal() {
    productDetailModal.style.display = "none";
    activeModalProduct = null;
    if (!cartDrawer.classList.contains("active")) {
      document.body.style.overflow = ""; // Restore scrolling only if cart drawer is not open
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

  function closeCheckout() {
    checkoutModal.style.display = "none";
    document.body.style.overflow = "";
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
      itemsListStr += `${index + 1}. *${item.name}* (${item.unit})\n   Qty: *${item.quantity}*  x  ₹${item.price}  =  *₹${itemSub}*\n`;
    });

    // 3. Format Date/Time
    const now = new Date();
    const dateTimeStr = now.toLocaleDateString() + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 4. Build WhatsApp Message Template
    let message = `🛒 *NEW ORDER FROM APNA BAZAR* 🛒\n`;
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
    alert(`Thank you ${name}! Your order details have been prepared. You will be redirected to WhatsApp to complete sending the order to the store owner.`);
  }

  // --- HELPER FUNCTIONS ---
  function getCategoryLabel(categoryId) {
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
