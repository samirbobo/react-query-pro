import { useSuperHeroesData } from "../Hooks/useSuperHeroesData";

export default function SuperHeroes() {
  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData(); // عملت هوك من الصفر عشان لو حبيت اكرره في صفحات تانيه معيدش كتابه نفس الاكواد ودي افضل طريقه

    // useQuery({
    //   queryKey: ["super-heroes"],
    //   queryFn: fetchSuperHeroes,
    //   // staleTime: 10000,
    //   // refetchOnMount: true,
    //   // refetchOnWindowFocus: "true",
    //   // refetchInterval: 2000,
    //   // refetchIntervalInBackground: true,
    //   // enabled: false,
    //   select: (data) => {
    //     const HeroNames = data.data.map(hero => hero.name);
    //     return HeroNames;
    //   }, 
    // });

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes</h2>
      <button onClick={refetch}>Fetch Data</button>
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}
      {data.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })}
    </>
  );
}
