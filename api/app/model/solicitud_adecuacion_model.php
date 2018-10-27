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

    public function getEquipos($value)
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

        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];
        $id_laboratorio = $data['id_laboratorio'];
        $fecha_solicitud = $data['fecha_solicitud'];
        $fecha_adecuacion = $data['fecha_adecuacion'];
        $hora_ingreso_sala = $data['hora_ingreso_sala'];
        $hora_salida_sala = $data['hora_salida_sala'];
        $puestos_trabajo = $data['puestos_trabajo'];
        $estado = $data['estado'];

        $query = "INSERT INTO $this->table (id_solicitud_adecuacion, id_laboratorio, fecha_solicitud, fecha_adecuacion, hora_ingreso_sala, hora_salida_sala, puestos_trabajo, estado) VALUES (:id_solicitud_adecuacion, :id_laboratorio, :fecha_solicitud, :fecha_adecuacion, :hora_ingreso_sala, :hora_salida_sala, :puestos_trabajo, :estado)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("fecha_solicitud", $fecha_solicitud);
            $stmt->bindParam("fecha_adecuacion", $fecha_adecuacion);
            $stmt->bindParam("hora_ingreso_sala", $hora_ingreso_sala);
            $stmt->bindParam("hora_salida_sala", $hora_salida_sala);
            $stmt->bindParam("puestos_trabajo", $puestos_trabajo);
            $stmt->bindParam("estado", $estado);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function update($data)
    {
        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];
        $id_laboratorio = $data['id_laboratorio'];
        $fecha_solicitud = $data['fecha_solicitud'];
        $fecha_adecuacion = $data['fecha_adecuacion'];
        $hora_ingreso_sala = $data['hora_ingreso_sala'];
        $hora_salida_sala = $data['hora_salida_sala'];
        $puestos_trabajo = $data['puestos_trabajo'];
        $estado = $data['estado'];

        $query = "UPDATE $this->table SET id_solicitud_adecuacion = :id_solicitud_adecuacion, id_laboratorio = :id_laboratorio, fecha_solicitud = :fecha_solicitud, fecha_adecuacion = :fecha_adecuacion, hora_ingreso_sala = :hora_ingreso_sala, hora_salida_sala = :hora_salida_sala, puestos_trabajo = :puestos_trabajo, estado = :estado WHERE id_solicitud_adecuacion = :id_solicitud_adecuacion";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("fecha_solicitud", $fecha_solicitud);
            $stmt->bindParam("fecha_adecuacion", $fecha_adecuacion);
            $stmt->bindParam("hora_ingreso_sala", $hora_ingreso_sala);
            $stmt->bindParam("hora_salida_sala", $hora_salida_sala);
            $stmt->bindParam("puestos_trabajo", $puestos_trabajo);
            $stmt->bindParam("estado", $estado);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
