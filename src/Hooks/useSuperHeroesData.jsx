import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:3000/superheroes", hero);
};

export const useSuperHeroesData = () => {
  return useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // select: (data) => {
    //   const HeroNames = data.data.map((hero) => hero.name);
    //   return HeroNames;
    // },
  });
};

export const useAddSuperHeroData = () => {
  return useMutation({
    mutationFn: addSuperHero,
  });
};
