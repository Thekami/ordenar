function prueba(data){

  let porcentajesJson = [];
  //obtenemos el total de CANTIDAD
  const total = data.reduce((acc, val) => acc + val.CANTIDAD, 0);

  // Ordenar los datos de forma descendente basado en el campo CANTIDAD
  data.sort((a, b) => b.CANTIDAD - a.CANTIDAD);

  //obtener los porcentajes de cada cantidad comparada con el total
  const porcentajes = data.map((item) => {
    let resp = Math.round(((item.CANTIDAD / total) * 100) * 100) / 100;
    porcentajesJson.push(resp);
    return resp;
  });

  console.log(porcentajes)

  const promedioPorcentaje = Math.round((porcentajes.reduce((acc, curr) => acc + curr, 0) / porcentajes.length)*100)/100;

  console.log('promedioPorcentaje', promedioPorcentaje)

  // Calcular la mediana de porcentajes

  const n = porcentajesJson.length;
  const mitad = Math.floor(n / 2);  

  if (n % 2 === 0) {
    // El número de datos es par
    const mediana = (porcentajesJson[mitad - 1] + porcentajesJson[mitad]) / 2;
    console.log(`La mediana es ${mediana}`);
  } else {
    // El número de datos es impar
    const mediana = porcentajesJson[mitad];
    console.log(`La mediana es ${mediana}`);
  }

  let tercia = Math.floor(n / 3);
  let valorR3 = Math.floor(tercia / 2);

  for (let i = 0; i < data.length; i++) {
    if(i <= valorR3)
      data[i].RANGO = 3;
    else if(i <= tercia)
      data[i].RANGO = 2;
    else
      data[i].RANGO = 1;
  }

  loadDataIzq(data);

}