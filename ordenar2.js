// const data = [{"NOMBRE_DEL_TRABAJADOR":"Nombre 12","CANTIDAD":4350071.73,"PORCENTAJE":85.95,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 11","CANTIDAD":157233.45,"PORCENTAJE":3.11,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 10","CANTIDAD":145898.48,"PORCENTAJE":2.88,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 9","CANTIDAD":88224.27,"PORCENTAJE":1.74,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 8","CANTIDAD":87503.31,"PORCENTAJE":1.73,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 7","CANTIDAD":41767.15,"PORCENTAJE":0.83,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 6","CANTIDAD":37233.38,"PORCENTAJE":0.74,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 5","CANTIDAD":35705.02,"PORCENTAJE":0.71,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 4","CANTIDAD":31153.88,"PORCENTAJE":0.62,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 3","CANTIDAD":29177.88,"PORCENTAJE":0.58,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 2","CANTIDAD":28658.9,"PORCENTAJE":0.57,"RANGO":0},{"NOMBRE_DEL_TRABAJADOR":"Nombre 1","CANTIDAD":28336.21,"PORCENTAJE":0.56,"RANGO":0}]

function obtenerSumas(data) {
  sumas = {
    total:  {sumaCantidad: 0, sumaPorcentaje: 0},
    rango1: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
    rango2: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
    rango3: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
  };

  data.reduce((result, item) => {
    if (item.RANGO === 1) {
      result.rango1.sumaPorcentaje += item.PORCENTAJE;
      result.rango1.sumaCantidad += item.CANTIDAD;
      result.rango1.cantidades.push(item.CANTIDAD);
    } else if (item.RANGO === 2) {
      result.rango2.sumaPorcentaje += item.PORCENTAJE;
      result.rango2.sumaCantidad += item.CANTIDAD;
      result.rango2.cantidades.push(item.CANTIDAD);
    } else if (item.RANGO === 3) {
      result.rango3.sumaPorcentaje += item.PORCENTAJE;
      result.rango3.sumaCantidad += item.CANTIDAD;
      result.rango3.cantidades.push(item.CANTIDAD);
    }
    result.total.sumaPorcentaje += item.PORCENTAJE;
    result.total.sumaCantidad += item.CANTIDAD;
    return result;
  }, sumas);
  
  sumas.rango1.min = Math.min(...sumas.rango1.cantidades);
  sumas.rango2.min = Math.min(...sumas.rango2.cantidades);
  sumas.rango3.min = Math.min(...sumas.rango3.cantidades);

  sumas.rango1.max = Math.max(...sumas.rango1.cantidades);
  sumas.rango2.max = Math.max(...sumas.rango2.cantidades);
  sumas.rango3.max = Math.max(...sumas.rango3.cantidades);

  console.log(sumas);
}

function obtenerDatos2(data) {
  // obtener el valor mínimo y máximo del campo CANTIDAD donde el campo RANGO es igual a 1, 2 o 3
  const cantidades = data
    .filter((item) => item.RANGO === 1 || item.RANGO === 2 || item.RANGO === 3)
    .map((item) => item.CANTIDAD);
  console.log(cantidades);
  const minCantidad = Math.min(...cantidades).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const maxCantidad = Math.max(...cantidades).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  console.log(
    `El valor más pequeño del campo CANTIDAD para el RANGO 1 es igual a ${minCantidad}`
  );
  console.log(
    `El valor más grande del campo CANTIDAD para el RANGO 1 es igual a ${maxCantidad}`
  );

  const cantidades2 = data
    .filter((item) => item.RANGO === 2)
    .map((item) => item.CANTIDAD);
  const minCantidad2 = Math.min(...cantidades2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const maxCantidad2 = Math.max(...cantidades2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  console.log(
    `El valor más pequeño del campo CANTIDAD para el RANGO 2 es igual a ${minCantidad2}`
  );
  console.log(
    `El valor más grande del campo CANTIDAD para el RANGO 2 es igual a ${maxCantidad2}`
  );

  const cantidades3 = data
    .filter((item) => item.RANGO === 3)
    .map((item) => item.CANTIDAD);
  const minCantidad3 = Math.min(...cantidades3).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const maxCantidad3 = Math.max(...cantidades3).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  console.log(
    `El valor más pequeño del campo CANTIDAD para el RANGO 3 es igual a ${minCantidad3}`
  );
  console.log(
    `El valor más grande del campo CANTIDAD para el RANGO 3 es igual a ${maxCantidad3}`
  );
}
