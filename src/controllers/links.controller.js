import pool from "../database";


//Añadir el perfil del recolector
//Añadir el perfil del reciclador
//Mostra datos y poder editar Cuenta
//Observar recolecciones
//Agregar Recolecciones
//Eliminar
//Editar Recoleccion
//Buscar Barrio
//Obtener recolección
//Realizar una solicitud de recolección
//Observar todas las solicitudes de recolecciones
//Eliminar Solicitudes
//Aceptar la solicitud
//Observar recolecciones Aceptadas

//Observar todos los comentarios de los recicladores
//Observar todos los comentarios de los recolectores

//Escribir el encargado de la recolección
//Observar Lista de usuarios
//Eliminar Usuario

//Observar Lista de Recolectores
//Eliminar Usuario Recolector

//Observar Lista de Recicladores
//Eliminar Usuario Reciclador

//Observar todas las listas de de los recolectores
//Observar todas las listas de de los recicladores

//Observar Lista de Recolectas registradas
//Eliminar Recolecta

//Observar Lista de administradores
//Editar Administrador
//Eliminar administrador

//Ver detalles de la recoleccion seleccionada

//Editar fecha de la recolecció

//Observar Lista de recolecciones pendientes de las instituci

//Observar Lista de recolecciones asignadas

//Eliminar Solicitud

//Vista para la calificacion del reciclador
//calificar recilclador

//Vista para la calificacion del recolector
//calificar recolector


//Eliminar La recolección asinada

//Observar Listas De recolecciones


//Añadir el perfil del recolector
export const renderRecolector = async (req, res) => {
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    req.flash("message", "Ya estás registrado como reciclador");
    res.redirect("/profile");
  } else if (recolector[0].length > 0) {
    req.flash("message", "Ya estás registrado como recolector");
    res.redirect("/profile");
  } else {
    res.render("links/crearPerfilRecolector");
  }
};

export const addRecolector = async (req, res) => {
  const { nombre, apellido, telefono, ciudad, identificacion, edad, departamento, lugar, direccion, nombreLugar, barrio } = req.body;
  const newRecolector = {
    idUsuario: req.user.id,
    nombre,
    apellido,
    telefono,
    ciudad,
    identificacion,
    edad,
    departamento,
    lugar,
    direccion,
    nombreLugar,
    barrio,
    votantes:1,
    estrellas:4,
  };
  await pool.query("INSERT INTO perfilrecolector set ?", [newRecolector]);
  req.flash("success", "Perfil creado exitosamente");
  res.redirect("/profile");
};
//Fin Añadir el perfil del recolector

//Añadir el perfil del reciclador
export const renderReciclador = async (req, res) => {
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    req.flash("message", "Ya estás registrado como reciclador");
    res.redirect("/profile");
  } else if (recolector[0].length > 0) {
    req.flash("message", "Ya estás registrado como recolector");
    res.redirect("/profile");
  } else {
    res.render("links/crearPerfilReciclador");
  }
};

export const addReciclador = async (req, res) => {
  const { nombre, apellido, telefono, ciudad, identificacion, edad, departamento, direccion, nombreLugar, barrio } = req.body;
  const newReciclador = {
    idUsuario: req.user.id,
    nombre,
    apellido,
    telefono,
    ciudad,
    identificacion,
    edad,
    departamento,
    direccion,
    nombreLugar,
    barrio,
    votantes:1,
    estrellas:4,
  };
  await pool.query("INSERT INTO perfilreciclador set ?", [newReciclador]);
  req.flash("success", "Perfil creado exitosamente");
  res.redirect("/profile");
};
//Fin Añadir el perfil del reciclador

//Mostra datos y poder editar Cuenta
export const rendercuenta = async (req, res) => {
  const admininistrador = await pool.query('SELECT * FROM perfiladministradores WHERE idUser = ?', [req.user.id]);
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    const [datos] = await pool.query("SELECT * FROM perfilreciclador WHERE idUsuario = ?", [req.user.id]);
    res.render("links/cuenta", { dato: datos[0] });

  } else if (recolector[0].length > 0) {
    const [datos] = await pool.query("SELECT * FROM perfilrecolector WHERE idUsuario = ?", [req.user.id]);
    res.render("links/cuenta", { dato: datos[0] });
  }

  else if (admininistrador[0].length > 0) {
    const [datosAdmininistrador] = await pool.query('SELECT * FROM perfiladministradores WHERE idUser = ?', [req.user.id]);
    console.log(datosAdmininistrador[0])
    res.render("links/gestionDatos", { datoadmin: datosAdmininistrador[0] });
  }
  else {
    req.flash("message", "Para usar este panel debes crear tu perfil como reciclador o recolector");
    res.redirect("/profile");
  }
};

export const editoCuenta = async (req, res) => {
  const { nombre, apellido, telefono, ciudad, edad, departamento, direccion, barrio } = req.body;
  const datosNuevo = {
    nombre,
    apellido,
    telefono,
    ciudad,
    edad,
    departamento,
    direccion,
    barrio,
  };
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    const Preciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
    var modelo = Object.values(Preciclador[0])[0];
    var jsonCompleto = parseInt(JSON.stringify(modelo.id));
    await pool.query("UPDATE perfilreciclador set ? WHERE id = ?", [datosNuevo, jsonCompleto]);
    req.flash("success", "Perfil actualizado correctamente");
    res.redirect("/profile");
  } else if (recolector[0].length > 0) {
    const Precolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
    var modelo = Object.values(Precolector[0])[0];
    var jsonCompleto = parseInt(JSON.stringify(modelo.id));
    await pool.query("UPDATE perfilrecolector set ? WHERE id = ?", [datosNuevo, jsonCompleto]);
    req.flash("success", "Perfil actualizado correctamente");
    res.redirect("/profile");
  } else {
    req.flash("message", "No tienes Perfil registrado");
    res.redirect("/profile");
  }
};
//Fin de Muestra datos y poder editar Cuenta

