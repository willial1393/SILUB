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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.bodega: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `bodega` DISABLE KEYS */;
INSERT IGNORE INTO `bodega` (`id_bodega`, `descripcion`, `estado`) VALUES
	(1, 'FÍSICA', 'ACTIVO'),
	(2, 'EDIFICIO 4', 'ELIMINADO'),
	(3, '', 'ELIMINADO'),
	(5, 'ELECTRONICA', 'ACTIVO');
/*!40000 ALTER TABLE `bodega` ENABLE KEYS */;

-- Volcando estructura para tabla silub.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `codigo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `estado_cliente` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  `correo_electronico` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.cliente: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT IGNORE INTO `cliente` (`id_cliente`, `tipo`, `codigo`, `estado_cliente`, `correo_electronico`, `nombre`) VALUES
	(2, 'ESTUDIANTE', '123', 'ACTIVO', 'willial1393@gmail.com', 'WILLIAM VEGA'),
	(5, 'DOCENTE', '1234', 'SANCIONADO', 'jhon@gmail.com', 'JHON VEGA'),
	(7, 'ESTUDIANTE', '1235', 'ACTIVO', 'arenas@uniboyaca.edu.co', 'LEYDINZOON');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub.dar_baja_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `dar_baja_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo` INT







)
BEGIN
DECLARE v_tipo VARCHAR(50);
SELECT tipo INTO v_tipo FROM tipo_equipo WHERE id_tipo_equipo = _id_tipo;
UPDATE equipo SET estado_equipo = 'DADO DE BAJA' WHERE id_equipo = _id_equipo;
UPDATE tipo_equipo SET total = total-1 WHERE id_tipo_equipo = _id_tipo;
call insert_kardex(v_tipo, 'SALIDA', '1');
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.delete_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo` INT
)
BEGIN
DECLARE v_tipo VARCHAR(50);
SELECT tipo INTO v_tipo FROM tipo_equipo WHERE id_tipo_equipo = _id_tipo;
UPDATE tipo_equipo SET total = total-1 WHERE id_tipo_equipo = _id_tipo;
DELETE FROM equipo WHERE id_equipo = _id_equipo;
call insert_kardex(v_tipo, 'SALIDA', '1');
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.delete_operacion
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_operacion`(
	IN `_id_equipo` INT,
	IN `_id_operacion` INT
)
BEGIN
DELETE FROM operacion WHERE id_operacion = _id_operacion;
UPDATE equipo SET
estado_equipo = 'ACTIVO'
WHERE id_equipo = _id_equipo;
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=ujis;

-- Volcando datos para la tabla silub.equipo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `equipo` DISABLE KEYS */;
INSERT IGNORE INTO `equipo` (`id_equipo`, `id_tipo_equipo`, `id_estante`, `serial`, `descripcion`, `fecha_registro`, `estado_equipo`) VALUES
	(67, 7, 1, '123', 'medición', '2018-10-24 01:41:10', 'PRESTADO'),
	(68, 7, NULL, NULL, 'medición', '2018-10-23 13:31:39', 'INACTIVO');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.estante: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `estante` DISABLE KEYS */;
INSERT IGNORE INTO `estante` (`id_estante`, `id_bodega`, `armario`, `estante`, `descripcion`, `estado`) VALUES
	(1, 1, '1', '1-2', 'Algo', 'ELIMINADO'),
	(2, 1, '1', '1-1', '', 'ACTIVO'),
	(3, 1, '1', '1-2', '', 'ACTIVO'),
	(4, 5, '2', '1-1', '', 'ACTIVO'),
	(5, 1, '2', '1-1', '', 'ACTIVO');
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
estado_equipo = 'INACTIVO';
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_kardex
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_kardex`(
	IN `_id_tipo_equipo` VARCHAR(50),
	IN `_tipo` VARCHAR(50),
	IN `_cantidad` VARCHAR(50)



)
BEGIN
DECLARE v_total VARCHAR(50);
DECLARE v_id_tipo_equipo INT(11);
SELECT id_tipo_equipo INTO v_id_tipo_equipo FROM tipo_equipo WHERE tipo = _id_tipo_equipo;
SELECT total INTO v_total FROM tipo_equipo WHERE id_tipo_equipo = v_id_tipo_equipo;
INSERT INTO kardex SET
id_tipo_equipo = v_id_tipo_equipo,
tipo = _tipo,
cantidad = _cantidad,
total = v_total;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_operacion
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_operacion`(
	IN `_id_equipo` INT,
	IN `_descripcion` VARCHAR(50),
	IN `_fecha_fin` VARCHAR(50),
	IN `_tipo` VARCHAR(50)


)
BEGIN
DECLARE v_estado_equipo VARCHAR(20);
SELECT e.estado_equipo INTO v_estado_equipo FROM equipo e WHERE e.id_equipo = _id_equipo;
IF v_estado_equipo = 'PRESTADO' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'EQUIPO PRESTADO';
END IF;
IF v_estado_equipo != 'ACTIVO' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'EQUIPO NO ACTIVO';
END IF;
INSERT INTO operacion SET
id_equipo = _id_equipo,
descripcion = _descripcion,
fecha_fin = _fecha_fin,
tipo = _tipo;
UPDATE equipo SET
estado_equipo = _tipo
WHERE id_equipo = _id_equipo;
END//
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_varios_equipos
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_varios_equipos`(
	IN `_cantidad` VARCHAR(50),
	IN `_descripcion` VARCHAR(50),
	IN `_tipo` VARCHAR(50)

)
BEGIN
DECLARE a INT Default 0 ;
simple_loop: LOOP
SET a=a+1;
call insert_equipo(_descripcion, _tipo);
IF a= _cantidad THEN
   LEAVE simple_loop;
