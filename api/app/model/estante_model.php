<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class EstanteModel
{
    private $db;
    private $table = 'estante';
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_estante = ?");
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

        $id_armario = $data['id_armario'];
        $nombre = $data['nombre'];

        $query = "call insert_estante(:id_armario, :nombre)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_armario", $id_armario);
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
        $id_estante = $data['id_estante'];

        $query = "DELETE FROM $this->table WHERE id_estante = :id_estante";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_estante", $id_estante);
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
        $id_estante = $data['id_estante'];
        $id_armario = $data['id_armario'];
        $nombre = $data['nombre'];

        $query = "UPDATE $this->table SET id_estante = :id_estante, id_armario = :id_armario, nombre = :nombre WHERE id_estante = :id_estante";
        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_estante", $id_estante);
            $stmt->bindParam("id_armario", $id_armario);
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
