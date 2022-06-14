const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

const BASE_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GET_PRODUCTS_URL = `${BASE_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASE_URL}/getBasket.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  const onLoadHandler = () => {
    callback(JSON.parse(xhr.response));
  };

  xhr.onload = onLoadHandler;
  xhr.send();
}

class GoodsItem {
  constructor({ product_name = "item", price = 0 }) {
    this.title = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
}

class GoodsBasket {
  basketItems = [];

  fetchData(callback) {
    service(GET_BASKET_URL, (products) => {
      this.products = products;
      callback();
    });
  }
}

class GoodsList {
  products = [];

  fetchData(callback) {
    service(GET_PRODUCTS_URL, (products) => {
      this.products = products;
      callback();
    });
  }

  render() {
    document.querySelector(".goods-list").innerHTML = this.products
      .map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      .toString()
      .replace(/,/g, "");
  }
}

const goodsList = new GoodsList();

goodsList.fetchData(() => {
  goodsList.render();
});

const basketList = new GoodsBasket();

basketList.fetchData(() => {
  console.log(basketList.products);
});

const showBasket = () => {
  let basketListStr = [];

  basketList.products.contents.forEach((product) => {
    basketListStr.push(`${product.product_name}: ${product.price}`);
  });

  alert(JSON.stringify(basketListStr));
};
