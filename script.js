const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_PRODUCTS_URL = `${BASE_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
  fetch(url).then((responce) => {
    responce.json().then((data) => {
      callback(data);
    });
  });
}

window.onload = () => {
  const app = new Vue({
    el: "#root",
    data: {
      products: [
        {
          product_name: "нет данных",
        },
      ],
      searchValue: "",
      isVisibleCart: false,
    },
    mounted() {
      service(GET_PRODUCTS_URL, (products) => {
        this.products = products;
      });
    },
    methods: {
      getTitle() {
        return "eShop";
      },
      setBasketVisibility() {
        this.isVisibleCart = !this.isVisibleCart;
      },
    },
    computed: {
      calculatePrice() {
        return this.products.reduce((a, { price }) => {
          return a + price;
        }, 0);
      },
      filteredProducts() {
        return this.products.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.searchValue, "gui"));
        });
      },
    },
  });
};
