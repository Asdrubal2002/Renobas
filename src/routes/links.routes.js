import { Router } from "express";
import { isLoggedIn } from "../lib/auth";
import {
  renderRecolector,
  addRecolector,
  renderReciclador,
  addReciclador,
  rendercuenta,
  editoCuenta,
  renderRecolecciones,
  renderAddRecoleccion,
  addRecoleccion,
  deleteRecoleccion,
  renderEditaRecoleccion,
  editRecolecciones,
  renderSearchRecolectas,
  obtenerRecoleccion,
  solicitarRecoleccion,
  solictudReciclador,
  deleteSolicitud,
  aceptaSolicitud,
  RecoleccionesAceptadas,

  encargadoRecolector,

  rechazarSolicitud,
  addAdministrador,

  listaUsuarios,

  eliminarUsuario,

  listaUsuariosRecolectores,

  eliminarUsuarioRecolector,

  listaUsuariosRecicladores,

  eliminarUsuarioReciclador,

  listaRecolectas,

  eliminarRecolecta,

  listAdministradores,

  editarNivel,
  eliminarAdmin,

  detallesRecoleccion,

  editarFechaDeRecoleccion,

  listRecoleccionesPendientes,

  listRecoleccionesAsignadas,

  listaDeSolicitudes,

  eliminarSolicitud,

  calificacionReciclador,

  recicladorCalificacion,

  calificacionRecolector,

  recolectorCalificacion,

  listaRecoleccionesDone,

  comentsRecolector,

  comentsReciclador,

  comentariosRecolectores,

  comentariosRecicladores,

  realizadasRecolectores,

  realizadasRecicladores,

  aprenderExpress,


} from "../controllers/links.controller";

const router = Router();
// Authorization
router.use(isLoggedIn);

//Añadir el perfil del recolector
//Añadir el perfil del reciclador
//Editar Perfil

// Routes

//Añadir el perfil del recolector
router.get("/recolector", renderRecolector);
router.post("/recolector", addRecolector);

//Añadir el perfil del reciclador
router.get("/reciclador", renderReciclador)
router.post("/reciclador", addReciclador);

//Editar Perfil
router.get("/cuenta", rendercuenta);
router.post("/editoPerfil", editoCuenta);

//Observar recolecciones
router.get("/recolectas", renderRecolecciones);


//Agregar Recolecciones
router.get("/addRecoleccion", renderAddRecoleccion);
router.post("/addRecoleccion", addRecoleccion);

//Eliminar Recoleccion
router.get("/deleteRecoleccion/:id", deleteRecoleccion);

//Editar Recoleccion
router.get("/editRecolecta/:id", renderEditaRecoleccion);
router.post("/editRecolecta/:id", editRecolecciones);

//Buscar Recoleccion
router.post("/busqueR", renderSearchRecolectas);

//Obtener Recolección
router.get("/obtenerRecolecta/:id", obtenerRecoleccion)
router.post("/obtenerRecolecta/:id", solicitarRecoleccion);

//Solicitudes por parte del reciclador
router.get("/solicitudesRequeridas/:id", solictudReciclador);

//Eliminar Solicitudes
router.get("/deleteSolicitudes/:id", deleteSolicitud);

//Aceptar la solicitud
router.get("/aceptar/:id", aceptaSolicitud);

//Rechazar la solicitud
router.get("/rechazar/:id", rechazarSolicitud);

//Observar recolecciones
router.get("/recolectasAceptadas", RecoleccionesAceptadas);

//Aceptar la solicitud
router.post("/encargado/:id", encargadoRecolector);

//Añadir administrador
router.post("/addAmin", addAdministrador);

//Observar Lista de usuarios
router.get("/listaUsers", listaUsuarios);

//Eliminar Usuario
router.get("/deleteUser/:id", eliminarUsuario);

//Observar Lista de Recolectores
router.get("/listaRecolectores", listaUsuariosRecolectores);

//Eliminar Usuario Recolector
router.get("/deleteUserRecolector/:id", eliminarUsuarioRecolector);

//Observar Lista de Recicladores
router.get("/listaRecicladores", listaUsuariosRecicladores);

//Eliminar Usuario Recolector
router.get("/deleteUserReciclador/:id", eliminarUsuarioReciclador);


//Observar Lista de Recolectas
router.get("/listaRecolectas", listaRecolectas);

//Eliminar Recolectas
router.get("/deleteRecolecta/:id", eliminarRecolecta);

//Observar Lista de administradores
router.get("/listaAdmins", listAdministradores);

//Editar Nivel administrador
router.post("/editLevel/:id", editarNivel);

//Eliminar Administrador
router.get("/deleteAdmin/:id", eliminarAdmin);

//Ver detalles de la recoleccion seleccionada
router.get("/detelles/:id", detallesRecoleccion);

//Editar fecha de la recolección
router.post("/editarFecha/:id", editarFechaDeRecoleccion);

//Observar Lista de administradores
router.get("/listaPendientes", listRecoleccionesPendientes);

//Observar Lista de recolecciones pendientes de las instituciones
router.get("/listaPendientes", listRecoleccionesPendientes);

//Observar Lista de recolecciones asignadas
router.get("/listaAsignadas", listRecoleccionesAsignadas);

//Observar Lista de recolecciones solicitudes
router.get("/listaSolicitudes", listaDeSolicitudes);

//Observar todos los comentarios de los recolectores
router.get("/listaComentsRecolectores", comentariosRecolectores);

//Observar todos los comentarios de los recicladores
router.get("/listaComentsRecicladores", comentariosRecicladores);

//Observar todas las recolecciones de los recolectores
router.get("/listaRealizadasRecolectores", realizadasRecolectores);

//Observar todas las recolecciones de los recicladores
router.get("/listaRealizadasRecicladores", realizadasRecicladores);



//Eliminar Solicitud
router.get("/eliminarSolicitud/:id", eliminarSolicitud);

//Vista para la calificación al reciclador
router.get("/calificacionReciclador/:id", calificacionReciclador);

//calificar recilclador
router.post("/recicladorCalificacion/:id", recicladorCalificacion);

//Vista para la calificación al recolector
router.get("/calificacionRecolector/:id", calificacionRecolector);

//calificar recolector
router.post("/calificacionRecolector/:id", recolectorCalificacion);

//Observar Listas De recolecciones
router.get("/listasRecoleccionesRealizadas", listaRecoleccionesDone);

//Observar Comentarios del recolector.
router.get("/comentsRecolector/:id", comentsRecolector);

//Observar Comentarios del recolector.
router.get("/comentsReciclador/:id", comentsReciclador);






export default router;
