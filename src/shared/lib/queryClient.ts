import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { handleApiError } from "@/shared/lib/errors/handleApiError";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const silent = query.meta?.silent === true;
      if (!silent) handleApiError(error, "Failed to load data");
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const silent = mutation.meta?.silent === true;
      if (!silent) handleApiError(error, "Action failed");
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
