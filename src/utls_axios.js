// انا سايب الملف دا بس للتعلم ان ممكن ادمج لينك ثابت في المكتبه بتاعتي واستخدامه في الموقع كله وكمان لو عايز اعمل توكن

import axios from "axios";
// استدعي المكتبه عادي

const client = axios.create({ baseURL: "http://localhost:4000" });
// بستخدم فانكشن من المكتبه ديه وهي كريت عشان ان لينك ثابت واقدر استخدمه مره واحده في الموقع كله بدل ما افضل اكرره

// axios هنا بنشي فانكشن شبه فانكشن
// axios وبضيف فيها نفس الاختيارات الي بتقبلها
// وكمان بضيف اوبشن التوكن في حاله لو الموقع بتاعي محتاجه

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer token`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    // optionally catch errors and add additional logging here
    return error;
  };

  // هنا بنشا بباسي الينك واي بيانات انا عايزها جوه المتغير دا وبطبقها في اكسيوس عادي وفي حاله انها اشتغلت
  // بيرجع البيانات وفي حاله الخطاء بيرجع الايرور عادي
  return client(options).then(onSuccess).catch(onError);
};
