<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class LaboratoriosModel
{
    private $db;
    private $table = 'laboratorio';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE estado != 'ELIMINADO'");
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_laboratorio = ? AND estado != 'ELIMINADO'");
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

        $id_laboratorio = $data['id_laboratorio'];
        $descripcion = $data['descripcion'];
        $nombre = $data['nombre'];
        $estado = $data['estado'];

        $query = "INSERT INTO $this->table (id_laboratorio, descripcion, nombre, estado) VALUES (:id_laboratorio, :descripcion, :nombre, :estado)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
            $stmt->bindParam("estado", $estado);
            $stmt->execute();

            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = true;
        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function update($data)
    {
        $id_laboratorio = $data['id_laboratorio'];
        $descripcion = $data['descripcion'];
        $nombre = $data['nombre'];
        $estado = $data['estado'];

        $query = "UPDATE $this->table SET id_laboratorio = :id_laboratorio, descripcion = :descripcion, nombre = :nombre, estado = :estado WHERE id_laboratorio = :id_laboratorio";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
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
