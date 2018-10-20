-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.36-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para silub
CREATE DATABASE IF NOT EXISTS `silub` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `silub`;

-- Volcando estructura para tabla silub.bodega
CREATE TABLE IF NOT EXISTS `bodega` (
  `id_bodega` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_bodega`),
  UNIQUE KEY `descripcion_UNIQUE` (`descripcion`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.bodega: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT IGNORE INTO `bodega` (`id_bodega`, `descripcion`, `estado`) VALUES
	(1, 'LABORATORIO DE ELECTRONICA', 'ACTIVO'),
	(2, 'LABORATORIO DE FISICA', 'ACTIVO'),
	(3, 'pruebaupdate', 'ELIMINADO'),
	(4, 'dfghj', 'ELIMINADO'),
	(5, 'asdf', 'ELIMINADO'),
	(6, 'ASDFASDF', 'ELIMINADO'),
	(8, 'dfghjhj', 'ELIMINADO');
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;

-- Volcando estructura para tabla silub.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NOT NULL,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `fk_cliente_persona1_idx` (`id_persona`),
  CONSTRAINT `fk_cliente_persona1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.cliente: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT IGNORE INTO `cliente` (`id_cliente`, `id_persona`, `tipo`) VALUES
	(1, 13, 'AUXILIAR'),
	(2, 14, 'ESTUDIANTE'),
	(3, 15, 'ESTUDIANTE'),
	(4, 28, 'ESTUDIANTE'),
	(5, 33, ''),
	(6, 54, 'DOCENTE');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub.cliente_sancionado
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `cliente_sancionado`(
	IN `_id_cliente` INT
)
BEGIN
SELECT s.*
FROM cliente c, sancion s
WHERE c.id_cliente = _id_cliente
AND s.id_cliente = c.id_cliente
AND s.fecha_fin > CURDATE();
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.delete_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo` INT

)
BEGIN
UPDATE equipo SET estado = 'ELIMINADO' WHERE id_equipo = _id_equipo;
UPDATE tipo_equipo SET total = total-1 WHERE id_tipo_equipo = _id_tipo;
END//
DELIMITER ;

-- Volcando estructura para tabla silub.equipo
CREATE TABLE IF NOT EXISTS `equipo` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_equipo` int(11) NOT NULL,
  `id_estante` int(11) DEFAULT NULL,
  `serial` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `estado_equipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE KEY `serial_UNIQUE` (`serial`),
  KEY `fk_equipo_estante1_idx` (`id_estante`),
  KEY `fk_equipo_nombre_equipo1_idx` (`id_tipo_equipo`),
  CONSTRAINT `fk_equipo_estante1` FOREIGN KEY (`id_estante`) REFERENCES `estante` (`id_estante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipo_nombre_equipo1` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipo_equipo` (`id_tipo_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=ujis;

-- Volcando datos para la tabla silub.equipo: ~14 rows (aproximadamente)
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT IGNORE INTO `equipo` (`id_equipo`, `id_tipo_equipo`, `id_estante`, `serial`, `descripcion`, `fecha_registro`, `estado_equipo`) VALUES
	(2, 1, 1, '1234', 'descripción', '2018-10-20 01:57:15', 'INACTIVO'),
	(3, 2, NULL, '2135324', 'Dispositivo de medición ', '2018-10-17 09:12:08', 'ACTIVO'),
	(5, 2, NULL, '14423', 'Dispositivo de medición', '2018-10-19 16:02:44', 'ACTIVO'),
	(6, 2, NULL, NULL, 'Dispositivo de medición', '2018-10-19 16:02:53', 'ELIMINADO'),
	(7, 2, NULL, NULL, 'Dispositivo de medición', '2018-10-10 08:15:00', 'ELIMINADO'),
	(8, 6, NULL, NULL, 'Tarjeta de programación', '2018-10-10 09:29:47', 'INACTIVO'),
	(9, 6, NULL, NULL, 'Tarjeta de programación', '2018-10-10 09:29:47', 'INACTIVO'),
	(10, 6, NULL, NULL, 'Tarjeta', '2018-10-10 09:34:16', 'INACTIVO'),
	(11, 1, NULL, '45678', 'Medición', '2018-10-10 15:57:04', 'INACTIVO'),
	(12, 1, NULL, '5748634', 'Medición', '2018-10-19 16:01:50', 'ELIMINADO'),
	(13, 1, NULL, NULL, 'Medición', '2018-10-10 09:35:30', 'INACTIVO'),
	(14, 6, NULL, NULL, 'prueba', '2018-10-17 08:53:21', 'ELIMINADO'),
	(15, 1, NULL, NULL, 'prueba', '2018-10-17 09:04:36', 'INACTIVO'),
	(16, 1, NULL, NULL, 'prueba', '2018-10-17 09:04:36', 'INACTIVO');
/*!40000 ALTER TABLE `equipo` ENABLE KEYS */;

-- Volcando estructura para tabla silub.estante
CREATE TABLE IF NOT EXISTS `estante` (
  `id_estante` int(11) NOT NULL AUTO_INCREMENT,
  `id_bodega` int(11) NOT NULL,
  `armario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estante` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado` varchar(45) COLLATE utf8_unicode_ci DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_estante`),
  KEY `fk_estante_bodega1_idx` (`id_bodega`),
  CONSTRAINT `fk_estante_bodega1` FOREIGN KEY (`id_bodega`) REFERENCES `bodega` (`id_bodega`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.estante: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `estante` DISABLE KEYS */;
INSERT IGNORE INTO `estante` (`id_estante`, `id_bodega`, `armario`, `estante`, `descripcion`, `estado`) VALUES
	(1, 1, '1', '1-2', 'Prueba2', 'ACTIVO'),
	(14, 1, '1', '1-1', '', 'ACTIVO'),
	(15, 2, '1', '1-1', '', 'ACTIVO');
/*!40000 ALTER TABLE `estante` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub.get_full_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_full_equipo`(
	IN `_serial` INT



)
BEGIN
DECLARE idestante INT;
SELECT e.id_estante INTO idestante
FROM equipo e
WHERE e.serial = _serial;
IF idestante IS NOT NULL THEN
	SELECT e.*,t.tipo,s.*,b.descripcion as descripcion_bodega 
	FROM equipo e, tipo_equipo t, estante s, bodega b 
	WHERE e.id_tipo_equipo = t.id_tipo_equipo 
	AND e.serial = _serial 
	AND e.estado_equipo != 'ELIMINADO'
	AND e.id_estante = s.id_estante
	AND s.id_bodega = b.id_bodega;
ELSE
	SELECT e.*,t.tipo
	FROM equipo e, tipo_equipo t
	WHERE e.id_tipo_equipo = t.id_tipo_equipo 
	AND e.serial = _serial 
	AND e.estado_equipo != 'ELIMINADO';
END IF;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_equipo`(
	IN `_descripcion` VARCHAR(50),
	IN `_tipo` VARCHAR(50)



)
BEGIN
DECLARE v_tipo VARCHAR(50);
DECLARE v_id_tipo_equipo INT(11);
DECLARE v_total INT(11);
SELECT if(count(*)=1,t.tipo,_tipo) INTO v_tipo FROM tipo_equipo as t WHERE t.tipo = _tipo;
SELECT id_tipo_equipo INTO v_id_tipo_equipo FROM tipo_equipo WHERE tipo = _tipo;
SELECT total INTO v_total FROM tipo_equipo WHERE tipo = _tipo;

IF v_tipo = _tipo THEN
	UPDATE tipo_equipo set
	total = total + 1
	WHERE id_tipo_equipo = v_id_tipo_equipo;
ELSE
	INSERT INTO tipo_equipo set
	tipo = _tipo,
	total = 1;
	SELECT id_tipo_equipo INTO v_id_tipo_equipo FROM tipo_equipo WHERE tipo = _tipo;
END IF;

INSERT INTO equipo set
id_tipo_equipo = v_id_tipo_equipo,
descripcion = _descripcion,
estado = 'INACTIVO';
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_persona_cliente
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_persona_cliente`(
	IN `_correo_electronico` VARCHAR(200),
	IN `_nombre` VARCHAR(50),
	IN `_estado` VARCHAR(50),
	IN `_codigo` VARCHAR(50),
	IN `_tipo` VARCHAR(50)


)
BEGIN
DECLARE idpersona INT;
INSERT INTO persona set
correo_electronico = _correo_electronico,
nombre_persona = _nombre,
estado_persona = _estado,
codigo = _codigo;
SELECT p.id_persona INTO idpersona FROM persona as p WHERE p.correo_electronico = _correo_electronico; 
INSERT INTO cliente set
id_persona = idpersona,
tipo = _tipo;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_persona_usuario
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_persona_usuario`(
	IN `_correo_electronico` VARCHAR(50),
	IN `_nombre` VARCHAR(50),
	IN `_estado` VARCHAR(50),
	IN `_nombre_usuario` VARCHAR(50),
	IN `_clave` VARCHAR(50),
	IN `_tipo` VARCHAR(50),
	IN `_codigo` VARCHAR(50)

)
BEGIN
DECLARE idpersona INT;
INSERT INTO persona set
correo_electronico = _correo_electronico,
nombre_persona = _nombre,
estado_persona = _estado,
codigo = _codigo;
SELECT p.id_persona INTO idpersona FROM persona as p WHERE p.correo_electronico = _correo_electronico; 
INSERT INTO usuario set
id_persona = idpersona,
nombre_usuario = _nombre_usuario,
clave = _clave,
tipo = _tipo;
END//
DELIMITER ;

-- Volcando estructura para tabla silub.kardex
CREATE TABLE IF NOT EXISTS `kardex` (
  `id_kardex` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_equipo` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id_kardex`),
  KEY `fk_kardex_nombre_equipo1_idx` (`id_tipo_equipo`),
  CONSTRAINT `fk_kardex_nombre_equipo1` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipo_equipo` (`id_tipo_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.kardex: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `kardex` DISABLE KEYS */;
/*!40000 ALTER TABLE `kardex` ENABLE KEYS */;

-- Volcando estructura para tabla silub.laboratorio
CREATE TABLE IF NOT EXISTS `laboratorio` (
  `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado_laboratorio` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_laboratorio`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.laboratorio: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
INSERT IGNORE INTO `laboratorio` (`id_laboratorio`, `descripcion`, `nombre`, `estado_laboratorio`) VALUES
	(1, 'Edificio 4', 'ELECTRÓNICA', 'ACTIVO'),
	(5, '123', 'prueba', 'ELIMINADO'),
	(6, 'Edificio 4', 'ELECTRÓNICA', 'ELIMINADO'),
	(7, 'asdf', 'asdf', 'ELIMINADO'),
	(8, 'asdf', 'asdf', 'ELIMINADO'),
	(9, 'asdf', 'asdfa', 'ELIMINADO'),
	(10, 'asdf', 'asdf', 'ELIMINADO'),
	(11, 'Edificio 4', 'ELECTRÓNICA', 'null'),
	(12, 'asdasd', 'asdas', 'ELIMINADO'),
	(13, 'descuento', 'ELECTRÓNICA', 'ELIMINADO'),
	(14, 'qewrqwer', 'qwwer', 'ELIMINADO'),
	(15, 'qewrqwer', 'qwwer', 'ELIMINADO'),
	(16, 'prueba1', '1231', 'ELIMINADO');
/*!40000 ALTER TABLE `laboratorio` ENABLE KEYS */;

-- Volcando estructura para tabla silub.operacion
CREATE TABLE IF NOT EXISTS `operacion` (
  `id_operacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_fin` datetime NOT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_operacion`),
  KEY `fk_mantenimiento_equipo_idx` (`id_equipo`),
  CONSTRAINT `fk_mantenimiento_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.operacion: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `operacion` ENABLE KEYS */;

-- Volcando estructura para tabla silub.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `id_persona` int(11) NOT NULL AUTO_INCREMENT,
  `correo_electronico` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_persona` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado_persona` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `codigo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_persona`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.persona: ~14 rows (aproximadamente)
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT IGNORE INTO `persona` (`id_persona`, `correo_electronico`, `nombre_persona`, `estado_persona`, `codigo`) VALUES
	(11, 'wavega@uniboyaca.edu.co', 'Jhon Vega', 'ELIMINADO', '123456'),
	(12, 'willial1393@gmail.com', 'william vega', 'ACTIVO', '789456'),
	(13, 'prueba cliente', '123', 'ELIMINADO', '13245677'),
	(14, 'jhon@gmail.com', 'Jhon', 'ACTIVO', '1234'),
	(15, 'william@gmail.com', 'William Vega', 'INACTIVO', '2314123'),
	(17, 'willial13@gmail.com', 'Leydinzoon ', 'ELIMINADO', '55215507'),
	(18, 'luis@uniboyaca.edu.co', 'Luis Chaparro', 'ELIMINADO', '123'),
	(19, 'sdfghjk', 'asdf', 'ACTIVO', 'sdf'),
	(23, 'wavega2@uniboyaca.edu.co', 'William Vega', 'ACTIVO', '1234562'),
	(25, 'wavega234@uniboyaca.edu.co', 'William Vega', 'ELIMINADO', '1234562443'),
	(26, 'sdfgsdfg', 'sdgsdfgsdfgsdf', 'ELIMINADO', '34567890'),
	(28, 'prueba cliente 2', '123', 'ELIMINADO', '132456778'),
	(33, '', '', 'ELIMINADO', ''),
	(54, 'jhon@gmail.com1423234', 'Leydinzoon233234', 'ACTIVO', '123456234');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;

-- Volcando estructura para tabla silub.prestamo
CREATE TABLE IF NOT EXISTS `prestamo` (
  `id_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `id_solicitud_adecuacion` int(11) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_devolucion` datetime NOT NULL,
  `estado_prestamo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_prestamo`),
  KEY `fk_prestamo_equipo1_idx` (`id_equipo`),
  KEY `fk_prestamo_solicitud_adecuacion1_idx` (`id_solicitud_adecuacion`),
  KEY `fk_prestamo_cliente1_idx` (`id_cliente`),
  CONSTRAINT `fk_prestamo_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prestamo_equipo1` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prestamo_solicitud_adecuacion1` FOREIGN KEY (`id_solicitud_adecuacion`) REFERENCES `solicitud_adecuacion` (`id_solicitud_adecuacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.prestamo: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;

-- Volcando estructura para tabla silub.sancion
CREATE TABLE IF NOT EXISTS `sancion` (
  `id_sancion` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_fin` datetime NOT NULL,
  PRIMARY KEY (`id_sancion`),
  KEY `fk_sancion_cliente1_idx` (`id_cliente`),
  CONSTRAINT `fk_sancion_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.sancion: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sancion` DISABLE KEYS */;
/*!40000 ALTER TABLE `sancion` ENABLE KEYS */;

-- Volcando estructura para tabla silub.solicitud_adecuacion
CREATE TABLE IF NOT EXISTS `solicitud_adecuacion` (
  `id_solicitud_adecuacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_laboratorio` int(11) NOT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_adecuacion` datetime NOT NULL,
  `hora_ingreso_sala` time NOT NULL,
  `hora_salida_sala` time NOT NULL,
  `puestos_trabajo` int(11) NOT NULL,
  `estado_solicitud_adecuacion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_solicitud_adecuacion`),
  KEY `fk_solicitud_adecuacion_laboratorio1_idx` (`id_laboratorio`),
  CONSTRAINT `fk_solicitud_adecuacion_laboratorio1` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorio` (`id_laboratorio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.solicitud_adecuacion: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `solicitud_adecuacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitud_adecuacion` ENABLE KEYS */;

-- Volcando estructura para tabla silub.tipo_equipo
CREATE TABLE IF NOT EXISTS `tipo_equipo` (
  `id_tipo_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_equipo`),
  UNIQUE KEY `nombre_UNIQUE` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.tipo_equipo: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_equipo` DISABLE KEYS */;
INSERT IGNORE INTO `tipo_equipo` (`id_tipo_equipo`, `tipo`, `total`) VALUES
	(1, 'MULTIMETRO', 5),
	(2, 'OSCILOSCOPIO', 2),
	(6, 'RASPBERRY PI 3 B+', 3);
/*!40000 ALTER TABLE `tipo_equipo` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub.update_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo_equipo` INT,
	IN `_id_estante` INT,
	IN `_serial` VARCHAR(50),
	IN `_descripcion` VARCHAR(50),
	IN `_estado` VARCHAR(50)
)
BEGIN
UPDATE equipo set
id_estante = _id_estante,
serial = _serial,
descripcion = _descripcion,
estado = _estado
WHERE id_equipo = _id_equipo;
IF _estado = 'DE_BAJA' THEN
	UPDATE tipo_equipo set
	total = total-1;
END IF;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.update_persona_cliente
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_persona_cliente`(
	IN `_id_cliente` INT,
	IN `_id_persona` INT,
	IN `_correo_electronico` VARCHAR(200),
	IN `_nombre` VARCHAR(50),
	IN `_estado` VARCHAR(50),
	IN `_codigo` VARCHAR(50),
	IN `_tipo` VARCHAR(50)


)
BEGIN
UPDATE persona set
correo_electronico = _correo_electronico,
nombre_persona = _nombre,
estado_persona = _estado,
codigo = _codigo
WHERE id_persona = _id_persona;
UPDATE cliente set
tipo = _tipo
WHERE id_cliente = _id_cliente;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.update_persona_usuario
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_persona_usuario`(
	IN `_id_persona` INT,
	IN `_id_usuario` INT,
	IN `_correo_electronico` VARCHAR(50),
	IN `_nombre` VARCHAR(50),
	IN `_estado` VARCHAR(50),
	IN `_codigo` VARCHAR(50),
	IN `_nombre_usuario` VARCHAR(50),
	IN `_clave` VARCHAR(50),
	IN `_tipo` VARCHAR(50)



)
BEGIN
UPDATE persona set
correo_electronico = _correo_electronico,
nombre_persona = _nombre,
estado_persona = _estado,
codigo = _codigo
WHERE id_persona = _id_persona;
UPDATE usuario set
nombre_usuario = _nombre_usuario,
clave = _clave,
tipo = _tipo
WHERE id_usuario = _id_usuario;
END//
DELIMITER ;

-- Volcando estructura para tabla silub.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `id_persona` int(11) NOT NULL,
  `nombre_usuario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`),
  KEY `fk_usuario_persona1_idx` (`id_persona`),
  CONSTRAINT `fk_usuario_persona1` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.usuario: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT IGNORE INTO `usuario` (`id_usuario`, `id_persona`, `nombre_usuario`, `clave`, `tipo`) VALUES
	(1, 11, 'jhon', '123', 'DEPARTAMENTO'),
	(2, 12, 'william', '123', 'AUXILIAR'),
	(3, 17, 'leydinzoon', '123', 'LABORATORIO'),
	(4, 18, 'luis', '1234567890', 'DEPARTAMENTO'),
	(7, 25, 'william23', '123', 'AUXILIAR'),
	(8, 26, 'william123', '123', 'DEPARTAMENTO');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub._login
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `_login`(
	IN `usuario` VARCHAR(50),
	IN `clave` VARCHAR(50)
)
BEGIN
SELECT * FROM usuario as u WHERE u.nombre_usuario = usuario AND u.clave = clave;
END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