//Observar recolecciones
export const renderRecolecciones = async (req, res) => {
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    var idReciclador = Object.values(reciclador[0])[0];
    var idReciclador2 = parseInt(JSON.stringify(idReciclador.id));
    const [solictudes] = await pool.query("SELECT * FROM solicitudes WHERE idReciclador = ?", [idReciclador2]);
    console.log(solictudes)
    res.render("links/solicitudes", { solicitudes: solictudes });
  } else if (recolector[0].length > 0) {
    var idRecolector = Object.values(recolector[0])[0];
    var idRecolector2 = parseInt(JSON.stringify(idRecolector.id));
    const [recolecciones] = await pool.query("SELECT * FROM recolecta WHERE idRecolector = ?", [idRecolector2]);
    res.render("links/recolecciones", { recolecta: recolecciones });
  } else {
    req.flash("message", "Para usar este panel debes crear tu perfil como reciclador o recolector");
    res.redirect("/profile");
  }
};

//Agregar Recolecciones
export const renderAddRecoleccion = (req, res) => {
  res.render("links/addRecoleccion");
};

export const addRecoleccion = async (req, res) => {
  const barrioRec = await pool.query('SELECT barrio FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  var idRecolector = Object.values(recolector[0])[0];
  var idRecolector2 = parseInt(JSON.stringify(idRecolector.id));

  const estrellasReccolector = await pool.query("SELECT estrellas FROM perfilrecolector WHERE idUsuario = ?", [req.user.id]);
  const votantesRecolector = await pool.query("SELECT votantes FROM perfilrecolector WHERE idUsuario = ?", [req.user.id]);

  var vtRecolector = Object.values(votantesRecolector[0])[0];
  var estRecolector = Object.values(estrellasReccolector[0])[0];

  vtRecolector = parseInt(JSON.stringify(vtRecolector.votantes));

  estRecolector = parseInt(JSON.stringify(estRecolector.estrellas));

  const sum = estRecolector + vtRecolector;
  const prome = vtRecolector * 5;
  const rating = (sum * 5) / prome
  //Aca redondea el valor ejemplo la ecuacion da 4.83333 --> guarda 5

  var Consultabarrio = Object.values(barrioRec[0])[0];
  var barrioC = Consultabarrio.barrio

  const { nombre, telefono, fecha1, fecha2, horario1, horario2, materiales, cantidad, estado, precio, toxico, clasificado, limpio } = req.body;
  const recolectaN = {
    nombre,
    telefono,
    fecha1,
    fecha2,
    horario1,
    horario2,
    materiales,
    cantidad,
    estado,
    precio,
    toxico,
    clasificado,
    limpio,
    barrio: barrioC,
    idRecolector: idRecolector2,
    status:0,
    ponderado: rating,
  };
  await pool.query("INSERT INTO recolecta set ?", [recolectaN]);
  req.flash("success", "Recolecta Publicada exitosamente");
  res.redirect("/links/recolectas");
};

//Eliminar
export const deleteRecoleccion = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE solicitudes set estado = 'Rechazada' WHERE idRecolecta = ?", [id]);
  await pool.query("DELETE FROM recolecta WHERE ID = ?", [id]);
  req.flash("success", "Recolecta Eiminada correctamente");
  res.redirect("/links/recolectas");
};

//Editar Recoleccion
export const renderEditaRecoleccion = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const permiso = await pool.query('SELECT status FROM recolecta WHERE id = ?', [id]);
  var status = Object.values(permiso[0])[0];
  status = parseInt(JSON.stringify(status.status));
  if( status === 1){
    req.flash("message", "Ya aceptaste Esta solicitud ¡No puedes editarla.!");
  res.redirect("/links/recolectasAceptadas");
  }else{
    const [recoleccion] = await pool.query("SELECT * FROM recolecta WHERE id = ?", [id]);
    res.render("links/editarRecolecta", { datos: recoleccion[0] });
  }
};

export const editRecolecciones = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, fecha1, fecha2, horario1, horario2, materiales, cantidad, estado, precio, toxico, clasificado, limpio } = req.body;
  const recolectaEditada = {
    nombre,
    telefono,
    fecha1,
    fecha2,
    horario1,
    horario2,
    materiales,
    cantidad,
    estado,
    precio,
    toxico,
    clasificado,
    limpio,
  };
  await pool.query("UPDATE recolecta set ? WHERE id = ?", [recolectaEditada, id]);
  req.flash("success", "Recolección editada exitosamente");
  res.redirect("/links/recolectas");
};

//Buscar Barrio
export const renderSearchRecolectas = async (req, res) => {
  const { search } = req.body;
  const [recolecciones] = await pool.query("SELECT * FROM recolecta WHERE barrio = ? AND status = '0'", [search]);
  res.render("links/recoleccionesPublicadas", { recolectas: recolecciones });
};

//Obtener recolección
export const obtenerRecoleccion = async (req, res) => {
  const { id } = req.params;
  const [Recolectaseleccionada] = await pool.query("SELECT * FROM recolecta WHERE id = ?", [id]);
  res.render("links/detallesRecolecta", { recoleccion: Recolectaseleccionada[0] });
};

