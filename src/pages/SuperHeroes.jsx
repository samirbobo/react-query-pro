import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

export default function SuperHeroes() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    staleTime: 10000,
    refetchOnMount: true,
    // refetchOnWindowFocus: "true",
  });

  if (isPending) {
    return <h2>Loading...</h2>;
  }


  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes</h2>
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  )
}
