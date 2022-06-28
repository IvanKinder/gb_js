const BASE_URL = "http://localhost:3000/";
const GET_PRODUCTS_URL = `${BASE_URL}goods.json`;
const GET_BASKET_URL = `${BASE_URL}basket`;

window.onload = () => {
  function service(url, callback) {
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
  }

  Vue.component("good", {
    props: ["item"],
    template: `
    <div class="basket-item">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <div>
        <button>Добавить</button>
        <button>Удалить</button>
      </div>
    </div>
    `,
  });

  Vue.component("basket-good", {
    props: ["item"],
    template: `
    <div class="basket-item">
      <h3>{{ item.product_name }}</h3>
      <p>Цена: {{ item.price }}</p>
      <p>Количество: {{ item.count }}</p>
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
    data() {
      return {
        basketItems: [],
      };
    },
    template: `
    <div class="basket">
      <div class="basket-list">
        <basket-good v-for="item in basketItems" :item="item"></basket-good>
      </div>
    </div>
    `,
    mounted() {
      service(GET_BASKET_URL, (baskenList) => {
        this.basketItems = baskenList;
      });
    },
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
