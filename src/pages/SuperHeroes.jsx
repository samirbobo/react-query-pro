import { Link } from "react-router-dom";
import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../Hooks/useSuperHeroesData";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";

export default function SuperHeroes() {
  const [name, setName] = useState(null);
  const [alterEgo, setAlterEgo] = useState(null);
  const [open, setOpen] = useState(false);

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

  const {
    mutate: addHero,
    isError: isAddError,
    isPending,
    isSuccess,
  } = useAddSuperHeroData();

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    addHero(hero);
    setAlterEgo(null);
    setName(null);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(true);
    }
  }, [isSuccess]);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  if (isAddError) {
    return <h2>{isAddError.message}</h2>;
  }

  return (
    <>
      <h2>Super Heroes</h2>

      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          The hero added successfully.
        </Alert>
      </Snackbar>

      <Box my={2}>
        <TextField
          sx={{ mr: 2 }}
          name="name-hero"
          onChange={(e) => setName(e.target.value)}
          label="Name"
          variant="outlined"
        />
        <TextField
          name="alterEgo-hero"
          onChange={(e) => setAlterEgo(e.target.value)}
          label="AlterEgo"
          variant="outlined"
        />
      </Box>

      <Stack direction={"row"} gap={2} mb={2}>
        <Button
          disabled={!name ? true : !alterEgo && true}
          variant="contained"
          color="primary"
          onClick={handleAddHero}
        >
          Add Hero
        </Button>

        <Button variant="contained" color="primary" onClick={refetch}>
          Fetch Data
        </Button>
      </Stack>

      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={hero.id}>{hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })} */}
    </>
  );
}
