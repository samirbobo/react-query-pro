import { Alert, Box, Button, Snackbar, Stack, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:3000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:3000/superheroes", hero);
};

export default function SuperHeroes() {
  const [name, setName] = useState(null);
  const [alterEgo, setAlterEgo] = useState(null);
  const [open, setOpen] = useState(false);

  const client = useQueryClient();

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["super-heroes"],
    queryFn: fetchSuperHeroes,
  });

  const {
    mutate: addHero,
    isError: isAddError,
    // isSuccess,
  } = useMutation({
    mutationFn: addSuperHero,

    // ديه الطريقه الاولي لتجديد البيانات بعد نجاح اضافه بيانات جديده للسيرفر
    // onSuccess: () => {
    //   // الطريقه الاولي عشان افتح ال اليرت اني استخدمها داخل الفانكشن الخاصه بنجاح بعت البيانان
    //   setOpen(true);
    //   return client.invalidateQueries(["super-heroes"]);
    // },

    // الطريقه الثانيه لتحديث البيانات المعروضه امام المستخدم بعد تجددها الفرق بينهم هي تقليل عدد الريكوستات للسيرفر
    // لان في الطريقه الاولي بي يبعت للسيرفر طلب اضافه وبعدها بي يبعت طلب تاني لجلب البيانات
    // هنا بي يبعت طلب واحد للاضافة علطول ولما بيرجع البيانات الجديده بي يضفها علي البيانات القديمه علطول
    // وبي يجيب البيانات القديمه من الكاش المتخزن عنده
    onSuccess: (data) => { // data ديه البيانات الجديده الي رجعت من الباك
      setOpen(true);
      client.setQueryData(["super-heroes"], (oldData) => { // oldData ديه البيانات القديمه المتخزنه في الكاش
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
  });

  const handleAddHero = () => {
    // بخزن قيم البطل الجديد بتاعتي وبضيفها علي شكل اوبحيكت للفانكشن الي هترفعه علي السيرفر
    const hero = { name, alterEgo };
    setAlterEgo(null);
    setName(null);
    addHero(hero);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // alert after the data success الطريقه الثانيه لفتح
  // useEffect(() => {
  //   if (isSuccess) {
  //     setOpen(true);
  //   }
  // }, [isSuccess]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError || isAddError) {
    return <h2>{error.message}</h2>;
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

      {/* فورم بسيط عشان اضيف بيانات جديده للباك اند */}
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
          <div key={hero.name}>
            {hero.name} <Link to={hero.id}>View</Link>
          </div>
        );
      })}
    </>
  );
}
