import burger from "@/assets/p-burger.jpg";
import pasta from "@/assets/p-pasta.jpg";
import salad from "@/assets/p-salad.jpg";
import pizza from "@/assets/p-pizza.jpg";
import bruschetta from "@/assets/p-bruschetta.jpg";
import tiramisu from "@/assets/p-tiramisu.jpg";
import lemonade from "@/assets/p-lemonade.jpg";
import wine from "@/assets/p-wine.jpg";

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  /** price in cents (BRL) */
  price: number;
  image: string;
  categoryId: string;
};

export const store = {
  name: "Cantina Verde",
  tagline: "Cozinha italiana feita com ingredientes frescos do dia.",
  rating: 4.8,
  reviews: 1240,
  deliveryTime: "30–45 min",
  deliveryFee: 699, // R$ 6,99
};

export const categories: Category[] = [
  { id: "all", name: "Tudo" },
  { id: "starters", name: "Entradas" },
  { id: "mains", name: "Pratos principais" },
  { id: "desserts", name: "Sobremesas" },
  { id: "drinks", name: "Bebidas" },
];

export const products: Product[] = [
  {
    id: "bruschetta",
    name: "Bruschetta al pomodoro",
    description: "Pão rústico tostado com tomate fresco, manjericão e azeite extravirgem.",
    price: 2490,
    image: bruschetta,
    categoryId: "starters",
  },
  {
    id: "salad",
    name: "Salada Caesar com frango",
    description: "Alface romana, frango grelhado, croutons e molho caesar artesanal.",
    price: 3690,
    image: salad,
    categoryId: "starters",
  },
  {
    id: "pasta",
    name: "Spaghetti al pesto",
    description: "Massa fresca italiana ao molho pesto de manjericão e parmesão.",
    price: 4290,
    image: pasta,
    categoryId: "mains",
  },
  {
    id: "pizza",
    name: "Pizza Margherita",
    description: "Massa fermentada 48h, molho de tomate San Marzano, mussarela de búfala e manjericão.",
    price: 5490,
    image: pizza,
    categoryId: "mains",
  },
  {
    id: "burger",
    name: "Burger da casa",
    description: "Blend bovino 180g, queijo cheddar, brioche tostado e molho especial.",
    price: 3890,
    image: burger,
    categoryId: "mains",
  },
  {
    id: "tiramisu",
    name: "Tiramisù clássico",
    description: "Camadas de mascarpone, café espresso e cacau em pó.",
    price: 1990,
    image: tiramisu,
    categoryId: "desserts",
  },
  {
    id: "lemonade",
    name: "Limonada suíça com hortelã",
    description: "Limão siciliano gelado com toque de hortelã fresca.",
    price: 1290,
    image: lemonade,
    categoryId: "drinks",
  },
  {
    id: "wine",
    name: "Taça de vinho tinto",
    description: "Seleção da casa, ideal para acompanhar massas e carnes.",
    price: 2890,
    image: wine,
    categoryId: "drinks",
  },
];
