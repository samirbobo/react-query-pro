import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import SuperHeroes from "./pages/SuperHeroes";
import SuperHero from "./pages/SuperHero";
import NotFound from "./pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./components/Root";
import ParallelQueries from "./pages/ParallelQueries";
import DynamicParallelQueries from "./pages/DynamicParallelQueries";
import DependentQueries from "./pages/DependentQueries";
import PaginatedQueries from "./pages/PaginatedQueries";
import InfiniteQuery from "./pages/InfiniteQuery";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="super-heroes">
        <Route index element={<SuperHeroes />} />
        <Route path=":heroId" element={<SuperHero />} />
      </Route>
      {/* هنا شرحت فكره اني اعمل اكتر من طلب للسيرفر في نفس اللحظه بشكل متوازي */}
      <Route path="parallel" element={<ParallelQueries />} />
      {/* هنا نفس الفكره بس الطلبات ديناميكيه يعني بجيب بيانات ميعينه متغيره */}
      <Route
        path="dynamic-parallel"
        element={<DynamicParallelQueries heroIds={[1, 3]} />}
      />
      {/* هنا شرحت فكره اني اعمل اكتر من طلب للسيرفر بس بشكل تسلسلي وراء بعضه وكل طلب بيعتمد علي الي نتائج الي قابله */}
      <Route
        path="dependent-queries"
        element={<DependentQueries email="vishwas@example.com" />}
      />
      <Route path="colors" element={<PaginatedQueries />} />
      <Route path="infinite" element={<InfiniteQuery />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

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
