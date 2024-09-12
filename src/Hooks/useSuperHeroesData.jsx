import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { request } from "../utls/utls_axios";

const fetchSuperHeroes = () => {
  // Method one
  return axios.get("http://localhost:3000/superheroes");

  // Method two
  // return request({ url: "/superheroes", method: "get" });
};

const addSuperHero = (hero) => {
  // Method one
  return axios.post("http://localhost:3000/superheroes", hero);

  // Method two
  // return request({ url: "/superheroes", method: "post", data: hero });
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSuperHero,
    onSuccess: (data) => {
      // الطريقه الاولي لتحديث البيانات المعروضه امام المستخدم بعد تجددها
      // queryClient.invalidateQueries("super-heroes");

      // الطريقه الثانيه لتحديث البيانات المعروضه امام المستخدم بعد تجددها الفرق بينهم هي تقليل عدد الريكوستات للسيرفر
      queryClient.setQueryData(["super-heroes"], (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
  });
};
