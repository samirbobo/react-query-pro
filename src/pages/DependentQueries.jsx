import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:3000/users/${email}`);
};

const fetchCoursesByChannel = (channelId) => {
  return axios.get(`http://localhost:3000/channels/${channelId}`);
};

// eslint-disable-next-line react/prop-types
export default function DependentQueries({ email }) {
  const { data: user } = useQuery({
    queryKey: ["user", email],
    queryFn: () => fetchUserByEmail(email),
  });

  const channelId = user?.data.channelId;

  const { data: channel } = useQuery({
    queryKey: ["channel", channelId],
    queryFn: () => fetchCoursesByChannel(channelId),
    enabled: !!channelId, // التركايه كلها هنا الامر دا بيوقف الطلب دا لحد ما يكون فيه قيمه لي
    // ال اي ديه بتاع القناه وساعتها بتشتغل الطلب دا تلقائي للسيرفر 
  });

  return (
    <>
      <h2>DependentQueries</h2>
      <div>
        {channel?.data.courses.map((course) => {
          return <p key={course}>{course}</p>;
        })}
      </div>
    </>
  );
}
