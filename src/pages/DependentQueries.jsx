/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:3000/users/${email}`);
};

const fetchCoursesByChannel = (channelId) => {
  return axios.get(`http://localhost:3000/channels/${channelId}`);
};

const DependentQueries = ({ email }) => {
  // هنا عملت فتش وجيبت كل البيانات المتعلقه بالاميل
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  // لان الكورسات معتمده علي ال ايه ديه بتاع القناه الراجعه من الداتا بتاعت الاميل في بخزنها هنا في متغير عشان ارجع استخدامها
  const channelId = user?.data.channelId;

  // هنا بعمل فتش عشان اجيب الكورسات الموجوده في القناه بوقف الفتش دا لحد ما اجيب ال ايه ديه بتاع القناه من الفتش الاولي
  // لان دا فتش متتابع نتايجه معتمده علي نتائج الفتش الي في الاول
  const {
    data: channel,
    isLoading: channelLoading,
    isError: isChannelError,
    error: channelError,
  } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => fetchCoursesByChannel(channelId),
    enabled: !!channelId, // enabled هي المفتاح المستخدم لحل الفكره البرمجية ديه
  });

  if (isLoading) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>Error: {error.message} </h2>;
  }

  return (
    <>
      <h2>Dependent Queries Page</h2>
      <h3 style={{ margin: "1rem 0" }}>User Email: {user.data.id} </h3>
      <p>User Channel Id: {user.data.channelId}</p>
      <ol style={{ paddingLeft: "2rem", paddingTop: "1rem" }}>
        {
          // بعمل لودانج الاول وبعدها بتاكد هل الكود في مشاكل ولا لا لو مفيش و الوادنج  خلص بعرض البيانات علطول
          channelLoading
            ? "loading"
            : isChannelError
            ? channelError.message
            : channel.data.courses.map((course) => (
                <li key={course}>{course}</li>
              ))
        }
      </ol>
    </>
  );
};

export default DependentQueries;
