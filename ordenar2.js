const data = [
  { CANTIDAD: 28336.21, RANGO: 0 },
  { CANTIDAD: 28658.90, RANGO: 0 },
  { CANTIDAD: 29177.88, RANGO: 0 },
  { CANTIDAD: 31153.88, RANGO: 0 },
  { CANTIDAD: 35705.02, RANGO: 0 },
  { CANTIDAD: 37233.38, RANGO: 0 },
  { CANTIDAD: 41767.15, RANGO: 0 },
  { CANTIDAD: 87503.31, RANGO: 0 },
  { CANTIDAD: 88224.27, RANGO: 0 },
  { CANTIDAD: 145898.48, RANGO: 0 },
  { CANTIDAD: 157233.45, RANGO: 0 },
  { CANTIDAD: 4350071.73, RANGO: 0 },
];

// Obtener la suma total de las cantidades
const total = data.reduce((acc, val) => acc + val.CANTIDAD, 0);

const porcentajes = data.map((item) => {
  return Math.round(((item.CANTIDAD / total) * 100) * 100) / 100;
});

console.assert(porcentajes)

const promedioPorcentaje = Math.round((porcentajes.reduce((acc, curr) => acc + curr, 0) / porcentajes.length)*100)/100;

console.assert('promedioPorcentaje', promedioPorcentaje)

