<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class BodegaModel
{
    private $db;
    private $table = 'bodega';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE estado!='ELIMINADO'");
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_bodega = ? AND estado!='ELIMINADO'");
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

        $id_bodega = $data['id_bodega'];
        $descripcion = $data['descripcion'];
        $estado = $data['estado'];

        $query = "INSERT INTO $this->table (id_bodega, descripcion,estado) VALUES (:id_bodega, :descripcion, :estado)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("estado", $estado);
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
        $id_bodega = $data['id_bodega'];
        $descripcion = $data['descripcion'];
        $estado = $data['estado'];

        $query = "UPDATE $this->table SET id_bodega = :id_bodega, descripcion = :descripcion, estado = :estado WHERE id_bodega = :id_bodega";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("estado", $estado);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
