<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class TipoEquipoModel
{
    private $db;
    private $table = 'tipo_equipo';
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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_nombre_equipo = ?");
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

        $total = $data['total'];
        $tipo = $data['tipo'];

        $query = "INSERT INTO $this->table SET tipo = :tipo, total = :total";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("total", $total);
            $stmt->bindParam("tipo", $tipo);
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

        $id_tipo_equipo = $data['id_tipo_equipo'];

        $query = "DELETE FROM tipo_equipo WHERE id_tipo_equipo = :id_tipo_equipo";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
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
        $id_tipo_equipo = $data['id_tipo_equipo'];
        $tipo = $data['tipo'];
        $total = $data['total'];

        $query = "UPDATE $this->table SET id_tipo_equipo = :id_tipo_equipo, tipo = :tipo, total = :total  WHERE id_tipo_equipo = :id_tipo_equipo";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("total", $total);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
