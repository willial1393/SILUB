<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class MantenimientosModel
{
    private $db;
    private $table = 'mantenimiento';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_mantenimiento= ?");
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

        $id_mantenimiento = $data['id_mantenimiento'];
        $id_equipo        = $data['id_equipo'];
        $descripcion      = $data['descripcion'];
        $fecha_inicio     = $data['fecha_inicio'];
        $fecha_fin        = $data['fecha_fin'];

        $query = "INSERT INTO $this->table (id_mantenimiento, id_equipo, descripcion, fecha_inicio, fecha_fin) VALUES (:id_mantenimiento, :id_equipo, :descripcion, :fecha_inicio, :fecha_fin)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_mantenimiento", $id_mantenimiento);
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
        $id_mantenimiento = $data['id_mantenimiento'];
        $id_equipo        = $data['id_equipo'];
        $descripcion      = $data['descripcion'];
        $fecha_inicio     = $data['fecha_inicio'];
        $fecha_fin        = $data['fecha_fin'];

        $query = "UPDATE $this->table SET id_mantenimiento = :id_mantenimiento, id_equipo = :id_equipo, descripcion = :descripcion, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin WHERE id_mantenimiento = :id_mantenimiento";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_mantenimiento", $id_mantenimiento);
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
