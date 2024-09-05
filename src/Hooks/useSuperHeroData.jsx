import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroData = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:3000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery({
    queryKey: ["super-hero", heroId],
    queryFn: fetchSuperHeroData,
  });
};
