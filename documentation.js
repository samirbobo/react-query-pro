/*
  - react Query:  أنها مكتبة جلب البيانات لتطبيقات الويب

  ---- QueryClientProvider: 
  ---- دي كمبونانت لازم نستخدمها ونحط جواها التطبيق بتاعنا عشان نضيف للتطبيقنا خادم لجلب البيانات
  ---- بتقبل جواها بروبس اسمها كلاينت ودي عشان نضيف فيها الكلاينت او الخادم الي هننشائه

  ---- QueryClient: دي هي الفانكشن الي بكتبها عشان انشاء بيها الخادم بتاعي 
  =================================================
  ---- App.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/

/* 
  - useQuery({queryKey: ["name of key"] required, queryFn: function to fetch the data Required}) 
  ---- دي فانكشن جاهزه من المكتبه بتساعدك في جلب البيانت والتحكم بها في كل الحالات حاله التحميل والخطاء و جلب البيانات فعلا
  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليها والفهم اكتر اذهب لصفحه
  =================================================

  - ReactQueryDevtools 
  ---- React Query ستحتاج إلى أدوات التطوير هذه بجانبك. إنها تساعد في تصور جميع الأعمال الداخلية لـ 
  ---- ومن المحتمل أن توفر عليك ساعات من تصحيح الأخطاء إذا وجدت نفسك في مأزق!
  ---- props:
  ------ initialIsOpen: [false default | true]  

  ------ buttonPosition بيعرض مكان الايكون بتاعت التولز 
  ------ ["top-left" | "top-right" | "bottom-left" | "bottom-right" default| "relative"]

  ------ position بتعبر عن المكان الي المفروض الصفحه الي فيها بيانات الارسال بتاعت الطلب هتكون فين
  ------ ["top" | "bottom" default| "left" | "right"]
  =================================================
  ---- App.jsx لمشاهده الامثله عليها والفهم اكتر اذهب لصفحه
  =================================================
*/


/* 
  - gcTime: 
  ----- دي بتمثل مفهوم حفظ البيانات موقتا في مكان تخزين افتراضي والفايده منها انك لما بتجيب البيانات 
  ----- cache time بتعمل علامه تحميل لتحسين من جوده الموقع ومن ثمه بنجيب البيانات ونعرضها في الصفحه وبيتم تلقائي تخزنها في مكان اسمه
  ----- لمده افتراضيه وهي خمس دقائق ومن الممكن التعديل علي المده بتقليلها او زيادتها 
  ----- وطبعا في حاله الخروج من صفحه البيانات والرجوع اليها سوف تظهر بشكل سريع بدون جلب بيانات الي في حاله تحدثها 
  ----- وبعد انتهاء مده التخزين التلقائي يتم حذفها ونبدا في جلب البيانات من جديد
  =================================================
  ---- App.jsx لمشاهده الامثله عليها والفهم اكتر اذهب لصفحه
  =================================================

  - staleTime : بتقلل عدد الطلبات في السيرفر
  ----  وجدنا انه دائما عند الذهاب والرجوع الي صفحه البيانات يتم جلب عمل ريكوست في السيرفر حته لو البيانات متجددتش 
  ---- في هذه الخاصيه تجعل البيانات التي تم جلبها للتو هي بيانات جديده وفي حاله الذهاب والرجوع لنفس الصفحه 
  ---- مش هيتم عمل ريكوست للسيرفر عشان يجيب البيانات لانه بيعتبر ان البيانات ديه هي اجدد حاجه في متعملش اي طلبات خالص
  ---- الخصيه ديه بتقبل قيمه بتعبر عن الزمن بالملي ثانيه والقيمه الافتراضيه لها صفر
  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليها والفهم اكتر اذهب لصفحه
  =================================================

  - refetchOnMount 
  ---- إذا تم التعيين على "صحيح"، فسيتم إعادة جلب الاستعلام عند التحميل إذا كانت البيانات قديمة

  - refetchOnWindowFocus
  ---- إذا تم التعيين على "صحيح"، فسيتم إعادة جلب الاستعلام عند الذهاب على الصفحه إذا كانت البيانات في حاله ان البيانات قديمه قديمة
  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
  */