END IF;
END LOOP simple_loop;
call insert_kardex(_tipo, 'ENTRADA', _cantidad);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.kardex: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `kardex` DISABLE KEYS */;
INSERT IGNORE INTO `kardex` (`id_kardex`, `id_tipo_equipo`, `fecha`, `tipo`, `cantidad`, `total`) VALUES
	(33, 7, '2018-10-23 13:31:39', 'ENTRADA', 3, 3),
	(34, 7, '2018-10-23 13:31:48', 'SALIDA', 1, 2);
/*!40000 ALTER TABLE `kardex` ENABLE KEYS */;

-- Volcando estructura para tabla silub.laboratorio
CREATE TABLE IF NOT EXISTS `laboratorio` (
  `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado_laboratorio` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_laboratorio`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.laboratorio: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `laboratorio` DISABLE KEYS */;
INSERT IGNORE INTO `laboratorio` (`id_laboratorio`, `descripcion`, `nombre`, `estado_laboratorio`) VALUES
	(1, 'Edificio 4', 'ELECTRÓNICA', 'ACTIVO'),
	(3, 'Edificio 4', 'FISICA', 'ACTIVO');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.operacion: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `operacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `operacion` ENABLE KEYS */;

-- Volcando estructura para tabla silub.prestamo
CREATE TABLE IF NOT EXISTS `prestamo` (
  `id_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `id_solicitud_adecuacion` int(11) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fecha_devolucion` date NOT NULL,
  `fecha_prevista` date NOT NULL,
  `estado_prestamo` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_prestamo`),
  KEY `fk_prestamo_equipo1_idx` (`id_equipo`),
  KEY `fk_prestamo_solicitud_adecuacion1_idx` (`id_solicitud_adecuacion`),
  KEY `fk_prestamo_cliente1_idx` (`id_cliente`),
  CONSTRAINT `fk_prestamo_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prestamo_equipo1` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_prestamo_solicitud_adecuacion1` FOREIGN KEY (`id_solicitud_adecuacion`) REFERENCES `solicitud_adecuacion` (`id_solicitud_adecuacion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.prestamo: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT IGNORE INTO `prestamo` (`id_prestamo`, `id_equipo`, `id_solicitud_adecuacion`, `id_cliente`, `fecha_solicitud`, `fecha_devolucion`, `fecha_prevista`, `estado_prestamo`) VALUES
	(1, 67, NULL, 5, '2018-10-24 01:38:11', '2018-10-23', '2018-10-23', 'TERMINADO'),
	(2, 67, NULL, 2, '2018-10-24 01:41:03', '0000-00-00', '2018-10-24', 'TERMINADO'),
	(3, 67, NULL, 2, '2018-10-24 00:00:00', '0000-00-00', '2018-10-24', 'ACTIVO');
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub.prestar_equipo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `prestar_equipo`(
	IN `_id_cliente` INT,
	IN `_id_equipo` INT,
	IN `_fecha_solicitud` DATE,
	IN `_fecha_devolucion` DATE,
	IN `_fecha_prevista` DATE



)
BEGIN
DECLARE sancionado VARCHAR(20);
SELECT estado_cliente INTO sancionado
FROM cliente c
WHERE c.id_cliente = _id_cliente;

IF sancionado = 'SANCIONADO' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SANCIONADO';
END IF;
IF (select IF(e.estado_equipo!='ACTIVO',1,0) from equipo e where e.id_equipo = _id_equipo) = 1 THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'EQUIPO NO ACTIVO';
END IF;

UPDATE equipo SET
estado_equipo = 'PRESTADO'
WHERE id_equipo = _id_equipo;
INSERT INTO prestamo SET
id_equipo = _id_equipo,
id_cliente = _id_cliente,
fecha_solicitud = _fecha_solicitud,
fecha_devolucion = _fecha_devolucion,
fecha_prevista = _fecha_prevista;
END//
DELIMITER ;

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.sancion: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sancion` DISABLE KEYS */;
INSERT IGNORE INTO `sancion` (`id_sancion`, `id_cliente`, `descripcion`, `fecha_inicio`, `fecha_fin`) VALUES
	(7, 2, 'USUARIO', '2018-10-22 00:00:00', '2018-10-23 00:00:00'),
	(8, 5, 'USUARIO', '2018-10-22 00:00:00', '2018-12-11 00:00:00');
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

-- Volcando estructura para procedimiento silub.terminar_prestamo
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `terminar_prestamo`(
	IN `_id_equipo` INT
,
	IN `_id_prestamo` INT
)
BEGIN
UPDATE equipo SET
estado_equipo = 'ACTIVO'
WHERE id_equipo = _id_equipo;
UPDATE prestamo SET
estado_prestamo = 'TERMINADO'
WHERE id_prestamo = _id_prestamo;
END//
DELIMITER ;

-- Volcando estructura para tabla silub.tipo_equipo
CREATE TABLE IF NOT EXISTS `tipo_equipo` (
  `id_tipo_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_equipo`),
  UNIQUE KEY `nombre_UNIQUE` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.tipo_equipo: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_equipo` DISABLE KEYS */;
INSERT IGNORE INTO `tipo_equipo` (`id_tipo_equipo`, `tipo`, `total`) VALUES
	(7, 'MULTÍMETRO', 2);
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
estado_equipo = _estado
WHERE id_equipo = _id_equipo;
IF _estado = 'DE_BAJA' THEN
	UPDATE tipo_equipo set
	total = total-1;
END IF;
END//
DELIMITER ;

-- Volcando estructura para tabla silub.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `codigo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  `correo_electronico` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_persona` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Volcando datos para la tabla silub.usuario: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT IGNORE INTO `usuario` (`id_usuario`, `nombre_usuario`, `clave`, `tipo`, `codigo`, `estado`, `correo_electronico`, `nombre_persona`) VALUES
	(9, 'william', '123', 'LABORATORIO', '123', 'ACTIVO', 'wavega@uniboyaca.edu.co', 'WILLIAM VEGA'),
	(12, 'jhon', '123', 'LABORATORIO', '12344', 'INACTIVO', 'willial1393@gmail.com', 'LEYDINZOON');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

-- Volcando estructura para procedimiento silub._login
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `_login`(
	IN `_usuario` VARCHAR(50),
	IN `_clave` VARCHAR(50)

)
BEGIN
SELECT * FROM usuario u WHERE u.nombre_usuario = _usuario AND u.clave = _clave AND u.estado = 'ACTIVO';
END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
