const gallery1 = "/gallery-1.jpg";
const gallery2 = "/gallery-2.jpg";
const gallery3 = "/gallery-3.jpg";
const gallery4 = "/gallery-4.jpg";

export const CONTACT_INFO = {
  address: "Ворошилова 30А, Магнитогорск",
  mapLink: "https://yandex.com/maps/org/shokolad/72528152002/?ll=58.981037%2C53.361071&z=17",
  vkLink: "https://vk.com/chocolate55_mgn",
  galleryLink: "https://vk.com/albums-77990339",
  phone: "+7 (902) 862-16-63",
};

export const IMAGES = {
  promo: gallery4,
  gallery: [gallery1, gallery2, gallery3],
  fallbacks: {
    promo:
      "https://images.unsplash.com/photo-1561501900-3701fa6a0f64?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467453278283-d1b7028ebaf5?q=80&w=800&auto=format&fit=crop",
    ],
  },
};

export const FEATURES = [
  {
    title: "Вкусная кухня",
    description: "Традиционные русские блюда и самые необычные — из семейных поваренных книг.",
    icon: "Utensils",
  },
  {
    title: "Отличный интерьер",
    description: "Уютный банкетный зал с очень душевной атмосферой для ваших памятных событий.",
    icon: "Home",
  },
  {
    title: "Оформление в подарок",
    description: "Стильное оформление зала для подписчиков нашей группы ВК — в подарок!",
    icon: "Gift",
  },
  {
    title: "Эффектные фото-зоны",
    description: "Продуманные локации для создания самых красивых и запоминающихся снимков.",
    icon: "Camera",
  },
  {
    title: "Гуманные цены",
    description:
      "Проведите лучший день вашей жизни без лишних затрат при неизменно высоком качестве.",
    icon: "CreditCard",
  },
  {
    title: "Блюда с собой",
    description: "Любое блюдо из нашего меню вы можете заказать с собой.",
    icon: "ShoppingBag",
  },
];
