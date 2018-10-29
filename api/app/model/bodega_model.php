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
            $stm = $this->db->prepare("SELECT * FROM $this->table GROUP BY nombre ASC");
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_bodega = ? ");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function getArmarios($value)
    {
        try {
            $stm = $this->db->prepare("SELECT a.*
FROM bodega b, armario a
WHERE b.id_bodega = ?
AND a.id_bodega = b.id_bodega
GROUP BY a.nombre ASC");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function insert($data)
    {

        $id_bodega = $data['id_bodega'];
        $nombre = $data['nombre'];

        $query = "INSERT INTO $this->table (id_bodega, nombre) VALUES (:id_bodega, :nombre)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("nombre", $nombre);
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
        $id_bodega = $data['id_bodega'];

        $query = "DELETE FROM $this->table WHERE id_bodega = :id_bodega";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_bodega", $id_bodega);
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
        $id_bodega = $data['id_bodega'];
        $nombre = $data['nombre'];

        $query = "UPDATE $this->table SET id_bodega = :id_bodega, nombre = :nombre WHERE id_bodega = :id_bodega";
        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("nombre", $nombre);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