//Realizar una solicitud de recolección
export const solicitarRecoleccion = async (req, res) => {
  const idRecolector = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  console.log(idRecolector[0])
  if (idRecolector[0].length > 0) {
    const { id } = req.params;
    const recolectorLugar = await pool.query('SELECT nombreLugar FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
    const material = await pool.query('SELECT materiales FROM recolecta WHERE id = ?', [id]);
    const recolectorId = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);


    const estrellasReciclador = await pool.query("SELECT estrellas FROM perfilreciclador WHERE idUsuario = ?", [req.user.id]);
    const votantesReciclador = await pool.query("SELECT votantes FROM perfilreciclador WHERE idUsuario = ?", [req.user.id]);

    var vtReciclador = Object.values(votantesReciclador[0])[0];
    var estReciclador = Object.values(estrellasReciclador[0])[0];
    vtReciclador= parseInt(JSON.stringify(vtReciclador.votantes));
    estReciclador = parseInt(JSON.stringify(estReciclador.estrellas));
    const sum = estReciclador + vtReciclador;
    const prome = vtReciclador * 5;
    const rating = (sum * 5) / prome

    var empresa = Object.values(recolectorLugar[0])[0];
    empresa = empresa.nombreLugar
    var recolector = Object.values(recolectorId[0])[0];
    recolector = parseInt(JSON.stringify(recolector.id));
    var elemento = Object.values(material[0])[0];
    elemento = elemento.materiales
    const { fechaRecoleccion, horario, precioSugerido, comentario } = req.body;
    const nuevaSolicitud = {
      idReciclador: recolector,
      idRecolecta: id,
      nombreLugar: empresa,
      fechaRecoleccion,
      material: elemento,
      horario,
      estado: 'En espera de Respuesta',
      precioSugerido,
      comentario,
      ponderadoReciclador:rating,
    };
    console.log(nuevaSolicitud)
    await pool.query("INSERT INTO solicitudes set ?", [nuevaSolicitud]);
    req.flash("success", "Tienes una nueva recolección Seleccionada");
    res.redirect("/links/recolectas");
  } else {
    req.flash("message", "No puedes solicitar recolecciones. No eres reciclador.");
    res.redirect("/profile");
  }
};

//Observar todas las solicitudes de recolecciones
export const solictudReciclador = async (req, res) => {
  const { id } = req.params;
  const [solicitudes] = await pool.query("SELECT * FROM solicitudes WHERE idRecolecta = ? and estado = 'En espera de Respuesta'", [id]);
  console.log(solicitudes.length)
  if (solicitudes.length > 0) {
    console.log(solicitudes)
    res.render("links/solicitudesRequeridas", { TodasSolicitudes: solicitudes });
  } else {
    req.flash("message", "No tienes solicitudes en esta recolección");
    res.redirect("/links/recolectas");
  }
};

//Eliminar Solicitudes
export const deleteSolicitud = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM solicitudes WHERE ID = ?", [id]);
  req.flash("success", "Solicitud Eiminada correctamente");
  res.redirect("/links/recolectas");
};

