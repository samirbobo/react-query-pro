import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

export default function SuperHeroes() {
  const { isLoading, data, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // الشرح كله في صفحه الوثائق انا سايب دول هنا بس لمجرد فهم كيفيه كتابتهم

    // enabled: false, // لمنع جلب البيانات بشكل مباشر عند تحميل الصفحه او الكمبونانت
    select: (data) => {
      const superHeroNames = data.data.map((hero) => hero.name);
      return superHeroNames;
    }, // استخدمتها لعاده هيكله شكل البيانات الي رجعلي بحيث انه يرجع الاسم بس لان بقيت البيانات مش في حاجه ليها
  });

  if (isLoading || isRefetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes</h2>

      <button onClick={refetch} style={{ margin: "1rem 0", cursor: "pointer" }}>
        fetch Data
      </button>

      {/* شكل البيانات قبل اعاده الهيكله */}
      {/* {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })} */}

      {/* شكل البيانات بعد اعاده الهيكله */}
      {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })}
    </>
  );
}
