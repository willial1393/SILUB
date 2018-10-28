<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class SolicitudAdecuacionModel
{
    private $db;
    private $table = 'solicitud_adecuacion';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT s.*,c.*, l.nombre as laboratorio
FROM solicitud_adecuacion s, cliente c, laboratorio l
WHERE s.id_laboratorio = l.id_laboratorio
AND s.id_cliente = c.id_cliente");
            $stm->execute();
            $this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function getDetalle($value)
    {
        try {
            $stm = $this->db->prepare("SELECT s.*,t.*
FROM solicitud_adecuacion_equipo s, tipo_equipo t
WHERE s.id_solicitud_adecuacion = ?
AND s.id_tipo_equipo = t.id_tipo_equipo");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function getEquipos($value)
    {
        try {
            $stm = $this->db->prepare("SELECT s.*,p.*,e.*,es.*, es.descripcion as descripcion_estante, es.estado as estado_estante, b.*, b.descripcion as descripcion_bodega, b.estado as estado_bodega
FROM solicitud_adecuacion s, equipo e, tipo_equipo t, estante es, bodega b, prestamo p
WHERE ? = p.id_solicitud_adecuacion
AND p.id_equipo = e.id_equipo
AND e.id_tipo_equipo = t.id_tipo_equipo
AND e.id_estante = es.id_estante
AND es.id_bodega = b.id_bodega");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function get($value)
    {
        try {
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_solicitud_adecuacion = ?");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function insert($data)
    {
        $id_laboratorio = $data['id_laboratorio'];
        $id_cliente = $data['id_cliente'];
        $fecha_adecuacion = $data['fecha_adecuacion'];
        $hora_ingreso_sala = $data['hora_ingreso_sala'];
        $hora_salida_sala = $data['hora_salida_sala'];
        $puestos_trabajo = $data['puestos_trabajo'];

        $query = "call insert_solicitud_adecuacion(:id_laboratorio, :id_cliente, :fecha_adecuacion, :hora_ingreso_sala, :hora_salida_sala, :puestos_trabajo)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("fecha_adecuacion", $fecha_adecuacion);
            $stmt->bindParam("hora_ingreso_sala", $hora_ingreso_sala);
            $stmt->bindParam("hora_salida_sala", $hora_salida_sala);
            $stmt->bindParam("puestos_trabajo", $puestos_trabajo);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function updateDetalle($data)
    {
        $id_tipo_equipo = $data['id_tipo_equipo'];
        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];
        $cantidad = $data['cantidad'];

        $query = "call update_equipo_solicitud(:id_tipo_equipo, :id_solicitud_adecuacion, :cantidad)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->bindParam("cantidad", $cantidad);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function deleteSolicitud($data)
    {
        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];

        $query = "DELETE FROM solicitud_adecuacion WHERE id_solicitud_adecuacion = :id_solicitud_adecuacion";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully delete');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
