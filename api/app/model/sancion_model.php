<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class SancionModel
{
    private $db;
    private $table = 'sancion';
    private $response;

    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }

    public function getAll()
    {
        try {
            $stm = $this->db->prepare("SELECT s.*, c.codigo as codigo, c.nombre as nombre, c.estado_cliente as estado
FROM sancion s, cliente c
WHERE s.id_cliente = c.id_cliente");
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
            $stm = $this->db->prepare("SELECT s.*, c.codigo as codigo, c.nombre as nombre, c.estado_cliente as estado
FROM sancion s, cliente c
WHERE s.id_cliente = c.id_cliente and id_sancion = ?");
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

        $id_cliente = $data['id_cliente'];
        $fecha_fin = $data['fecha_fin'];

        $query = "call sancionar_cliente(:id_cliente, :fecha_fin)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("fecha_fin", $fecha_fin);
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

        $id_sancion = $data['id_sancion'];

        $query = "DELETE FROM $this->table  WHERE  id_sancion = :id_sancion";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_sancion", $id_sancion);
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
        $id_sancion = $data['id_sancion'];
        $id_cliente = $data['id_cliente'];
        $fecha_inicio = $data['fecha_inicio'];
        $fecha_fin = $data['fecha_fin'];

        $query = "UPDATE $this->table SET id_sancion = :id_sancion, id_cliente = :id_cliente, fecha_inicio = :fecha_inicio, fecha_fin = :fecha_fin WHERE id_sancion = :id_sancion";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_sancion", $id_sancion);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("fecha_inicio", $fecha_inicio);
            $stmt->bindParam("fecha_fin", $fecha_fin);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
