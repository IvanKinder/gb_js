const goods = [
  { title: "Shirt", price: 150 },
  { title: "Socks", price: 50 },
  { title: "Jacket", price: 350 },
  { title: "Shoes", price: 250 },
];

class GoodsItem {
  constructor({ title = "item", price = 0 }) {
    this.title = title;
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

class GoodsList {
  fetchData(list = []) {
    this.list = list;
  }

  render() {
    document.querySelector(".goods-list").innerHTML = this.list
      .map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      })
      .toString()
      .replace(/,/g, "");
  }
}

const goodsList = new GoodsList();
goodsList.fetchData(goods);
goodsList.render();

/**
 * Задание с гамбургером, проверить - кнопка на странице 'Buy Hamburger'
 */

class Hamburger {
  constructor(size = "small") {
    this.size = size;
    this.stuffings = [];
    this.toppings = [];
    this.menu = {
      small: {
        price: 50,
        ccal: 20,
      },
      big: {
        price: 100,
        ccal: 40,
      },
      cheese: {
        price: 10,
        ccal: 20,
      },
      salad: {
        price: 20,
        ccal: 5,
      },
      potato: {
        price: 15,
        ccal: 10,
      },
      spice: {
        price: 15,
        ccal: 0,
      },
      mayonnaise: {
        price: 20,
        ccal: 5,
      },
    };
  }
  addStuffing(stuffing = "cheese") {
    const codes = ["cheese", "salad", "potato"];
    this.stuffings.push(this.menu[codes[stuffing]]);
  }
  removeStuffing(stuffing = "cheese") {
    this.stuffings.remove(this.menu[stuffing]);
  }
  getStuffings() {
    return this.stuffings;
  }
  addTopping(topping = "mayonnaise") {
    const codes = ["spice", "mayonnaise"];
    this.toppings.push(this.menu[codes[topping]]);
  }
  removeTopping(topping = "mayonnaise") {
    this.toppings.remove(this.menu[topping]);
  }
  getToppings() {
    return this.toppings;
  }
  getSize() {
    return this.size;
  }
  calculatePrice() {
    return (
      this.menu[this.size].price +
      this.stuffings.reduce((partialSum, a) => partialSum + a.price, 0) +
      this.toppings.reduce((partialSum, a) => partialSum + a.price, 0)
    );
  }
  calculateCalories() {
    return (
      this.menu[this.size].ccal +
      this.stuffings.reduce((partialSum, a) => partialSum + a.ccal, 0) +
      this.toppings.reduce((partialSum, a) => partialSum + a.ccal, 0)
    );
  }
}

function createHamburger() {
  const size = prompt(
    "Какого размера вы хотите гамбургер? 0 - маленький (50р, 20ккал); 1 - большой (100р, 40ккал)"
  );
  const stuffing = prompt(
    "Добавить начинку. 0 - сыр (10р, 20ккал), 1 - салат (20р, 5ккал), 2 - картофель (15р, 10ккал)"
  );
  const topping = prompt(
    "Добавить соус. 0 - приправа (15р, 0ккал), 1 - майонез (20р, 5ккал)"
  );
  let hamburger;

  if (size === '0') {
    hamburger = new Hamburger("small");
  } else {
    hamburger = new Hamburger("big");
  }
  hamburger.addStuffing(stuffing);
  hamburger.addTopping(topping);

  alert(hamburger.calculatePrice());
}
