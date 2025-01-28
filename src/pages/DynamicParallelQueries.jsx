/* eslint-disable react/prop-types */
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:3000/superheroes/${heroId}`);
};

// heroIds: عباره عن ارايه فيها معرفات الابطال عشان اجيبهم بشكل دينامك
export default function DynamicParallelQueries({ heroIds }) {
  const queryResults = useQueries({
    queries: heroIds.map((id) => {
      return {
        queryKey: ["super-heroes", id],
        queryFn: () => fetchSuperHero(id),
      };
    }),
  });

  console.log({ queryResults });
  return <h2>Dynamic Parallel Queries</h2>;
}