//Aceptar la solicitud
export const aceptaSolicitud = async (req, res) => {
  const { id } = req.params;

  await pool.query("UPDATE solicitudes set estado = 'Aceptada' WHERE id = ?", [id]);
  const status = await pool.query('SELECT idRecolecta FROM solicitudes WHERE id = ?', [id]);
  var estadoR = Object.values(status[0])[0];
  estadoR = parseInt(JSON.stringify(estadoR.idRecolecta));
  await pool.query("UPDATE recolecta set status = '1' WHERE id = ?", [estadoR]);
  //Obtener los datos de la tabla de solicitudes
  console.log("Tabla de solicitudes******************************************************************************Tabla de solicitudes")
  //Obtener el horario escogido de la recolecta en la tabla de solicitudes
  const horario = await pool.query('SELECT horario FROM solicitudes WHERE id = ?', [id]);
  var tiempo = Object.values(horario[0])[0];
  tiempo = tiempo.horario

  console.log(tiempo)

  //Obtener el horario escogido de la recolecta en la tabla de solicitudes
  const fecha = await pool.query('SELECT fechaRecoleccion FROM solicitudes WHERE id = ?', [id]);
  var date = Object.values(fecha[0])[0];
  date = date.fechaRecoleccion

  console.log(date)

  //Obtener el materuial escogido de la recolecta en la tabla de solicitudes
  const material = await pool.query('SELECT material FROM solicitudes WHERE id = ?', [id]);
  var elementos = Object.values(material[0])[0];
  elementos = elementos.material

  console.log(elementos)

  //Obtener el materuial escogido de la recolecta en la tabla de solicitudes
  const reciclador = await pool.query('SELECT idReciclador FROM solicitudes WHERE id = ?', [id]);
  var recicladorId = Object.values(reciclador[0])[0];
  recicladorId = recicladorId.idReciclador

  console.log(recicladorId)

  //Obtener el id de la recolecta en la tabla de solicitudes
  const idRecolecta = await pool.query('SELECT idRecolecta FROM solicitudes WHERE id = ?', [id]);
  var recoleccion = Object.values(idRecolecta[0])[0];
  recoleccion = recoleccion.idRecolecta

  console.log(recoleccion)
  console.log("Tabla de solicitudes******************************************************************************Tabla de solicitudes")

  //Obtener los datos de la recolecta en la tabla de recolecta

  console.log("Tabla de recolecta******************************************************************************Tabla de recolecta")

  //Obtener el nombre del encargado de la entrega de la recolecta en la tabla de recolecta
  const encargadoEntrega = await pool.query('SELECT nombre FROM recolecta WHERE id = ?', [recoleccion]);
  var encargEntrega = Object.values(encargadoEntrega[0])[0];
  encargEntrega = encargEntrega.nombre

  console.log(encargEntrega)

  //Obtener la cantidad de la entrega de la recolecta en la tabla de recolecta
  const cantidad = await pool.query('SELECT cantidad FROM recolecta WHERE id = ?', [recoleccion]);
  var peso = Object.values(cantidad[0])[0];
  peso = peso.cantidad

  console.log(peso)

  //Obtener toxico de la entrega de la recolecta en la tabla de recolecta
  const toxico = await pool.query('SELECT toxico FROM recolecta WHERE id = ?', [recoleccion]);
  var ticixo = Object.values(toxico[0])[0];
  ticixo = ticixo.toxico

  console.log(ticixo)

  //Obtener clasificado de la entrega de la recolecta en la tabla de recolecta
  const clasificado = await pool.query('SELECT clasificado FROM recolecta WHERE id = ?', [recoleccion]);
  var clasif = Object.values(clasificado[0])[0];
  clasif = clasif.clasificado

  console.log(clasif)

  //Obtener limpio de la entrega de la recolecta en la tabla de recolecta
  const limpio = await pool.query('SELECT limpio FROM recolecta WHERE id = ?', [recoleccion]);
  var limpoi = Object.values(limpio[0])[0];
  limpoi = limpoi.limpio

  console.log(limpoi)

  //Obtener el id del encargado de la recolecta de la recolecta en la tabla de recolector
  const idRecolector = await pool.query('SELECT idRecolector FROM recolecta WHERE id = ?', [recoleccion]);
  var recolector = Object.values(idRecolector[0])[0];
  recolector = recolector.idRecolector

  console.log(recolector)

  console.log("Tabla de recolecta******************************************************************************Tabla de recolecta")

  console.log("Tabla de pefilRecolecto******************************************************************************pefilRecolecto")
  //Datos que se obtienen de la tabla del perfilRecolector

  //Obtener el nombre del administrador de la recolección en la tabla de Perfil recolector
  const adminisradorRecoleccion = await pool.query('SELECT nombre FROM perfilrecolector WHERE id = ?', [recolector]);
  var administrador = Object.values(adminisradorRecoleccion[0])[0];
  administrador = administrador.nombre

  console.log(administrador)

  //Obtener el telefono del administrador de la recolección en la tabla de Perfil recolector
  const telladminisradorRecoleccion = await pool.query('SELECT telefono FROM perfilrecolector WHERE id = ?', [recolector]);
  var tellAdministrador = Object.values(telladminisradorRecoleccion[0])[0];
  tellAdministrador = tellAdministrador.telefono

  console.log(tellAdministrador)

  //Obtener el Tipo De recolección de la recolección en la tabla de Perfil recolector
  const tipo = await pool.query('SELECT lugar FROM perfilrecolector WHERE id = ?', [recolector]);
  var tipoRecoleccion = Object.values(tipo[0])[0];
  tipoRecoleccion = tipoRecoleccion.lugar

  console.log(tipoRecoleccion)

  //Obtener la direccion De recolección de la recolección en la tabla de Perfil recolector
  const direccion = await pool.query('SELECT direccion FROM perfilrecolector WHERE id = ?', [recolector]);
  var lugar = Object.values(direccion[0])[0];
  lugar = lugar.direccion

  console.log(lugar)

  //Obtener el nombre del lugar De recolección de la recolección en la tabla de Perfil recolector
  const nombreLugar = await pool.query('SELECT nombreLugar FROM perfilrecolector WHERE id = ?', [recolector]);
  var nombreLugarRecoleccion = Object.values(nombreLugar[0])[0];
  nombreLugarRecoleccion = nombreLugarRecoleccion.nombreLugar

  console.log(nombreLugarRecoleccion)


  console.log("Tabla de pefilRecolecto******************************************************************************pefilRecolecto")

  console.log("Tabla de pefilReciclador******************************************************************************pefilReciclador")
  //Datos que se obtienen de la tabla del perfilRecolector

  //Obtener el nombre del administrador de la recolección en la tabla de Perfil recolector
  const adminisradorRecolector = await pool.query('SELECT nombre FROM perfilreciclador WHERE id = ?', [recicladorId]);
  var administradorRecolector = Object.values(adminisradorRecolector[0])[0];
  administradorRecolector = administradorRecolector.nombre

  console.log(administradorRecolector)

  //Obtener el telefono del administrador de la recolección en la tabla de Perfil recolector
  const telladminisradorRecolector = await pool.query('SELECT telefono FROM perfilreciclador WHERE id = ?', [recicladorId]);
  var tellAdministradorRecolector = Object.values(telladminisradorRecolector[0])[0];
  tellAdministradorRecolector = tellAdministradorRecolector.telefono

  console.log(tellAdministradorRecolector)

  //Obtener la direccion De recolección de la recolección en la tabla de Perfil recolector
  const direccionRecolectores = await pool.query('SELECT direccion FROM perfilreciclador WHERE id = ?', [recicladorId]);
  var lugarRecolectores = Object.values(direccionRecolectores[0])[0];
  lugarRecolectores = lugarRecolectores.direccion

  console.log(lugarRecolectores)

  //Obtener el nombre del lugar De recolección de la recolección en la tabla de Perfil recolector
  const nombreLugarRecolectores = await pool.query('SELECT nombreLugar FROM perfilreciclador WHERE id = ?', [recicladorId]);
  var nombreLugarRecolector = Object.values(nombreLugarRecolectores[0])[0];
  nombreLugarRecolector = nombreLugarRecolector.nombreLugar

  console.log(nombreLugarRecolector)



   //Obtener precio de la entrega de la recolecta en la tabla de recolecta
   const precio = await pool.query('SELECT precio FROM recolecta WHERE id = ?', [recoleccion]);
   var billete = Object.values(precio[0])[0];
   billete = billete.precio
 
   console.log(billete)


   //Obtener precio de la entrega de la recolecta en la tabla de recolecta
   const precioSugerido = await pool.query('SELECT precioSugerido FROM solicitudes WHERE id = ?', [id]);
   var billeteSugerido = Object.values(precioSugerido[0])[0];
   billeteSugerido = billeteSugerido.precioSugerido

   var precioFijo;
   if(billeteSugerido > 0){
    precioFijo = billeteSugerido
   }else{
    precioFijo = billete
   }

  console.log("Tabla de pefilReciclador******************************************************************************pefilReciclador")

  const recolectaAsginada = {
    idSolicitud: id,
    idReciclador: recicladorId,
    idRecolector: recolector,
    horario: tiempo,
    fecha: date,
    material: elementos,
    nombreEntrega: encargEntrega,
    cantidad: peso,
    precio: precioFijo,
    toxico: ticixo,
    clasificacion: clasif,
    limpio: limpoi,
    administradorRecolecta: administrador,
    administradorTelefono: tellAdministrador,
    tipoDeRecoleccion: tipoRecoleccion,
    direccion: lugar,
    nombreLugarRecoleccion: nombreLugarRecoleccion,
    estado: 'Asignada',
    nombreRecibe: 'Pendiente',
  };
  await pool.query("INSERT INTO recoleccionesasignadas set ?", [recolectaAsginada]);

  const recolectaAceptada = {
    idSolicitud: id,
    idReciclador: recicladorId,
    idRecolector: recolector,
    horario: tiempo,
    fecha: date,
    material: elementos,
    nombreRecibe: 'Pendiente',
    cantidad: peso,
    precio: precioFijo,
    toxico: ticixo,
    clasificacion: clasif,
    limpio: limpoi,
    administradorRecoleccion: encargEntrega,
    administradorTelefono: tellAdministradorRecolector,
    direccion: lugarRecolectores,
    nombreLugarRecolectores: nombreLugarRecolector,
    estado: 'Asignada',
  };
  await pool.query("INSERT INTO recoleccionespendientes set ?", [recolectaAceptada]);
  req.flash("success", "Aceptaste la recoleccion de ", nombreLugarRecolector);
  res.redirect("/links/recolectasAceptadas");
};

