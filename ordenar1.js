let data;
var total, promedioPorcentaje, sumas;
var errorGeneral = "Se ha producido un error, verifique el que formato de los datos proporcionado sea el correcto o pongase en contacto con su administrador";

$(document).on('click', '#btnLeer', function(e){
  e.preventDefault();
  data = leerDatos();
  loadDataIzq(data);
  $('#btnGenera').prop("disabled", false);
  $('#btnImprimir').prop("disabled", true);
});

$(document).on('click', '#btnGenera', function(e){
  e.preventDefault();
  data = generaRangos(data);
  $('#btnGenera').prop("disabled", true);
  $('#btnImprimir').prop("disabled", false);
});

$(document).on('click', '#btnImprimir', function(e){
  e.preventDefault();
  alert("Acción imprimir");
  $('#btnGenera').prop("disabled", true);
});

function leerDatos(){
  try {
    const textarea = document.getElementById('textarea-id'); 
    const data     = textarea.value.trim().split('\n').slice(1); // Obtiene los datos del textarea y los divide en líneas, excluyendo la primera línea que contiene encabezados
    const jsonData = [];

    for (let i = 0; i < data.length; i++) {
      const [nombre, cantidad] = data[i].split('\t'); // Divide cada línea en nombre y cantidad
      const cantidadSinComas = parseFloat(cantidad.replace(/,/g, '').replace('$', '')); // Elimina las comas y el signo $ y convierte la cantidad en un número
    
      const registro = { 
        NOMBRE_DEL_TRABAJADOR: nombre.trim(), 
        CANTIDAD: cantidadSinComas, 
        PORCENTAJE: 0, 
        RANGO: 0 
      }; // Crea un objeto con el nombre del trabajador y la cantidad (inicialmente 0)
      
      jsonData.push(registro); // Agrega el objeto al arreglo de datos en formato JSON
    }
    // data = generaTotales(jsonData);
    return generaTotales(jsonData);
  } catch (error) {
    alert(errorGeneral);
  }
}

function generaRangos(data){
  try {
    data = promedioPorcentaje < 5 ? formula2(data) : formula1(data, promedioPorcentaje);
    sumaTotales(data);

    loadDataDer(sumas)
    loadDataIzq(data);
  } catch (error) {
    alert(errorGeneral)
  }
}



function generaTotales(data){
  
  //obtenemos el total de CANTIDAD
  total = data.reduce((acc, val) => acc + val.CANTIDAD, 0);

  // Ordenar los datos de forma descendente basado en el campo CANTIDAD
  data.sort((a, b) => b.CANTIDAD - a.CANTIDAD);

  //obtener los porcentajes de cada cantidad comparada con el total
  const porcentajes = data.map((item) => {
    let resp = Math.round(((item.CANTIDAD / total) * 100) * 100) / 100;
    item.PORCENTAJE = resp;
    return resp;
  });

  promedioPorcentaje = Math.round((porcentajes.reduce((acc, curr) => acc + curr, 0) / porcentajes.length)*100)/100;

  $('#td-total').html(formatea(total));
  $('#td-prom').html(promedioPorcentaje);
  $('#td-por').html(promedioPorcentaje*2);

  console.log('generaTotales', data);
  return data;
}

function sumaTotales(data){

  // Variable que contendrá los datos necesarios para las tablas de la sección de abajo a la derecha
  sumas = {
    total:  {sumaCantidad: 0, sumaPorcentaje: 0},
    rango1: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
    rango2: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
    rango3: {min: 0, max: 0, cantidades: [], sumaCantidad: 0, sumaPorcentaje: 0 },
  };

  data.reduce((result, item) => {

    if (item.RANGO === 1) {
      result.rango1.sumaPorcentaje += item.PORCENTAJE;  // Suma los porcentajes del rango 1
      result.rango1.sumaCantidad += item.CANTIDAD;      // Suma las cantidades del rango 1
      result.rango1.cantidades.push(item.CANTIDAD);     // Ordena las cantidades del rango 1 en un array
    } else if (item.RANGO === 2) {
      result.rango2.sumaPorcentaje += item.PORCENTAJE;  // Suma los porcentajes del rango 2 
      result.rango2.sumaCantidad += item.CANTIDAD;      // Suma las cantidades del rango 2
      result.rango2.cantidades.push(item.CANTIDAD);     // Ordena las cantidades del rango 2 en un array
    } else if (item.RANGO === 3) {
      result.rango3.sumaPorcentaje += item.PORCENTAJE;  // Suma los porcentajes del rango 3
      result.rango3.sumaCantidad += item.CANTIDAD;      // Suma las cantidades del rango 3
      result.rango3.cantidades.push(item.CANTIDAD);     // Ordena las cantidades del rango 3 en un array
    }

    result.total.sumaPorcentaje += item.PORCENTAJE; // Suma todos los porcentajes
    result.total.sumaCantidad += item.CANTIDAD;     // Suma todas las cantidades
    return result;
  }, sumas);
  
  // Obtener los valores minimos para cada rango
  let r1Min = Math.min(...sumas.rango1.cantidades);
  let r2Min = Math.min(...sumas.rango2.cantidades);
  let r3Min = Math.min(...sumas.rango3.cantidades);

  // Obtener los valores máximos para cada rango
  let r1Max = Math.max(...sumas.rango1.cantidades);
  let r2Max = Math.max(...sumas.rango2.cantidades);
  let r3Max = Math.max(...sumas.rango3.cantidades);

  let diff_r1_r2 = r2Min - r1Max; // Calculo la diferencia entre rango 1 y 2
  sumas.rango1.max = parseFloat((r1Max + (diff_r1_r2/2) - 1).toFixed());  // Selecciono un numero intermedio entre ambos rangos para poder definir el limite superior del rango 1.
  sumas.rango2.min = parseFloat((r2Min - (diff_r1_r2/2)).toFixed());      // Selecciono un numero intermedio entre ambos rangos para poder definir el limite inferior del rango 2.

  let diff_r2_r3 = r3Min - r2Max; // Calculo la diferencia entre rango 2 y 3
  sumas.rango2.max = parseFloat((r2Max + (diff_r2_r3/2) - 1).toFixed());  // Selecciono un numero intermedio entre ambos rangos para poder definir el limite superior del rango 2.
  sumas.rango3.min = parseFloat((r3Min - (diff_r2_r3/2)).toFixed());      // Selecciono un numero intermedio entre ambos rangos para poder definir el limite inferior del rango 3.

  sumas.rango1.min = Math.floor(r1Min / 1000) * 1000; // redondeo al valor inmediatamente inferior en miles (29,232 -> 29,000)
  sumas.rango3.max = Math.ceil(r3Max / 1000) * 1000;  // redondeo al valor inmediatamente superior en miles (29,232 -> 30,000)
}

