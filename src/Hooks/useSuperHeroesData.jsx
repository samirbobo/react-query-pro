import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    select: (data) => {
      const HeroNames = data.data.map((hero) => hero.name);
      return HeroNames;
    },
  });
}