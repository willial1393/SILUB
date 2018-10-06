<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class ReparacionModel
{
    private $db;
    private $table = 'reparacion';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db       = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try
        {
            $result = array();

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
        try
        {
            $result = array();

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_reparacion = ?");
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

        $id_reparacion = $data['id_reparacion'];
        $id_equipo     = $data['id_equipo'];
        $descripcion   = $data['descripcion'];
        $fecha_inicio  = $data['fecha_inicio'];
        $fecha_fin     = $data['fecha_fin'];

        $query = "INSERT INTO $this->table (id_reparacion, id_equipo, descripcion, fecha_inicio, fecha_fin) VALUES (:id_reparacion, :id_equipo, :descripcion, :fecha_inicio, :fecha_fin)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_reparacion", $id_reparacion);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("fecha_inicio", $fecha_inicio);
            $stmt->bindParam("fecha_fin", $fecha_fin);
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
        $id_reparacion = $data['id_reparacion'];
        $id_equipo     = $data['id_equipo'];
        $descripcion   = $data['descripcion'];
        $fecha_inicio  = $data['fecha_inicio'];
        $fecha_fin     = $data['fecha_fin'];

        $query = "UPDATE $this->table SET id_reparacion = :id_reparacion, id_equipo = :id_equipo, descripcion = :descripcion, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin WHERE id_reparacion = :id_reparacion";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_reparacion", $id_reparacion);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("fecha_inicio", $fecha_inicio);
            $stmt->bindParam("fecha_fin", $fecha_fin);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
