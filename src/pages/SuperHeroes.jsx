import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

export default function SuperHeroes() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
    // الشرح كله في صفحه الوثائق انا سايب دول هنا بس لمجرد فهم كيفيه كتابتهم

    // gcTime: 1000 * 60, // عدلت وقت حفظ البيانات لدقيقه بدل 5 دقائق
    // staleTime: 1000 * 60, // كده البيانات الي هترجع من السيرفر هتفضل جديده لمده دقيقه ومش هيعمل ريكوست تاني للسيرفر خلال المده ديه حته لو دخلت وخرجت من الصفحه ميت مره
    // refetchOnMount: true, // ديه افضل واضمن حاله ودا الوضع الافتراضي بتاعها اصلا
    // refetchOnWindowFocus: true, // لو استخدمتها بتعمل تحديث للصفحه بشكل لحظي عند تحديث البيانات
    // refetchInterval: 5000, بيجيب البيانات بشكل دوري كل خمس ثواني
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
  );
}
