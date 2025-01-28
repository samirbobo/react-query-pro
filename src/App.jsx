import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SuperHeroes from "./pages/SuperHeroes";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./components/Root";
import SuperHero from "./pages/SuperHero";
import DynamicParallelQueries from "./pages/DynamicParallelQueries";
import DependentQueries from "./pages/DependentQueries";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />

      <Route path="super-heroes">
        <Route index element={<SuperHeroes />} />
        <Route path=":heroId" element={<SuperHero />} />
      </Route>

      {/* بجيب البيانات بشكل ديناميكيه يعني بجيب بيانات معينه متغيره في المثال حطيت قيم ثابته لكن في الطبيعي بتكون متغيره*/}
      <Route
        path="dynamic-parallel"
        element={<DynamicParallelQueries heroIds={[1, 3]} />}
      />

      {/* هنا شرحت فكره اني اعمل اكتر من طلب للسيرفر بس بشكل تسلسلي وراء بعضه وكل طلب بيعتمد علي الي نتائج الي قابله */}
      <Route
        path="dependent-queries"
        element={<DependentQueries email="vishwas@example.com" />}
      />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
// بعد 10 دقائق البيانات المتخزنه هتتمسح تلقائي من المخزن الافتراضي ولكن انا كده عدلت الخادم كله يعني اي فيتش هياخد
// 10 دقائق ويتجدد
const MINUTE = 1000 * 60;

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: MINUTE,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
export default App;
