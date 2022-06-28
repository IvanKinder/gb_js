import express from "express";
import cors from "cors";
import { writeFile, readFile } from "fs/promises";

const BASKET_URL = "./static/basket_goods.json";
const GOODS_URL = "./static/goods.json";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const readBasket = () =>
  readFile(BASKET_URL, "utf-8").then((basketFile) => {
    return JSON.parse(basketFile);
  });

const readGoods = () =>
  readFile(GOODS_URL, "utf-8").then((goodsFile) => {
    return JSON.parse(goodsFile);
  });

app.get("/basket", (req, res) => {
  Promise.all([readBasket(), readGoods()])
    .then(([basketList, goodsList]) => {
      return basketList.map((basketItem) => {
        const goodsItem = goodsList.find(({ id_product: _goodsId }) => {
          return _goodsId === basketItem.id_product;
        });
        return {
          ...basketItem,
          ...goodsItem,
        };
      });
    })
    .then((result) => {
      res.send(JSON.stringify(result));
    });
});

app.listen("3000", () => {
  console.log("Server started!");
});
