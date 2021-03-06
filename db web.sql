USE `2875878_silub`;

-- Volcando estructura para tabla silub.armario
CREATE TABLE IF NOT EXISTS `armario` (
  `id_armario` int(11) NOT NULL AUTO_INCREMENT,
  `id_bodega` int(11) NOT NULL,
  `nombre` int(11) NOT NULL,
  PRIMARY KEY (`id_armario`),
  KEY `FK_armario_bodega` (`id_bodega`),
  CONSTRAINT `FK_armario_bodega` FOREIGN KEY (`id_bodega`) REFERENCES `bodega` (`id_bodega`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.bodega
CREATE TABLE IF NOT EXISTS `bodega` (
  `id_bodega` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_bodega`),
  UNIQUE KEY `descripcion_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.dar_baja_equipo
DROP PROCEDURE IF EXISTS `dar_baja_equipo`;
DELIMITER ;;
CREATE PROCEDURE `dar_baja_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo` INT







)
BEGIN
DECLARE v_tipo VARCHAR(50);
SELECT tipo INTO v_tipo FROM tipo_equipo WHERE id_tipo_equipo = _id_tipo;
UPDATE equipo SET estado_equipo = 'DADO DE BAJA' WHERE id_equipo = _id_equipo;
UPDATE tipo_equipo SET total = total-1 WHERE id_tipo_equipo = _id_tipo;
call insert_kardex(v_tipo, 'SALIDA', '1');
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.delete_equipo
DROP PROCEDURE IF EXISTS `delete_equipo`;
DELIMITER ;;
CREATE PROCEDURE `delete_equipo`(
	IN `_id_equipo` INT,
	IN `_id_tipo` INT
)
BEGIN
DECLARE v_tipo VARCHAR(50);
SELECT tipo INTO v_tipo FROM tipo_equipo WHERE id_tipo_equipo = _id_tipo;
UPDATE tipo_equipo SET total = total-1 WHERE id_tipo_equipo = _id_tipo;
DELETE FROM equipo WHERE id_equipo = _id_equipo;
call insert_kardex(v_tipo, 'SALIDA', '1');
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.delete_operacion
DROP PROCEDURE IF EXISTS `delete_operacion`;
DELIMITER ;;
CREATE PROCEDURE `delete_operacion`(
	IN `_id_equipo` INT,
	IN `_id_operacion` INT
)
BEGIN
DELETE FROM operacion WHERE id_operacion = _id_operacion;
UPDATE equipo SET
estado_equipo = 'ACTIVO'
WHERE id_equipo = _id_equipo;
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.equipo
CREATE TABLE IF NOT EXISTS `equipo` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_equipo` int(11) NOT NULL,
  `id_estante` int(11) DEFAULT NULL,
  `serial` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_equipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE KEY `serial_UNIQUE` (`serial`),
  KEY `fk_equipo_estante1_idx` (`id_estante`),
  KEY `fk_equipo_nombre_equipo1_idx` (`id_tipo_equipo`),
  CONSTRAINT `fk_equipo_estante1` FOREIGN KEY (`id_estante`) REFERENCES `estante` (`id_estante`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipo_nombre_equipo1` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipo_equipo` (`id_tipo_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=ujis;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.estante
CREATE TABLE IF NOT EXISTS `estante` (
  `id_estante` int(11) NOT NULL AUTO_INCREMENT,
  `id_armario` int(11) NOT NULL,
  `nombre` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_estante`),
  KEY `FK_estante_armario` (`id_armario`),
  CONSTRAINT `FK_estante_armario` FOREIGN KEY (`id_armario`) REFERENCES `armario` (`id_armario`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.get_equipo
DROP PROCEDURE IF EXISTS `get_equipo`;
DELIMITER ;;
CREATE PROCEDURE `get_equipo`(
	IN `_id_equipo` INT

)
BEGIN
IF (SELECT e.id_estante FROM equipo e WHERE e.id_equipo = _id_equipo) IS NULL THEN 
	SELECT e.*,t.tipo,t.total
	FROM equipo e, tipo_equipo t
	WHERE e.id_tipo_equipo = t.id_tipo_equipo
	AND e.id_equipo = _id_equipo;
ELSE
	SELECT e.*,t.tipo,t.total,s.*,s.nombre as nombre_estante,a.*,a.nombre as nombre_armario,b.*,b.nombre as nombre_bodega
	FROM equipo e, tipo_equipo t, estante s, armario a, bodega b
	WHERE e.id_tipo_equipo = t.id_tipo_equipo
	AND e.id_equipo = _id_equipo
	AND e.id_estante = s.id_estante
	AND s.id_armario = a.id_armario
	AND a.id_bodega = b.id_bodega;
END IF;
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.get_full_equipo
DROP PROCEDURE IF EXISTS `get_full_equipo`;
DELIMITER ;;
CREATE PROCEDURE `get_full_equipo`(
	IN `_serial` INT





)
BEGIN
IF (SELECT e.id_estante FROM equipo e WHERE e.serial = _serial) IS NULL THEN 
	SELECT e.*,t.tipo,t.total
	FROM equipo e, tipo_equipo t
	WHERE e.id_tipo_equipo = t.id_tipo_equipo
	AND e.serial = _serial;
ELSE
	SELECT e.*,t.tipo,t.total,s.*,s.nombre as nombre_estante,a.*,a.nombre as nombre_armario,b.*,b.nombre as nombre_bodega
	FROM equipo e, tipo_equipo t, estante s, armario a, bodega b
	WHERE e.id_tipo_equipo = t.id_tipo_equipo
	AND e.serial = _serial
	AND e.id_estante = s.id_estante
	AND s.id_armario = a.id_armario
	AND a.id_bodega = b.id_bodega;
END IF;
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_armario
DROP PROCEDURE IF EXISTS `insert_armario`;
DELIMITER ;;
CREATE PROCEDURE `insert_armario`(
	IN `_id_bodega` INT,
	IN `_nombre` VARCHAR(50)
)
BEGIN
IF IF((select COUNT(*) from armario a where a.id_bodega = _id_bodega and a.nombre = _nombre)>0,1,0) THEN
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'armario_UNIQUE';
END IF;

INSERT INTO armario SET
nombre = _nombre,
id_bodega = _id_bodega;
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_equipo
DROP PROCEDURE IF EXISTS `insert_equipo`;
DELIMITER ;;
CREATE PROCEDURE `insert_equipo`(
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
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_estante
DROP PROCEDURE IF EXISTS `insert_estante`;
DELIMITER ;;
CREATE PROCEDURE `insert_estante`(
	IN `_id_armario` INT,
	IN `_nombre` VARCHAR(50)

)
BEGIN
IF IF((select COUNT(*) from estante e where e.id_armario = _id_armario and e.nombre = _nombre)>0,1,0) THEN
 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'estante_UNIQUE';
END IF;

INSERT INTO estante SET
nombre = _nombre,
id_armario = _id_armario;
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_kardex
DROP PROCEDURE IF EXISTS `insert_kardex`;
DELIMITER ;;
CREATE PROCEDURE `insert_kardex`(
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
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_operacion
DROP PROCEDURE IF EXISTS `insert_operacion`;
DELIMITER ;;
CREATE PROCEDURE `insert_operacion`(
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
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_solicitud_adecuacion
DROP PROCEDURE IF EXISTS `insert_solicitud_adecuacion`;
DELIMITER ;;
CREATE PROCEDURE `insert_solicitud_adecuacion`(
	IN `_id_laboratorio` INT,
	IN `_id_cliente` INT,
	IN `_fecha_adecuacion` DATE,
	IN `_hora_ingreso_sala` TIME,
	IN `_hora_salida_sala` TIME,
	IN `_puestos_trabajo` VARCHAR(50)

)
BEGIN
DECLARE sancionado VARCHAR(20);
DECLARE var_tipo_cliente VARCHAR(20);

SELECT c.estado_cliente INTO sancionado
FROM cliente c
WHERE c.id_cliente = _id_cliente;

SELECT c.tipo INTO var_tipo_cliente
FROM cliente c
WHERE c.id_cliente = _id_cliente;

IF var_tipo_cliente != 'DOCENTE' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CLIENTE NO ES DOCENTE';
END IF;

IF sancionado = 'SANCIONADO' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'SANCIONADO';
END IF;

IF IF((select COUNT(*) from solicitud_adecuacion s 
			where s.id_laboratorio = _id_laboratorio 
			and _fecha_adecuacion = s.fecha_adecuacion
			and _hora_ingreso_sala >= s.hora_ingreso_sala
			and _hora_ingreso_sala <= s.hora_salida_sala)>0,1,0) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'LABORATORIO NO DISPONIBLE PARA LA FECHA';
END IF;

IF IF((select COUNT(*) from solicitud_adecuacion s 
			where s.id_laboratorio = _id_laboratorio 
			and _fecha_adecuacion = s.fecha_adecuacion
			and _hora_salida_sala >= s.hora_ingreso_sala
			and _hora_salida_sala <= s.hora_salida_sala)>0,1,0) THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'LABORATORIO NO DISPONIBLE PARA LA FECHA';
END IF;

INSERT INTO solicitud_adecuacion SET
id_laboratorio = _id_laboratorio,
id_cliente = _id_cliente,
fecha_adecuacion = _fecha_adecuacion,
hora_ingreso_sala = _hora_ingreso_sala,
hora_salida_sala = _hora_salida_sala,
puestos_trabajo = _puestos_trabajo;
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.insert_varios_equipos
DROP PROCEDURE IF EXISTS `insert_varios_equipos`;
DELIMITER ;;
CREATE PROCEDURE `insert_varios_equipos`(
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
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.kardex
CREATE TABLE IF NOT EXISTS `kardex` (
  `id_kardex` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_equipo` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `cantidad` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id_kardex`),
  KEY `fk_kardex_nombre_equipo1_idx` (`id_tipo_equipo`),
  CONSTRAINT `fk_kardex_nombre_equipo1` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipo_equipo` (`id_tipo_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.laboratorio
CREATE TABLE IF NOT EXISTS `laboratorio` (
  `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado_laboratorio` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_laboratorio`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.operacion
CREATE TABLE IF NOT EXISTS `operacion` (
  `id_operacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` datetime NOT NULL,
  `tipo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_operacion`),
  KEY `fk_mantenimiento_equipo_idx` (`id_equipo`),
  CONSTRAINT `fk_mantenimiento_equipo` FOREIGN KEY (`id_equipo`) REFERENCES `equipo` (`id_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.prestamo
CREATE TABLE IF NOT EXISTS `prestamo` (
  `id_prestamo` int(11) NOT NULL AUTO_INCREMENT,
  `id_equipo` int(11) NOT NULL,
  `id_solicitud_adecuacion` int(11) DEFAULT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.prestar_equipo
DROP PROCEDURE IF EXISTS `prestar_equipo`;
DELIMITER ;;
CREATE PROCEDURE `prestar_equipo`(
	IN `_id_cliente` INT,
	IN `_id_equipo` INT,
	IN `_fecha_solicitud` DATE,
	IN `_fecha_devolucion` DATE,
	IN `_fecha_prevista` DATE



,
	IN `_id_solicitud_adecuacion` INT

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

INSERT INTO prestamo SET
id_equipo = _id_equipo,
id_solicitud_adecuacion = _id_solicitud_adecuacion,
id_cliente = _id_cliente,
fecha_solicitud = _fecha_solicitud,
fecha_devolucion = _fecha_devolucion,
fecha_prevista = _fecha_prevista;

UPDATE equipo SET
estado_equipo = 'PRESTADO'
WHERE id_equipo = _id_equipo;
END;;
DELIMITER ;

-- Volcando estructura para evento silub.revisar_sanciones_clientes
DROP EVENT IF EXISTS `revisar_sanciones_clientes`;
DELIMITER ;;
CREATE EVENT `revisar_sanciones_clientes` ON SCHEDULE EVERY 1 DAY STARTS '2018-10-31 08:24:45' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Revisa si la sanción del cliente ya se a cumplido y cambia el es' DO BEGIN
UPDATE cliente, sancion
SET cliente.estado_cliente = 'ACTIVO'
WHERE cliente.id_cliente = sancion.id_cliente
AND sancion.fecha_fin < CURDATE();
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.sancion
CREATE TABLE IF NOT EXISTS `sancion` (
  `id_sancion` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `fecha_inicio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_fin` date NOT NULL,
  PRIMARY KEY (`id_sancion`),
  KEY `fk_sancion_cliente1_idx` (`id_cliente`),
  CONSTRAINT `fk_sancion_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.sancionar_cliente
DROP PROCEDURE IF EXISTS `sancionar_cliente`;
DELIMITER ;;
CREATE PROCEDURE `sancionar_cliente`(
	IN `_id_cliente` INT
,
	IN `_fecha_fin` DATE

)
BEGIN
IF (select c.estado_cliente from cliente c where c.id_cliente = _id_cliente) = 'SANCIONADO' THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CLIENTE SANCIONADO';
END IF;

INSERT INTO sancion set
id_cliente = _id_cliente,
fecha_fin = _fecha_fin;

UPDATE cliente set
estado_cliente = 'SANCIONADO'
WHERE id_cliente = _id_cliente;
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.solicitud_adecuacion
CREATE TABLE IF NOT EXISTS `solicitud_adecuacion` (
  `id_solicitud_adecuacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_laboratorio` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_solicitud` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_adecuacion` date NOT NULL,
  `hora_ingreso_sala` time NOT NULL,
  `hora_salida_sala` time NOT NULL,
  `puestos_trabajo` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `estado_solicitud_adecuacion` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id_solicitud_adecuacion`),
  KEY `fk_solicitud_adecuacion_laboratorio1_idx` (`id_laboratorio`),
  KEY `FK_solicitud_adecuacion_cliente` (`id_cliente`),
  CONSTRAINT `FK_solicitud_adecuacion_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `fk_solicitud_adecuacion_laboratorio1` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorio` (`id_laboratorio`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para tabla silub.solicitud_adecuacion_equipo
CREATE TABLE IF NOT EXISTS `solicitud_adecuacion_equipo` (
  `id_solicitud_adecuacion` int(11) DEFAULT NULL,
  `id_tipo_equipo` int(11) DEFAULT NULL,
  `cantidad` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `FK_solicitud_adecuacion_equipo_solicitud_adecuacion` (`id_solicitud_adecuacion`),
  KEY `FK_solicitud_adecuacion_equipo_tipo_equipo` (`id_tipo_equipo`),
  CONSTRAINT `FK_solicitud_adecuacion_equipo_solicitud_adecuacion` FOREIGN KEY (`id_solicitud_adecuacion`) REFERENCES `solicitud_adecuacion` (`id_solicitud_adecuacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_solicitud_adecuacion_equipo_tipo_equipo` FOREIGN KEY (`id_tipo_equipo`) REFERENCES `tipo_equipo` (`id_tipo_equipo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.terminar_prestamo
DROP PROCEDURE IF EXISTS `terminar_prestamo`;
DELIMITER ;;
CREATE PROCEDURE `terminar_prestamo`(
	IN `_id_equipo` INT
,
	IN `_id_prestamo` INT

)
BEGIN
UPDATE equipo SET
estado_equipo = 'ACTIVO'
WHERE id_equipo = _id_equipo;
UPDATE prestamo SET
estado_prestamo = 'TERMINADO',
fecha_devolucion = CURDATE()
WHERE id_prestamo = _id_prestamo;
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.tipo_equipo
CREATE TABLE IF NOT EXISTS `tipo_equipo` (
  `id_tipo_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `total` int(11) NOT NULL,
  PRIMARY KEY (`id_tipo_equipo`),
  UNIQUE KEY `nombre_UNIQUE` (`tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub.update_equipo
DROP PROCEDURE IF EXISTS `update_equipo`;
DELIMITER ;;
CREATE PROCEDURE `update_equipo`(
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
END;;
DELIMITER ;

-- Volcando estructura para procedimiento silub.update_equipo_solicitud
DROP PROCEDURE IF EXISTS `update_equipo_solicitud`;
DELIMITER ;;
CREATE PROCEDURE `update_equipo_solicitud`(
	IN `_id_tipo_equipo` INT,
	IN `_id_solicitud_adecuacion` INT,
	IN `_cantidad` VARCHAR(50)
)
BEGIN
IF _cantidad <= '0' THEN
	DELETE FROM solicitud_adecuacion_equipo 
	WHERE id_tipo_equipo = _id_tipo_equipo
	AND id_solicitud_adecuacion = _id_solicitud_adecuacion;
ELSE
	IF IF((select count(*) from solicitud_adecuacion_equipo s where s.id_solicitud_adecuacion = _id_solicitud_adecuacion and s.id_tipo_equipo = _id_tipo_equipo)=0,1,0)   THEN
		INSERT INTO solicitud_adecuacion_equipo SET
		id_tipo_equipo = _id_tipo_equipo,
		id_solicitud_adecuacion = _id_solicitud_adecuacion,
		cantidad = _cantidad;
	ELSE
		UPDATE solicitud_adecuacion_equipo SET cantidad = _cantidad 
		WHERE id_tipo_equipo = _id_tipo_equipo
		AND id_solicitud_adecuacion = _id_solicitud_adecuacion;
	END IF;
END IF;
END;;
DELIMITER ;

-- Volcando estructura para tabla silub.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `clave` text COLLATE utf8_unicode_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `codigo` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(45) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'ACTIVO',
  `correo_electronico` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_persona` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nombre_usuario_UNIQUE` (`nombre_usuario`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`),
  UNIQUE KEY `correo_electronico_UNIQUE` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- La exportación de datos fue deseleccionada.
-- Volcando estructura para procedimiento silub._login
DROP PROCEDURE IF EXISTS `_login`;
DELIMITER ;;
CREATE PROCEDURE `_login`(
	IN `_usuario` VARCHAR(50),
	IN `_clave` VARCHAR(50)


)
BEGIN
SELECT * FROM usuario u WHERE u.nombre_usuario = _usuario AND u.clave = _clave AND u.estado = 'ACTIVO';
END;;
DELIMITER ;

-- Volcando estructura para disparador silub.sancion_after_delete
DROP TRIGGER IF EXISTS `sancion_after_delete`;
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER ;;
CREATE TRIGGER `sancion_after_delete` AFTER DELETE ON `sancion` FOR EACH ROW BEGIN
UPDATE cliente  SET
estado_cliente = 'ACTIVO'
WHERE id_cliente = OLD.id_cliente;
END;;
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

