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
            $stm = $this->db->prepare("SELECT * FROM $this->table");
            $stm->execute();

            $this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();

            return $this->response;
        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
            return $this->response;
        }
    }

    public function get($value)
    {
        try {
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_operacion = ?");
            $stm->execute(array($value));

            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();

            return $this->response;
        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
            return $this->response;
        }
    }

    public function insert($data)
    {

        $id_operacion = $data['id_operacion'];
        $id_equipo = $data['id_equipo'];
        $descripcion = $data['descripcion'];
        $fecha_inicio = $data['fecha_inicio'];
        $fecha_fin = $data['fecha_fin'];
        $tipo = $data['tipo'];

        $query = "INSERT INTO $this->table (id_operacion, id_equipo, descripcion, fecha_inicio, fecha_fin, tipo) VALUES (:id_operacion, :id_equipo, :descripcion, :fecha_inicio, :fecha_fin, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_operacion", $id_operacion);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("fecha_inicio", $fecha_inicio);
            $stmt->bindParam("fecha_fin", $fecha_fin);
            $stmt->bindParam("tipo", $tipo);
            $stmt->execute();

            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (Exception $e) {
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
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
