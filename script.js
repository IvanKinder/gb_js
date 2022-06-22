const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_PRODUCTS_URL = `${BASE_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASE_URL}/getBasket.json`;

window.onload = () => {
  Vue.component("good", {
    props: ["item"],
    template: `
    <div class="basket-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
    </div>
    `,
  });

  Vue.component("search-field", {
    props: ["searchValue"],
    template: `
    <input
      class="search-field"
      type="text"
      placeholder="search product"
      :value="searchValue"
      @input="$emit('input', $event.target.value)"
    />
    `,
  });

  Vue.component("basket", {
    props: ["items"],
    template: `
    <div class="basket">
      <div class="basket-list">
        <good v-for="item in items" :item="item"></good>
      </div>
    </div>
    `,
  });

  Vue.component("err-msg", {
    template: `
    <transition name="err">
      <div class="err-msg">
        connection error
      </div>
    </transition>
    `,
  });

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
      serverError: false,
    },
    mounted() {
      this.service(GET_PRODUCTS_URL, (products) => {
        this.products = products;
      });
    },
    methods: {
      service(url, callback) {
        fetch(url)
          .then((responce) => {
            responce.json().then((data) => {
              callback(data);
            });
          })
          .catch(() => {
            this.serverError = true;
            setTimeout(() => (this.serverError = false), 3000);
          });
      },
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
