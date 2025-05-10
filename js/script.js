 $(document).ready(function () {
            const products = [
                { id: 1, name: "White T-Shirt", price: 550, image: "images/t-shirt.jpg" },
                { id: 2, name: "Black T-Shirt", price: 600, image: "images/t-shirt2.jpg" },
                { id: 3, name: "Blue T-Shirt", price: 700, image: "images/t-shirt3.jpg" },
                { id: 4, name: "Pink T-Shirt", price: 650, image: "images/t-shirt4.jpg" },
                { id: 5, name: "Red T-Shirt", price: 620, image: "images/t-shirt5.jpg" },
                { id: 6, name: "Yellow T-Shirt", price: 580, image: "images/t-shirt6.jpg" },
            ];

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            function updateCartCount() {
                $('#cart-count').text(cart.length);
                localStorage.setItem('cart', JSON.stringify(cart));
            }

            function renderCartSidebar() {
                const cartItemsContainer = $('#cart-items');
                cartItemsContainer.empty();

                if (cart.length === 0) {
                    cartItemsContainer.html('<p>Your cart is empty.</p>');
                    return;
                }

                let total = 0;
                cart.forEach((item, index) => {
                    total += item.price;
                    const itemHTML = `
                        <div class="d-flex justify-content-between align-items-start mb-3 border-bottom pb-2">
                            <div class="d-flex">
                                <img src="${item.image}" alt="${item.name}" class="me-2" style="width: 50px; height: 50px; object-fit: cover;">
                                <div>
                                    <p class="m-0 fw-bold">${item.name}</p>
                                    <p class="m-0">Rs. ${item.price}</p>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">&times;</button>
                        </div>
                    `;
                    cartItemsContainer.append(itemHTML);
                });

                cartItemsContainer.append(`<div class="mt-3 border-top pt-2 text-end"><strong>Total: Rs. ${total}</strong></div>`);
            }

            function renderProducts() {
                const productList = $('#product-list');
                products.forEach(p => {
                    const productHTML = `
                        <div data-name="${p.name}" class="col-md-4 product ">
                    

                            <div class="card h-100">
                               <a href='#'  class="product_a" data-id="${p.id}"> <img src="${p.image}" class="card-img-top" height="250px"  alt="${p.name}">   </a>
                                <div class="card-body">
                                    <h6 class="card-title">${p.name}</h6>
                                    <p class="card-text">Rs. ${p.price}</p>
                                    <button class="btn btn-primary add-to-cart" data-id="${p.id}">Add to cart</button>
                                </div>
                            </div>
                     

                        </div>
                    `;
                    productList.append(productHTML);
                });
            }

            $(document).on('click', '.add-to-cart', function () {
                const id = parseInt($(this).data('id'));
                const product = products.find(p => p.id === id);
                cart.push(product);
                updateCartCount();
                renderCartSidebar();
            });

            $(document).on('click', '.remove-item', function () {
                const index = $(this).data('index');
                cart.splice(index, 1); // Remove item
                updateCartCount();     // Update badge and save to localStorage
                renderCartSidebar();   // Re-render cart sidebar
            });

            $('#open-cart').click(function () {
                $('#cart-sidebar').addClass('active');
                $('#cart-overlay').addClass('active');
            });

            $('#close-cart, #cart-overlay').click(function () {
                $('#cart-sidebar').removeClass('active');
                $('#cart-overlay').removeClass('active');
            });

            renderProducts();
            renderCartSidebar();
        });



 $(document).ready(function(){
  $(".theme_icon").click(function(){
    $(".whiteTheme, a, footer").toggleClass("darkTheme");
    $("body").toggleClass("bodyDarkTheme");

  });
});


$(document).ready(function() {
  $('#search-bar').on('keyup', function() {
    var value = $(this).val().toLowerCase();
    $('#product-list .product').filter(function() {
      $(this).toggle($(this).data('name').toLowerCase().indexOf(value) > -1)
    });
  });
  });

  $(".cartAni").mouseenter(function(){
   $(".fa-cart-shopping").addClass("fa-bounce");

   $(".cartAni").mouseleave(function(){
   $(".fa-cart-shopping").removeClass("fa-bounce");
});
});


$(document).ready(function() {
    $('.product_a').on('click', function() {
        var productId = $(this).data('id'); // Get product ID or value
        var url = 'product.html?id=' + productId; // Construct URL
        window.open(url, '_blank'); // Open in new tab
    });
});