//rechazar la solicitud
export const rechazarSolicitud = async (req, res) => {
  const { id } = req.params;
  await pool.query("UPDATE solicitudes set estado = 'Rechazada' WHERE id = ?", [id]);
  const idSolicitud = await pool.query('SELECT idRecolecta FROM solicitudes WHERE id = ?', [id]);
  var solictud = Object.values(idSolicitud[0])[0];
  var numeroSolicitud = parseInt(JSON.stringify(solictud.idRecolecta));
  console.log(numeroSolicitud)
  res.redirect("/links/solicitudesRequeridas/" + numeroSolicitud);
};

//Observar recolecciones Aceptadas
export const RecoleccionesAceptadas = async (req, res) => {
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    var idReciclador = Object.values(reciclador[0])[0];
    var idReciclador2 = parseInt(JSON.stringify(idReciclador.id));
    const [recolecciones] = await pool.query("SELECT * FROM recoleccionesasignadas WHERE idReciclador = ?", [idReciclador2]);
    res.render("links/recoleccionesAsignadas", { recolectaAceptadas: recolecciones });
  } else if (recolector[0].length > 0) {
    var idRecolector = Object.values(recolector[0])[0];
    var idRecolector2 = parseInt(JSON.stringify(idRecolector.id));
    const [recolecciones] = await pool.query("SELECT * FROM recoleccionespendientes WHERE idRecolector = ?", [idRecolector2]);
    res.render("links/recoleccionesPendientes", { recolectasAceptadas: recolecciones });
  } else {
    req.flash("message", "Para usar este panel debes crear tu perfil como reciclador o recolector");
    res.redirect("/profile");
  }
};

//Escribir el encargado de la recolección
export const encargadoRecolector = async (req, res) => {
  const { nombreEncargado } = req.body;
  const { id } = req.params;
  const idSolicitud = await pool.query('SELECT idSolicitud FROM recoleccionesasignadas WHERE id = ?', [id]);
  var solictud = Object.values(idSolicitud[0])[0];
  var numeroSolicitud = parseInt(JSON.stringify(solictud.idSolicitud));
  await pool.query("UPDATE recoleccionespendientes set nombreRecibe = ? WHERE idSolicitud = ?", [nombreEncargado, numeroSolicitud]);
  await pool.query("UPDATE recoleccionesasignadas set nombreRecibe = ? WHERE idSolicitud = ?", [nombreEncargado, numeroSolicitud]);
  req.flash("success", "Asignaste a ", nombreEncargado, " para la recoleccion.");
  res.redirect("/links/recolectasAceptadas");
};

//Añadir administrador
export const addAdministrador = async (req, res) => {
  const { idUser, nombre, apellido, identificacion, nivel } = req.body;
  console.log(idUser, nombre, apellido, identificacion, nivel)
  const newAdministrador = {
    idUser,
    nombre,
    apellido,
    identificacion,
    nivel,
  };
  await pool.query("INSERT INTO perfiladministradores set ?", [newAdministrador]);
  req.flash("success", "Administrador agregado exitosamente");
  res.redirect("/profile");
};