function loadDataIzq(data){
  
  $('#tablaDatos').slideUp("slow", function(){
    const table = document.getElementById('table-id'); // Reemplaza 'table-id' con el ID del elemento tabla en tu HTML
    const tableBody = table.getElementsByTagName('tbody')[0]; // Obtiene la referencia al cuerpo de la tabla
    tableBody.innerHTML = "";

    for (let i = 0; i < data.length; i++) { 
      const row            = tableBody.insertRow(); // Agrega una fila a la tabla
      const nombreCell     = row.insertCell(); // Agrega una celda para el nombre del trabajador
      const cantidadCell   = row.insertCell(); // Agrega una celda para la cantidad
      const porcentajeCell = row.insertCell(); // Agrega una celda para el porcentaje
      const rangoCell      = row.insertCell(); // Agrega una celda para el rango

      nombreCell.innerHTML     = data[i].NOMBRE_DEL_TRABAJADOR; // Asigna el nombre del trabajador a la celda correspondiente
      cantidadCell.innerHTML   = formatea(data[i].CANTIDAD); // Asigna la cantidad a la celda correspondiente, con dos decimales
      porcentajeCell.innerHTML = data[i].PORCENTAJE;
      rangoCell.innerHTML      = data[i].RANGO;
    }
    $('#tablaDatos').slideDown();
  });
}

function loadDataDer(sumas){

  $('#tablasTotales').slideUp("slow", function(){
    $('#r1Min').html(formatea(sumas.rango1.min));
    $('#r1Max').html(formatea(sumas.rango1.max));

    $('#r2Min').html(formatea(sumas.rango2.min));
    $('#r2Max').html(formatea(sumas.rango2.max));

    $('#r3Min').html(formatea(sumas.rango3.min));
    $('#r3Max').html(formatea(sumas.rango3.max));

    $('#r1SumaCantidad').html(formatea(sumas.rango1.sumaCantidad));
    $('#r1SumaPorcentaje').html((Math.round(sumas.rango1.sumaPorcentaje*100)/100)+'%');

    $('#r2SumaCantidad').html(formatea(sumas.rango2.sumaCantidad));
    $('#r2SumaPorcentaje').html((Math.round(sumas.rango2.sumaPorcentaje*100)/100)+'%');

    $('#r3SumaCantidad').html(formatea(sumas.rango3.sumaCantidad));
    $('#r3SumaPorcentaje').html((Math.round(sumas.rango3.sumaPorcentaje*100)/100)+'%');

    $('#totalSumaCantidad').html(formatea(sumas.total.sumaCantidad));
    $('#totalSumaPorcentaje').html(Math.round((sumas.total.sumaPorcentaje *100)/100)+'%');
    $('#tablasTotales').slideDown();
  });

}

function formula1(data, promedioPorcentaje){
  
  let porcentaje = (promedioPorcentaje * 2)/100;

  // Establece el 3 como "RANGO ACUTAL"
  let currentRange = 3;

  // Establece el campo CANTIDAD mas alto como "Valor maximo de rango"
  let maxRangeValue = data[0].CANTIDAD;

  // Coloca 3 en el campo RANGO del primer registro
  data[0].RANGO = currentRange;

  // Inicia un ciclo para cada registro
  for (let i = 1; i < data.length; i++) {

    // Compara el campo CANTIDAD del siguiente registro de la lista contra el "Valor maximo de rango"
    // const diff = Math.abs(maxRangeValue - data[i].CANTIDAD);
    const diff = maxRangeValue - data[i].CANTIDAD;
    if (diff > (maxRangeValue * porcentaje)) {
      // Si la diferencia del campo CANTIDAD es mayor a 10% con respecto en del TOTAL, entonces
      // Coloca un 2 en el el campo RANGO del registro comparado y establece 2 como "RANGO ACUTAL" 
      // y el campo CANTIDAD del registro comparado como "Valor maximo de rango"
      currentRange = currentRange == 1 ? currentRange = 1 : currentRange-1;
      maxRangeValue = data[i].CANTIDAD;
    }
    
    data[i].RANGO = currentRange;
  }

  return data;
}

function formula2(data){
  // alert('formula2')
  const n = data.length;
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

  return data;
}

function formatea(dato){
  return dato.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });
}

