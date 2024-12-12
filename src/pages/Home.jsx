import { usePlantRecommendations } from '../hooks/usePlantRecommendations';
import InputForm from '../components/InputForm';
import ResultList from '../components/ResultList';

function Home() {
  const { recommendations, getRecommendations } = usePlantRecommendations();

  function handleFormSubmit(sunlight, soil, maintenance) {
    getRecommendations({ sunlight, soil, maintenance });
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-700 text-white p-4 text-center text-2xl font-bold">
        Plant Selection Expert System
      </header>
      <main className="py-8">
        <InputForm onSubmit={handleFormSubmit} />
        <ResultList plants={recommendations} />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Plant Selection Expert System
      </footer>
    </div>
  );
}

export default Home;
