<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class EstantesModel
{
    private $db;
    private $table = 'estante';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_estante = ?");
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

        $id_estante = $data['id_estante'];
        $id_bodega  = $data['id_bodega'];
        $armario = $data['armario'];
        $estante = $data['estante'];
        $descripcion = $data['descripcion'];

        $query = "INSERT INTO $this->table (id_estante, id_bodega, armario, estante, descripcion) VALUES (:id_estante, :id_bodega, :armario, :estante, :descripcion)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_estante", $id_estante);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("armario", $armario);
            $stmt->bindParam("estante", $estante);
            $stmt->bindParam("descripcion", $descripcion);
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

        $id_estante = $data['id_estante'];
        $id_bodega = $data['id_bodega'];
        $armario = $data['armario'];
        $estante = $data['estante'];
        $descripcion = $data['descripcion'];

        $query = "UPDATE $this->table SET id_estante = :id_estante, id_bodega = :id_bodega, aramrio = :aramrio, estante = :estante, descripcion = :descripcion WHERE id_estante = :id_estante";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_estante", $id_estante);
            $stmt->bindParam("id_bodega", $id_bodega);
            $stmt->bindParam("armario", $armario);
            $stmt->bindParam("estante", $estante);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
