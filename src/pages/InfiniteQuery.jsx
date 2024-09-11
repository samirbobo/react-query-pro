import { Button } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchInfiniteColor = ({ pageParam }) => {
  return axios.get(
    `http://localhost:3000/colors?_page=${pageParam}&_per_page=2`
  );
};

export default function InfiniteQuery() {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["infinite-colors"],
    queryFn: fetchInfiniteColor,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return null; // No more pages
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
    <>
      <h2>Infinite Query Page</h2>
      <div>
        {data.pages.map((groups, i) => (
          <Fragment key={i}>
            {groups.data.data.map((color) => (
              <div key={color.id}>
                <h4>
                  {color.id}- {color.label}
                </h4>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </Button>
    </>
  );
}
