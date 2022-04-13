CREATE DATABASE renobas;

USE renobas;

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-03-2022 a las 01:58:35
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `renobas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarioreciclador`
--

CREATE TABLE `comentarioreciclador` (
  `id` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `comentario` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentariosrecolector`
--

CREATE TABLE `comentariosrecolector` (
  `id` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `comentario` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listarealizadasreciclador`
--

CREATE TABLE `listarealizadasreciclador` (
  `id` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `encargado` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `precioReciclador` int(100) NOT NULL,
  `estrellas` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listarealizadasrecolector`
--

CREATE TABLE `listarealizadasrecolector` (
  `id` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `encargado` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `precioRecolector` int(11) NOT NULL,
  `estrellas` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfiladministradores`
--

CREATE TABLE `perfiladministradores` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `identificacion` varchar(100) NOT NULL,
  `nivel` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `perfiladministradores`
--

INSERT INTO `perfiladministradores` (`id`, `idUser`, `nombre`, `apellido`, `identificacion`, `nivel`) VALUES
(1, 13, 'Henry Asdrubal', 'Rodriguez Morales', '1000086030', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilreciclador`
--

CREATE TABLE `perfilreciclador` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `telefono` varchar(150) NOT NULL,
  `ciudad` varchar(150) NOT NULL,
  `identificacion` varchar(150) NOT NULL,
  `edad` int(11) NOT NULL,
  `departamento` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `nombreLugar` varchar(150) NOT NULL,
  `barrio` varchar(100) NOT NULL,
  `estrellas` int(11) NOT NULL,
  `votantes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfilrecolector`
--

CREATE TABLE `perfilrecolector` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `telefono` varchar(150) NOT NULL,
  `ciudad` varchar(150) NOT NULL,
  `identificacion` varchar(150) NOT NULL,
  `edad` int(11) NOT NULL,
  `departamento` varchar(150) NOT NULL,
  `lugar` varchar(150) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `nombreLugar` varchar(150) NOT NULL,
  `barrio` varchar(100) NOT NULL,
  `votantes` int(11) NOT NULL,
  `estrellas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recoleccionesasignadas`
--

CREATE TABLE `recoleccionesasignadas` (
  `id` int(11) NOT NULL,
  `idSolicitud` int(11) NOT NULL,
  `idRecolector` int(11) NOT NULL,
  `idReciclador` int(11) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `nombreEntrega` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `precio` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `toxico` varchar(100) NOT NULL,
  `clasificacion` varchar(100) NOT NULL,
  `limpio` varchar(100) NOT NULL,
  `administradorRecolecta` varchar(100) NOT NULL,
  `administradorTelefono` varchar(100) NOT NULL,
  `tipoDeRecoleccion` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `nombreLugarRecoleccion` varchar(100) NOT NULL,
  `nombreRecibe` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recoleccionespendientes`
--

CREATE TABLE `recoleccionespendientes` (
  `id` int(11) NOT NULL,
  `idSolicitud` int(11) NOT NULL,
  `idReciclador` int(11) NOT NULL,
  `idRecolector` int(11) NOT NULL,
  `horario` varchar(100) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `nombreRecibe` varchar(100) NOT NULL,
  `cantidad` varchar(100) NOT NULL,
  `precio` varchar(100) NOT NULL,
  `toxico` varchar(100) NOT NULL,
  `clasificacion` varchar(100) NOT NULL,
  `limpio` varchar(100) NOT NULL,
  `administradorRecoleccion` varchar(100) NOT NULL,
  `administradorTelefono` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `nombreLugarRecolectores` varchar(100) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recolecta`
--

CREATE TABLE `recolecta` (
  `id` int(11) NOT NULL,
  `idRecolector` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `fecha1` varchar(100) NOT NULL,
  `fecha2` varchar(100) NOT NULL,
  `horario1` varchar(150) NOT NULL,
  `horario2` varchar(150) NOT NULL,
  `materiales` varchar(150) NOT NULL,
  `cantidad` varchar(150) NOT NULL,
  `estado` varchar(150) NOT NULL,
  `precio` int(11) NOT NULL,
  `toxico` varchar(2) NOT NULL,
  `clasificado` varchar(2) NOT NULL,
  `limpio` varchar(2) NOT NULL,
  `barrio` varchar(100) NOT NULL,
  `status` int(2) NOT NULL,
  `ponderado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('5oyVHXTu_zE6ofrXmFsghSJ7YhLtMQsS', 1648340323, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":8}}'),
('OjWMOLZkRQP6z1gnDW_Tsuj9pt-lNHh9', 1648342111, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('Rypux2u1ZY2TRCwNqyC_SId67NxcNlIn', 1648342102, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('UQ_ezYiN1QUPg6VxfH7AivwaBWASTKCi', 1648324915, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('_hBvGZ2bpDSMPMZNuT2MvYbrkUiOUInj', 1648260135, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":8}}'),
('m6roE_oY1JssovVxneZsEQrfSJT6Z96f', 1648324911, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('mc6RhQhB3yj4s_GcZtRR1ZL184GxV40N', 1648260130, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":10}}'),
('p0sC5OA_btp95rOMwFhznbV0KNVRjXiW', 1648342108, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('rm73V8FZ9ejP6jrGx5JxUrHAZ5ocgnc_', 1648324913, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('vHeYNMu50-pyJQRoTCERiiR7tDLxBo2w', 1648257682, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":8}}'),
('x3pYYwbO4AxX_TbZmx5vZfrVPc7GXT3e', 1648342106, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('zeNB3iS_tvOGsyWOg3X3A6ofa7mNEFE2', 1648339974, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":10}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL,
  `idReciclador` int(11) NOT NULL,
  `idRecolecta` int(11) NOT NULL,
  `nombreLugar` varchar(100) NOT NULL,
  `fechaRecoleccion` varchar(100) NOT NULL,
  `material` varchar(100) NOT NULL,
  `horario` time NOT NULL,
  `estado` varchar(100) NOT NULL,
  `precioSugerido` int(100) DEFAULT NULL,
  `comentario` varchar(100) DEFAULT NULL,
  `ponderadoReciclador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(13, 'Administrador22', '$2a$10$NRND2Xt/woI/Z8Wmd7Yld.kN.N3LnPx9J6AtPaCqb.peecAPS/Ldy', 'Administrador22@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarioreciclador`
--
ALTER TABLE `comentarioreciclador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idReciclador` (`identificacion`);

--
-- Indices de la tabla `comentariosrecolector`
--
ALTER TABLE `comentariosrecolector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idRecolector` (`identificacion`) USING BTREE;

--
-- Indices de la tabla `listarealizadasreciclador`
--
ALTER TABLE `listarealizadasreciclador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `identificacion` (`identificacion`);

--
-- Indices de la tabla `listarealizadasrecolector`
--
ALTER TABLE `listarealizadasrecolector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `identificacion` (`identificacion`);

--
-- Indices de la tabla `perfiladministradores`
--
ALTER TABLE `perfiladministradores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`);

--
-- Indices de la tabla `perfilreciclador`
--
ALTER TABLE `perfilreciclador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usario-reciclador` (`idUsuario`);

--
-- Indices de la tabla `perfilrecolector`
--
ALTER TABLE `perfilrecolector`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`idUsuario`);

--
-- Indices de la tabla `recoleccionesasignadas`
--
ALTER TABLE `recoleccionesasignadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSolicitud` (`idSolicitud`);

--
-- Indices de la tabla `recoleccionespendientes`
--
ALTER TABLE `recoleccionespendientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSolicitud` (`idSolicitud`);

--
-- Indices de la tabla `recolecta`
--
ALTER TABLE `recolecta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recolector` (`idRecolector`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idReciclador` (`idReciclador`),
  ADD KEY `idRecolecta` (`idRecolecta`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarioreciclador`
--
ALTER TABLE `comentarioreciclador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `comentariosrecolector`
--
ALTER TABLE `comentariosrecolector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `listarealizadasreciclador`
--
ALTER TABLE `listarealizadasreciclador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `listarealizadasrecolector`
--
ALTER TABLE `listarealizadasrecolector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `perfiladministradores`
--
ALTER TABLE `perfiladministradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `perfilreciclador`
--
ALTER TABLE `perfilreciclador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `perfilrecolector`
--
ALTER TABLE `perfilrecolector`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `recoleccionesasignadas`
--
ALTER TABLE `recoleccionesasignadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recoleccionespendientes`
--
ALTER TABLE `recoleccionespendientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recolecta`
--
ALTER TABLE `recolecta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarioreciclador`
--
ALTER TABLE `comentarioreciclador`
  ADD CONSTRAINT `comentarioreciclador_ibfk_1` FOREIGN KEY (`identificacion`) REFERENCES `perfilreciclador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentariosrecolector`
--
ALTER TABLE `comentariosrecolector`
  ADD CONSTRAINT `comentariosrecolector_ibfk_1` FOREIGN KEY (`identificacion`) REFERENCES `perfilrecolector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listarealizadasreciclador`
--
ALTER TABLE `listarealizadasreciclador`
  ADD CONSTRAINT `listarealizadasreciclador_ibfk_1` FOREIGN KEY (`identificacion`) REFERENCES `perfilreciclador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `listarealizadasrecolector`
--
ALTER TABLE `listarealizadasrecolector`
  ADD CONSTRAINT `listarealizadasrecolector_ibfk_1` FOREIGN KEY (`identificacion`) REFERENCES `perfilrecolector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perfiladministradores`
--
ALTER TABLE `perfiladministradores`
  ADD CONSTRAINT `administradores` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perfilreciclador`
--
ALTER TABLE `perfilreciclador`
  ADD CONSTRAINT `usario-reciclador` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `perfilrecolector`
--
ALTER TABLE `perfilrecolector`
  ADD CONSTRAINT `usuario-recolector` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recolecta`
--
ALTER TABLE `recolecta`
  ADD CONSTRAINT `recolecta` FOREIGN KEY (`idRecolector`) REFERENCES `perfilrecolector` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitud` FOREIGN KEY (`idReciclador`) REFERENCES `perfilreciclador` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
