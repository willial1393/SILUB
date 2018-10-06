<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class SancionModel
{
    private $db;
    private $table = 'sancion';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_sancion = ?");
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

        $id_sancion   = $data['id_sancion'];
        $id_cliente   = $data['id_cliente'];
        $descripcion  = $data['descripcion'];
        $fecha_inicio = $data['fecha_inicio'];
        $fecha_fin    = $data['fecha_fin'];

        $query = "INSERT INTO $this->table (id_sancion, id_cliente, descripcion, fecha_inicio, fecha_fin) VALUES (:id_sancion, :id_cliente, :descripcion, :fecha_inicio, :fecha_fin)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_sancion", $id_sancion);
            $stmt->bindParam("id_cliente", $id_cliente);
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
        $id_sancion   = $data['id_sancion'];
        $id_cliente   = $data['id_cliente'];
        $descripcion  = $data['descripcion'];
        $fecha_inicio = $data['fecha_inicio'];
        $fecha_fin    = $data['fecha_fin'];

        $query = "UPDATE $this->table SET id_sancion = :id_sancion, id_cliente = :id_cliente, descripcion = :descripcion, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin WHERE id_sancion = :id_sancion";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_sancion", $id_sancion);
            $stmt->bindParam("id_cliente", $id_cliente);
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
