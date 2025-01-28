import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchSuperHero = ({ queryKey }) => {
  const id = queryKey[1];
  return axios.get(`http://localhost:3000/superheroes/${id}`);
};

export default function SuperHero() {
  const { heroId } = useParams();
  const client = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["super-heroes", heroId],
    queryFn: fetchSuperHero,
    // استخدامت الفانكشن ديه عشان اجيب بيانات اوليه من البيانات المتخزنه عندي في الكاش ودا بيحسن من جوده الموقع
    initialData: () => {
      const hero = client
        .getQueryData(["super-heroes"])
        ?.data?.find((hero) => hero.id === heroId);

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      Super Hero Details - {heroId}
      <h4>
        {data.data.name} - {data.data.alterEgo}
      </h4>
    </div>
  );
}
