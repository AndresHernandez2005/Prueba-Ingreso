import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './app/Components';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

export default App;
