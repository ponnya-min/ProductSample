const productData = [
  {
    image: "img/product1.jpg",
    text: "Elegant Saree with Floral Pattern"
  },
  {
    image: "img/product2.jpg",
    text: "Traditional Silk Saree for Special Occasions"
  },
  {
    image: "img/product3.jpg",
    text: "Lightweight Daily Wear Saree"
  }
];

let currentIndex = 0;

function showNextProduct() {
  const productImage = document.getElementById("product-image");
  const productText = document.getElementById("product-text");

  productImage.src = productData[currentIndex].image;
  productText.textContent = productData[currentIndex].text;

  currentIndex = (currentIndex + 1) % productData.length;
}

// Start cycling every 2 seconds
setInterval(showNextProduct, 2000);
