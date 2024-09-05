import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../Hooks/useSuperHeroData";

export default function SuperHero() {
  const { heroId } = useParams();
  const { isLoading, isError, data, error } = useSuperHeroData(heroId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      Super Hero Details
      <h4>
        {data.data.name} - {data.data.alterEgo}
      </h4>
    </div>
  );
}
