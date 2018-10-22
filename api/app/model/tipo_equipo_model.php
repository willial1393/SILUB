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

    public function update($data)
    {
        $id_nombre_equipo = $data['id_nombre_equipo'];
        $nombre = $data['nombre'];
        $total = $data['total'];
        $tipo = $data['tipo'];

        $query = "UPDATE $this->table SET id_nombre_equipo = :id_nombre_equipo, nombre = :nombre, total = :total, tipo = :tipo WHERE id_nombre_equipo = :id_nombre_equipo";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_nombre_equipo", $id_nombre_equipo);
            $stmt->bindParam("nombre", $nombre);
            $stmt->bindParam("total", $total);
            $stmt->bindParam("tipo", $tipo);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
