import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // sekmeye geri dönünce her seferinde istek atmasın
      retry: 1,  // anlık network hatasında 1 kez denesin, sonsuza kadar uğraşmasın
    },
  },
});