<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class EquiposModel
{
    private $db;
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT e.*,t.tipo,t.total FROM equipo AS e, tipo_equipo AS t WHERE e.id_tipo_equipo = t.id_tipo_equipo");
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
            $stm = $this->db->prepare("SELECT e.*,t.tipo,t.total FROM equipo AS e, tipo_equipo AS t WHERE e.id_tipo_equipo = t.id_tipo_equipo AND e.id_equipo = ? ");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function getSerial($value)
    {
        try {
            $stm = $this->db->prepare("CALL get_full_equipo(?)");
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
        $cantidad = $data['cantidad'];
        $descripcion = $data['descripcion'];
        $tipo = $data['tipo'];
        $query = "call insert_varios_equipos(:cantidad, :descripcion, :tipo)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("cantidad", $cantidad);
            $stmt->bindParam("descripcion", $descripcion);
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
        $id_equipo = $data['id_equipo'];
        $id_tipo_equipo = $data['id_tipo_equipo'];

        $query = "call delete_equipo(:id_equipo, :id_tipo_equipo)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function darDeBaja($data)
    {
        $id_equipo = $data['id_equipo'];
        $id_tipo_equipo = $data['id_tipo_equipo'];

        $query = "call dar_baja_equipo(:id_equipo, :id_tipo_equipo)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
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
        $id_equipo = $data['id_equipo'];
        $id_tipo_equipo = $data['id_tipo_equipo'];
        $id_estante = $data['id_estante'];
        $descripcion = $data['descripcion'];
        $serial = $data['serial'];
        $estado_equipo = $data['estado_equipo'];

        $query = "CALL update_equipo(:id_equipo, :id_tipo_equipo, :id_estante, :serial, :descripcion, :estado_equipo)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
            $stmt->bindParam("id_estante", $id_estante);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("serial", $serial);
            $stmt->bindParam("estado_equipo", $estado_equipo);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
