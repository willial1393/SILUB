<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class MantenimientosModel
{
    private $db;
    private $table = 'operacion';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT o.*, e.serial, t.tipo as equipo
FROM operacion o, equipo e, tipo_equipo t
WHERE o.id_equipo = e.id_equipo
AND t.id_tipo_equipo = e.id_tipo_equipo");
            $stm->execute();
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_operacion = ?");
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

        $id_equipo = $data['id_equipo'];
        $descripcion = $data['descripcion'];
        $fecha_fin = $data['fecha_fin'];
        $tipo = $data['tipo'];

        $query = "call insert_operacion(:id_equipo, :descripcion, :fecha_fin, :tipo)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("fecha_fin", $fecha_fin);
            $stmt->bindParam("tipo", $tipo);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function delete($data)
    {

        $id_equipo = $data['id_equipo'];
        $id_operacion = $data['id_operacion'];

        $query = "call delete_operacion(:id_equipo,:id_operacion)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_operacion", $id_operacion);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully delete');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function update($data)
    {
        $id_operacion = $data['id_operacion'];
        $id_equipo = $data['id_equipo'];
        $descripcion = $data['descripcion'];
        $fecha_inicio = $data['fecha_inicio'];
        $fecha_fin = $data['fecha_fin'];
        $tipo = $data['tipo'];

        $query = "UPDATE $this->table SET id_operacion = :id_operacion, id_equipo = :id_equipo, descripcion = :descripcion, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin, tipo = :tipo WHERE id_operacion = :id_operacion";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_operacion", $id_operacion);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("fecha_inicio", $fecha_inicio);
            $stmt->bindParam("fecha_fin", $fecha_fin);
            $stmt->bindParam("tipo", $tipo);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
