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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE estado_laboratorio != 'ELIMINADO'");
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_laboratorio = ? AND estado_laboratorio != 'ELIMINADO'");
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

        $id_laboratorio = $data['id_laboratorio'];
        $descripcion = $data['descripcion'];
        $nombre = $data['nombre'];
        $estado_laboratorio = $data['estado_laboratorio'];

        $query = "INSERT INTO $this->table (id_laboratorio, descripcion, nombre, estado_laboratorio) VALUES (:id_laboratorio, :descripcion, :nombre, :estado_laboratorio)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
            $stmt->bindParam("estado_laboratorio", $estado_laboratorio);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = true;
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function update($data)
    {
        $id_laboratorio = $data['id_laboratorio'];
        $descripcion = $data['descripcion'];
        $nombre = $data['nombre'];
        $estado_laboratorio = $data['estado_laboratorio'];

        $query = "UPDATE $this->table SET id_laboratorio = :id_laboratorio, descripcion = :descripcion, nombre = :nombre, estado_laboratorio = :estado_laboratorio WHERE id_laboratorio = :id_laboratorio";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
            $stmt->bindParam("estado_laboratorio", $estado_laboratorio);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
