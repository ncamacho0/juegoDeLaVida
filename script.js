
let tableroListado, estado = [], activos, mov = 0, auto = false,dimensiones = { ancho: 10,alto: 10};

function generarCelulas() {
  tabla = document.getElementById('celulas');
  tabla.innerHTML = '';
  dimensiones.ancho = parseInt(document.getElementById('ancho').value);
  dimensiones.alto = parseInt(document.getElementById('alto').value);
  creacionTabla();
  tableroListado = document.getElementsByTagName('td');
}

function creacionTabla(){
  for(let i = 0; i < dimensiones.alto; i++) {
    let renglon = document.createElement('tr');
    estado[i] = [];
    for(let j = 0; j < dimensiones.ancho; j++) {
      estado[i][j] = false;
      let columna = document.createElement('td');
      columna.className = '';
      columna.onclick = vivoOMuerto;
      renglon.appendChild(columna);
    }
    tabla.appendChild(renglon);
  }
}

function vivoOMuerto() {
    this.className = this.className == 'vivo' ? '' : 'vivo';
}

function iniciarJuego() {
  if(auto == true){
    cancelAnimationFrame(mov);
    document.getElementById('inicio').value = 'Iniciar';
  } else {
    mov = requestAnimationFrame(siguienteCel);
    document.getElementById('inicio').value = 'Cancelar';
  }
  auto = !auto;
}

function siguienteCel() {
  let i,j,cel, activos = 0;
  for(i = 0; i < dimensiones.alto; i++) {
    for(j = 0; j < dimensiones.ancho; j++) {
      cel = (tableroListado[dimensiones.ancho * i + j].className == 'vivo');
      estado[i][j] = cel;
      if(cel) 
        activos++;
    }
  }

  if(activos == 0) {
    document.getElementById('inicio').value = 'Iniciar';
    return;
  }
  
  let n, k, p, q,r = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];

  for(i = 0; i < dimensiones.alto; i++) {
    for(j = 0; j < dimensiones.ancho; j++) {
      n = 0;
      k = r.length;
      while(k--) {
        p = i + r[k][0];
        q = j + r[k][1];
        if(p < 0 || q < 0 || p == dimensiones.alto || q == dimensiones.ancho)
          continue;
        if(estado[p][q])
          n++;
      }
      cel = estado[i][j];
      // condiciones de las reglas del juego.
      if(!cel && n === 3)
        tableroListado[dimensiones.ancho * i + j].className = 'vivo';
      else if(cel && (n === 3 || n === 2))
        tableroListado[dimensiones.ancho * i + j].className = 'vivo';
      else
        tableroListado[dimensiones.ancho * i + j].className = '';
    }
  }
  mov = requestAnimationFrame(siguienteCel);
}