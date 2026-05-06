import { createFileRoute } from "@tanstack/react-router";
import ChocoladeLanding from "@/components/ChocoladeLanding";

export const Route = createFileRoute("/")({
  component: ChocoladeLanding,
  head: () => ({
    meta: [
      {
        title: "Банкетный зал «Шоколад» — Магнитогорск",
      },
      {
        name: "description",
        content:
          "Уютный банкетный зал «Шоколад» в Магнитогорске. Душевная атмосфера, домашняя кухня, оформление зала в подарок.",
      },
      { property: "og:title", content: "Банкетный зал «Шоколад» — Магнитогорск" },
      {
        property: "og:description",
        content:
          "Организация торжеств в Магнитогорске. Душевная атмосфера, вкусная кухня, оформление в подарок.",
      },
    ],
  }),
});
