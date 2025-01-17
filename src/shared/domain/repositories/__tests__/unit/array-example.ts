// Exemplo com slice
const arraySlice = ['item1', 'item2', 'item3'];
console.log('Array original antes do slice:', arraySlice);
const resultadoSlice = arraySlice.slice(1, 2);
console.log('Resultado do slice:', resultadoSlice);
console.log('Array original depois do slice:', arraySlice);

console.log('\n-------------------\n');

// Exemplo com splice
const arraySplice = ['item1', 'item2', 'item3'];
console.log('Array original antes do splice:', arraySplice);
const resultadoSplice = arraySplice.splice(1, 1);
console.log('Resultado do splice:', resultadoSplice);
console.log('Array original depois do splice:', arraySplice);
