import { useQueries } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:3000/superheroes/${heroId}`);
};

// eslint-disable-next-line react/prop-types
export default function DynamicParallelQueries({ heroIds }) {
  const queryResults = useQueries({
    // eslint-disable-next-line react/prop-types
    queries: heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    }),
  });

  console.log({ queryResults });
  return <h2>DynamicParallelQueries</h2>;
}
