/// <reference lib="webworker" />

// import { tap } from 'rxjs';
// import { factorialCalculator } from './calculateFactorial';
// import { PokemonService } from './pokemon.service';


// addEventListener('message', ({ data }) => {
//   const response = factorialCalculator(data);

//   const service = new Service();
//   postMessage(response);
// });

self.addEventListener('message', response, false);

async function response({ data }) {
  if (data === 'request') {
    const result = await api();
    self.postMessage(result);
  }
}

async function api() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const { results } = await response.json();
  return results;
}