/* 
  - refetchInterval: 
  ---- الفانكشن ديه بتقبل مني ثواني بالملي ثاينه ودا بيخلي البيانات افضل اعمل ليها طلب بشكل دوري كل مده الزمن دا
  ---- لو ادتها 2000 معناها اني بقوله كل ثانيتين اعمل ريكوست للبيانات بشكل دوري عشان اضمن ان البيانات ديما حديثه
  ---- بس بتعمل جهد عالي علي السيرفر طبعا ولو روحت للصفحه غير الصفحه الي فيها الريكوستات الطلبات طبيعي بتقف

  - refetchIntervalInBackground:
  ---- دي مرتبطه بالخصيه الي قبلها لاني لو استخدمتها وادتها صح في هيخلي مثلا الريكوست يفضل يتعمل كل ثانيتين مثلا حته لو 
  ---- انا فاتح تابه جديده علي جوجل مثلا بشرط التابه القديمه اكون لسه فيها عند صفحه الطلبات

  - enabled: خاصيه تستخدم لايقاف طلب البيانات في حاله دخول الصفحه علطول 
  ---- وفايدتها ان احيانا بنبقي عايزن نجيب البيانات اثناء الضغط علي زر مثلا او عمل امر اولا ثم جلب البيانات في دي الحل

  - refetch: دا الامر الي بتحطه علي شكل فانكشن ساعه الضغط علي زر لجلب البيانات
  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================

  - select الامر دا بيخلني اعمل فانشكن عشان افلتر البيانات الي راجعالي او اعمل عليها لوب وارجع من البيانات بتاعت الباك
  ---- البيانات الي انا عايزها بس ودا امر مهم جدا 
  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/


/* 
  - useQueries
  ---- بتستخدم فيه عمل اكتر من طلب للسيرفر في نفس الوقت بشكل دينامك 
  =================================================
  ---- DynamicParallelQueries.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
  
  - Dependent Queries
  ---- دا اسلوب لجعل الطلبات الخاصه بالسيرفر متتاليه وتعتمد علي نتائج بعض
  ---- يوجد مثال يعبر عن جلب ال اي ديه بتاع القنوات بطلب البحث عنهم باستخدام الميل
  ---- كم ثمه ناخذ نتيجه ال اي ديه ديه ونحطها ك متغير في الطلب الثاني للسيرفر عشان اجيب كل الكورسات المقدمه علي القناه دي
  =================================================
  ---- DependentQueries.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/


/*
  - useQueryClient: 
  ---- دي هوك بتستخدم في جلب كل الطلبات والبيانات الي رجعت من السيرفر وتم تخزينها بشكل موقت في الكاش بتاعنا

  - getQueryData: 
  ---- وباستخدام الفانكشن ديه بقدر اجيب طلب معين عن طريق اسم الكي بتاع الكويري بتاعته وبجيب بقا كل البيانات المتخزنه دي 
  ----- بدون اللجوا الي عمل الطلب للسيرفر مره اخري طبعا في حاله ان الكاش بتاعنا فاضي من الطلبات هيرجع نيل

  - initialData: 
  ---- دي خاصيه من خواص يوز كويري وبتخلني اعمل فانكشن دورها انها قبل معمل امر للسيرفر بعرض بيانات كانت اتخزنت قبل 
  ---- كده في السيرفر في بالتالي هيتم عمل الريكوست عادي للسيرفر بس المستخدم هيظهر ليه بيانات علطول ودي بتحسن من تجربه المستخدم

  =================================================
  ---- useSuperHeroData.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================

  - placeholderData: دي خصيه من خواص يوز كويري وبتخلني لما بعمل تنقل بين البيانات في صفحات زي اسلوب البجيناشن
  ---- بتخلني اعمله والبيانات ثابته لحد ما تتحدث مش الصفحه كلها بيتعمل ليها تحميل من تاني يعني
  ---- keepPreviousData الامر دا بستدعي من المكتبه بديه كقيمه للبروبس الي فوقها
  =================================================
  ---- PaginatedQueries.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/

/* 
  - useInfiniteQuery:
  ---- دي هوك بستخدمها عشان استدعي طلبات من السيرفر بشكل لا نهائي وتشبه امر البجيناشن الي شرحته قبل كده وفيها خواص كتيره زي

  - initialPageParam 
  ---- دي البدايه الي بيدا منها الطلب يعتبر اكنه من اول انهي صفحه هيبدا يجيب البيانات

  - getNextPageParam 
  ---- دي خاصيه بتقبل مني فانشكن فيه اتنين بروب وهما لاست بادج وي بادجيس وبتقم بزياده عدد الصفحات عشان تجبلي البيانات التاليه

  - fetchNextPage
  ---- دي بروبس برده بستخدمها علي شكل فانكشن لاعاده طلب البيانات من السيرفر بشكل متتالي مع تجديد البيانات

  - hasNextPage 
  ---- بروبس بتعرفني في بيانات تاني ولا دي اخر صفحه فيها بيانات بترجع صح او خطا

  - isFetchingNextPage 
  ---- بروبس بتعرفني هل في بيانات دلوقتي بتتجاب من السيرفر ولا لا 
  =================================================
  ---- InfiniteQuery.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================

  - useMutation
  ---- دي هوك بتستخدم في رفع وتعديل وحذف البيانات من الباك اند 

  - mutationFn 
  ---- دي بروبس بتستقبل مني فانكشن عشان اعمل ريكوست للبيانات
  =================================================
  ---- useSuperHeroesData.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================

  - mutate
  ---- دي فانكشن الي بضيف فيها البيانات الي هتتحذف او هتترفع او هتتعدل 

  - isPending
  ---- بروبس عشان تعمل ليا صح او خطاء تبين الحاله بتاعت البيانات هل لسه بتحمل ولا خلاص خلصت 

  - isSuccess
  ---- بترجع صح في حاله اضافه الطلب بشكل صحيح وغلط لو حصل اي مشكله

  =================================================
  ---- SuperHeroes.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/

/* 
  - invalidateQueries
  ---- دي فانكشن بتقبل مني اسم الكي بتاع ريكوست معين للسيرفر عشان اعيد نفس الريكوست دا تاني للسيرفر بشكل سريع
  ---- وهي بروبس من يوز كويري كلينت واقرب حاله استخدام ليها هي في حاله رفع او تعديل او حذف البيانات

  - setQueryData 
  ---- دي بروبس تانيه من يوز كويري كلاينت بتقبل مني اسم كي برده وفانكشن انا ببنيها عشان تجدد ليا البيانات المتخزنه
  =================================================
  ---- useSuperHeroesData.jsx لمشاهده الامثله عليهم والفهم اكتر اذهب لصفحه
  =================================================
*/