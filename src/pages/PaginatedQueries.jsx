import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const fetchColors = (pageNumber) => {
  return axios.get(
    `http://localhost:3000/colors?_page=${pageNumber}&_per_page=2`
  );
};

export default function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["colors", pageNumber],
    queryFn: () => fetchColors(pageNumber),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>Paginated Page</h2>
      <div>
        {data.data.data.map((color) => {
          return (
            <div key={color.id}>
              <h3>
                {color.id}- {color.label}
              </h3>
            </div>
          );
        })}
      </div>
      <Stack direction={"row"} gap={1} my={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPageNumber((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Pervious Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPageNumber((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </Button>
      </Stack>
      {isFetching && "Loading..."}
    </>
  );
}