//Observar Lista de usuarios
export const listaUsuarios = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [usuarios] = await pool.query("SELECT * FROM users");
    res.render("links/listaUsers", { usuarios });
  } else {
    res.render("profile");
  }
};

//Eliminar Usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE ID = ?", [id]);
  req.flash("success", "usuario Eliminado");
  res.redirect("/links/listaUsers");
};

//Observar Lista de Recolectores
export const listaUsuariosRecolectores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [usuariosRecolectores] = await pool.query("SELECT * FROM perfilrecolector");
    res.render("links/listaRecolectores", { usuariosRecolectores });
  } else {
    res.render("profile");
  }
};

//Eliminar Usuario Recolector
export const eliminarUsuarioRecolector = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM perfilrecolector WHERE ID = ?", [id]);
  req.flash("success", "Recolector Eliminado");
  res.redirect("/links/listaRecolectores");
};

//Observar Lista de Recicladores
export const listaUsuariosRecicladores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [usuariosRecicladores] = await pool.query("SELECT * FROM perfilreciclador");
    res.render("links/listaRecicladores", { usuariosRecicladores });
  } else {
    res.render("profile");
  }
};

//Eliminar Usuario Reciclador
export const eliminarUsuarioReciclador = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM perfilreciclador WHERE ID = ?", [id]);
  req.flash("success", "Reciclador Eliminado");
  res.redirect("/links/listaRecicladores");
};

//Observar Lista de Recolectas registradas
export const listaRecolectas = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [recolectas] = await pool.query("SELECT * FROM recolecta");
    res.render("links/listaRecolecta", { recolectas });
  } else {
    res.render("profile");
  }
};

//Eliminar Recolecta
export const eliminarRecolecta = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM recolecta WHERE ID = ?", [id]);
  req.flash("success", "recolecta Eliminada");
  res.redirect("/links/listaRecolecta");
};

//Observar Lista de administradores
export const listAdministradores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [administradores] = await pool.query("SELECT * FROM perfiladministradores");
    res.render("links/listaAdmins", { administradores });
  } else {
    res.render("profile");
  }
};

//Editar Nivel Administrador
export const editarNivel = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const { id } = req.params;
    const { nivel } = req.body;
    await pool.query("UPDATE perfiladministradores set nivel = ? WHERE id = ?", [nivel, id]);
    req.flash("success", "Administrador Actualizado Correctamente");
    res.redirect("/links/listaAdmins");
  } else {
    res.render("profile");
  }
};

//Eliminar administrador
export const eliminarAdmin = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM perfiladministradores WHERE ID = ?", [id]);
  req.flash("success", "Administrador Eliminado");
  res.redirect("/links/listaAdmins");
};

//Ver detalles de la recoleccion seleccionada
export const detallesRecoleccion = async (req, res) => {
  const { id } = req.params;
  const idRecoleccion = await pool.query('SELECT idRecolecta FROM solicitudes WHERE id = ?', [id]);
  var recoleccion = Object.values(idRecoleccion[0])[0];
  var numRecolecta = parseInt(JSON.stringify(recoleccion.idRecolecta));

  const [DetallesRecolecta] = await pool.query("SELECT * FROM recolecta WHERE id = ?", [numRecolecta]);
  console.log(DetallesRecolecta[0])
  if(DetallesRecolecta.length > 0){
    res.render("links/detallesRecoleccion", { recoleccionD: DetallesRecolecta[0] });
  }else{
    req.flash("message", "Se ha eliminado esta recolección");
    res.redirect("/links/recolectas");
  }
};

//Editar fecha de la recolección
export const editarFechaDeRecoleccion = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  const estadoRecoleccion = await pool.query('SELECT estado FROM solicitudes WHERE idRecolecta = ?', [id]);
  var estado = Object.values(estadoRecoleccion[0])[0];
  estado = estado.estado

  if (estado == 'Aceptada' || estado == 'Rechazada') {
    req.flash("message", "No puedes editar la fecha de esta recolección ya esta ", estado);
    res.redirect("/links/recolectas");
  } else {
    const { fechaRecoleccion, horario } = req.body;
    const solicitudEditada = {
      fechaRecoleccion,
      horario,
    };
    await pool.query("UPDATE solicitudes set ? WHERE id = ?", [solicitudEditada, id]);
    req.flash("success", "Editaste tu fecha de recolección para el ", fechaRecoleccion, "a las ",horario);
    res.redirect("/links/recolectas");
  }
};


//Observar Lista de recolecciones pendientes de las instituciones
export const listRecoleccionesPendientes = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [pendientes] = await pool.query("SELECT * FROM recoleccionespendientes");
    res.render("links/listaRecoPendientes", { pendientes });
  } else {
    res.render("profile");
  }
};

//Observar Lista de recolecciones asignadas
export const listRecoleccionesAsignadas = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [asignadas] = await pool.query("SELECT * FROM recoleccionesasignadas");
    res.render("links/listaRecoAsignadas", { asignadas });
  } else {
    res.render("profile");
  }
};

//Observar Lista de solicitudes
export const listaDeSolicitudes = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [solicitudes] = await pool.query("SELECT * FROM solicitudes");
    res.render("links/listaSolicitudes", { solicitudes });
  } else {
    res.render("profile");
  }
};

//Observar todos los comentarios de los recolectores
export const comentariosRecolectores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [coments] = await pool.query("SELECT * FROM comentariosrecolector");
    res.render("links/listaComentsRecolectores", { coments });
  } else {
    res.render("profile");
  }
};

