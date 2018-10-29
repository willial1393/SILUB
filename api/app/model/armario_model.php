<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class ArmarioModel
{
    private $db;
    private $table = 'armario';
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
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function get($value)
    {
        try {
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_armario = ?");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function getEstantes($value)
    {
        try {
            $stm = $this->db->prepare("SELECT e.*
FROM armario a, estante e
WHERE a.id_armario = ?
AND a.id_armario = e.id_armario
GROUP BY e.nombre ASC");
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

        $query = "call insert_armario(:id_bodega, :nombre)";
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
        $id_armario = $data['id_armario'];

        $query = "DELETE FROM $this->table WHERE id_armario = :id_armario";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_armario", $id_armario);
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
        $id_armario = $data['id_armario'];
        $id_bodega = $data['id_bodega'];
        $nombre = $data['nombre'];

        $query = "UPDATE $this->table SET id_armario = :id_armario, id_bodega = :id_bodega, nombre = :nombre WHERE id_armario = :id_armario";
        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_armario", $id_armario);
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
