import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ParallelQueries() {
  const fetchSuperHeroes = () => {
    return axios.get("http://localhost:3000/superheroes");
  };
  const fetchFriends = () => {
    return axios.get("http://localhost:3000/friends");
  };

  // بقدر اني اعمل استدعاء للبيانات بشكل متوازي الاتنين في نفس الوقت عادي

  const { data: heroes } = useQuery({
    queryKey: ["Super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  const { data: friends } = useQuery({
    queryKey: ["Super-friends"],
    queryFn: fetchFriends,
  });

  console.log(heroes, friends);

  return <div>Parallel Queries</div>;
}