//Observar todos los comentarios de los recicladores
export const comentariosRecicladores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [coments] = await pool.query("SELECT * FROM comentarioreciclador");
    res.render("links/listaComentsReciclador", { coments });
  } else {
    res.render("profile");
  }
};

//Observar todas las listas de de los recolectores
export const realizadasRecolectores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [listaDoneRe] = await pool.query("SELECT * FROM listarealizadasrecolector");
    res.render("links/listaRecoleccionesRealizadasRecolectores", { listaDoneRe });
  } else {
    res.render("profile");
  }
};

//Observar todas las listas de de los recicladores
export const realizadasRecicladores = async (req, res) => {
  const admi = req.user.id;
  const admin = await pool.query("SELECT id FROM perfiladministradores WHERE idUser = ?", [admi]);
  if (admin.length > 0) {
    const [listaDoneRe] = await pool.query("SELECT * FROM listarealizadasreciclador");
    res.render("links/listaRecoleccionesRealizadasRecicladores", { listaDoneRe });
  } else {
    res.render("profile");
  }
};

//Eliminar Solicitud
export const eliminarSolicitud = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM solicitudes WHERE ID = ?", [id]);
  req.flash("success", "Solicitud eliminada");
  res.redirect("/links/listaSolicitudes");
};

//Vista para la calificacion del reciclador
export const calificacionReciclador = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const [recoleccionPendiente] = await pool.query("SELECT * FROM recoleccionespendientes WHERE id = ?", [id]);
  res.render("links/calificarReciclador", { recoleccionPendiente });
};

//calificar recilclador
export const recicladorCalificacion = async (req, res) => {
  const { id } = req.params;

  console.log(id)

  const { estrellas, comentario } = req.body;

  const idReciclador = await pool.query('SELECT idReciclador FROM recoleccionespendientes WHERE id = ?', [id]);
  var identificacion = Object.values(idReciclador[0])[0];
  identificacion = parseInt(JSON.stringify(identificacion.idReciclador));

   const time = await pool.query('SELECT horario FROM recoleccionespendientes WHERE id = ?', [id]);
   var horario = Object.values(time[0])[0];
   horario = horario.horario

   const date = await pool.query('SELECT fecha FROM recoleccionespendientes WHERE id = ?', [id]);
   var fecha = Object.values(date[0])[0];
   fecha = fecha.fecha

   const elements = await pool.query('SELECT material FROM recoleccionespendientes WHERE id = ?', [id]);
   var material = Object.values(elements[0])[0];
   material = material.material

   const dueno = await pool.query('SELECT nombreRecibe FROM recoleccionespendientes WHERE id = ?', [id]);
   var encargado = Object.values(dueno[0])[0];
   encargado = encargado.nombreRecibe

   const bulto = await pool.query('SELECT cantidad FROM recoleccionespendientes WHERE id = ?', [id]);
   var cantidad = Object.values(bulto[0])[0];
   cantidad = cantidad.cantidad

   const money = await pool.query('SELECT precio FROM recoleccionespendientes WHERE id = ?', [id]);
   var precioReciclador = Object.values(money[0])[0];

   precioReciclador = parseInt(precioReciclador.precio);

   const newListCalificacionReciclador = {
    identificacion,
    horario,
    fecha,
    material,
    encargado,
    cantidad,
    precioReciclador,
    estrellas,
  };
  console.log(newListCalificacionReciclador)

  await pool.query("INSERT INTO listaRealizadasReciclador set ?", [newListCalificacionReciclador]);

  const comentarioReciclador = {
    identificacion,
    comentario,
  };

  if(comentario.length > 0){
    await pool.query("INSERT INTO comentarioreciclador set ?", [comentarioReciclador])
  }

  const estrellasReciclador = await pool.query("SELECT estrellas FROM perfilreciclador WHERE id = ?", [identificacion]);
  const votantesReciclador = await pool.query("SELECT votantes FROM perfilreciclador WHERE id = ?", [identificacion]);
  var vtReciclador = Object.values(votantesReciclador[0])[0];
  var estReciclador = Object.values(estrellasReciclador[0])[0];

  vtReciclador = parseInt(JSON.stringify(vtReciclador.votantes));

  estReciclador = parseInt(JSON.stringify(estReciclador.estrellas));

  const estelllasR = parseInt(estrellas)

  const sum = estReciclador + estelllasR;
  const votantes = vtReciclador + 1;

  await pool.query("UPDATE perfilreciclador set votantes = ? WHERE id = ?", [votantes, identificacion]);
  await pool.query("UPDATE perfilreciclador set estrellas = ? WHERE id = ?", [sum, identificacion]);

  //Borrar la solicitud de la pantalla del reciclador
  const Solicitud = await pool.query('SELECT idSolicitud FROM recoleccionespendientes WHERE id = ?', [id]);
  var idSoli = Object.values(Solicitud[0])[0];
  idSoli = parseInt(JSON.stringify(idSoli.idSolicitud));

  const recollecta = await pool.query('SELECT idRecolecta FROM solicitudes WHERE id = ?', [idSoli]);
  var idRecollecta = Object.values(recollecta[0])[0];
  idRecollecta = parseInt(JSON.stringify(idRecollecta.idRecolecta));

  await pool.query("DELETE FROM recolecta WHERE ID = ?", [idRecollecta]);

  await pool.query("DELETE FROM solicitudes WHERE ID = ?", [idSoli]);


  await pool.query("DELETE FROM recoleccionespendientes WHERE ID = ?", [id]);

  req.flash("success", "Esperamos que te haya servido");
  res.redirect("/links/recolectasAceptadas");

};

//Vista para la calificacion del recolector
export const calificacionRecolector = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const [recoleccionAsignada] = await pool.query("SELECT * FROM recoleccionesasignadas WHERE id = ?", [id]);
  res.render("links/calificarRecolector", { recoleccionAsignada });
};

//calificar recolector
export const recolectorCalificacion = async (req, res) => {
  const { id } = req.params;
  const { estrellas, comentario } = req.body;

  const idRecolector = await pool.query('SELECT idRecolector FROM recoleccionesasignadas WHERE id = ?', [id]);

  var identificacion = Object.values(idRecolector[0])[0];
  identificacion = parseInt(JSON.stringify(identificacion.idRecolector));


  const time = await pool.query('SELECT horario FROM recoleccionesasignadas WHERE id = ?', [id]);
   var horario = Object.values(time[0])[0];
   horario = horario.horario

   const date = await pool.query('SELECT fecha FROM recoleccionesasignadas WHERE id = ?', [id]);
   var fecha = Object.values(date[0])[0];
   fecha = fecha.fecha

   const elements = await pool.query('SELECT material FROM recoleccionesasignadas WHERE id = ?', [id]);
   var material = Object.values(elements[0])[0];
   material = material.material

   const dueno = await pool.query('SELECT nombreEntrega FROM recoleccionesasignadas WHERE id = ?', [id]);
   var encargado = Object.values(dueno[0])[0];
   encargado = encargado.nombreEntrega

   const bulto = await pool.query('SELECT cantidad FROM recoleccionesasignadas WHERE id = ?', [id]);
   var cantidad = Object.values(bulto[0])[0];
   cantidad = cantidad.cantidad

   const money = await pool.query('SELECT precio FROM recoleccionesasignadas WHERE id = ?', [id]);
   var precioRecolector = Object.values(money[0])[0];

   precioRecolector = parseInt(precioRecolector.precio);

   const newListCalificacionRecolector = {
    identificacion,
    horario,
    fecha,
    material,
    encargado,
    cantidad,
    precioRecolector,
    estrellas,
  };

  await pool.query("INSERT INTO listaRealizadasRecolector set ?", [newListCalificacionRecolector]);

  const comentarioRecolector = {
    identificacion,
    comentario,
  };

  if(comentario.length > 0){
    await pool.query("INSERT INTO comentariosrecolector set ?", [comentarioRecolector])
  }

  const estrellasReccolector = await pool.query("SELECT estrellas FROM perfilrecolector WHERE id = ?", [identificacion]);
  const votantesRecolector = await pool.query("SELECT votantes FROM perfilrecolector WHERE id = ?", [identificacion]);
  
  var vtRecolector = Object.values(votantesRecolector[0])[0];
  var estRecolector = Object.values(estrellasReccolector[0])[0];

  vtRecolector = parseInt(JSON.stringify(vtRecolector.votantes));

  estRecolector = parseInt(JSON.stringify(estRecolector.estrellas));
  const estelllasR = parseInt(estrellas)

  const sum = estRecolector + estelllasR;
  const votantes = vtRecolector + 1;

  await pool.query("UPDATE perfilrecolector set votantes = ? WHERE id = ?", [votantes, identificacion]);
  await pool.query("UPDATE perfilrecolector set estrellas = ? WHERE id = ?", [sum, identificacion]);

  await pool.query("DELETE FROM recoleccionesasignadas WHERE ID = ?", [id]);

  req.flash("success", "Esperamos que te haya servido");
  res.redirect("/links/recolectasAceptadas");

};

//Observar Listas De recolecciones
export const listaRecoleccionesDone = async (req, res) => {
  const reciclador = await pool.query('SELECT id FROM perfilreciclador WHERE idUsuario = ?', [req.user.id]);
  const recolector = await pool.query('SELECT id FROM perfilrecolector WHERE idUsuario = ?', [req.user.id]);
  if (reciclador[0].length > 0) {
    var idReciclador = Object.values(reciclador[0])[0];
    var idReciclador2 = parseInt(JSON.stringify(idReciclador.id));
    const [recolecciones] = await pool.query("SELECT * FROM listarealizadasreciclador WHERE identificacion = ?", [idReciclador2]);
    res.render("links/listaRecicladorRecolectasRealizadas", { recolecciones });
  } else if (recolector[0].length > 0) {
    var idRecolector = Object.values(recolector[0])[0];
    var idRecolector2 = parseInt(JSON.stringify(idRecolector.id));
    const [recolecciones] = await pool.query("SELECT * FROM listarealizadasrecolector WHERE identificacion = ?", [idRecolector2]);
    res.render("links/listaRecolectorRealizadas", { recolecciones });
  } else {
    req.flash("message", "Para usar este panel debes crear tu perfil como reciclador o recolector");
    res.redirect("/profile");
  }
};

//Observar Comentarios del recolector.
export const comentsRecolector = async (req, res) => {
  const { id } = req.params;
  const [comentariosRecolector] = await pool.query("SELECT * FROM comentariosrecolector WHERE identificacion = ?", [id]);
  res.render("links/comentsRecolector", { comentariosRecolector });
};

//Observar Comentarios del reciclador.
export const comentsReciclador = async (req, res) => {
  const { id } = req.params;
  const [comentariosReciclador] = await pool.query("SELECT * FROM comentarioReciclador WHERE identificacion = ?", [id]);
  res.render("links/comentsReciclador", { comentariosReciclador });
};

