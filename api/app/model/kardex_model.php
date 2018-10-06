<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class KardexModel
{
    private $db;
    private $table = 'kardex';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_kardex = ?");
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

        $id_kardex        = $data['id_kardex'];
        $id_nombre_equipo = $data['id_nombre_equipo'];
        $fecha            = $data['fecha'];
        $cantidad         = $data['cantidad'];
        $tipo             = $data['tipo'];
        $total            = $data['total'];

        $query = "INSERT INTO $this->table (id_kardex, id_nombre_equipo, fecha, tipo, cantidad, total) VALUES (:id_kardex, :id_nombre_equipo, :fecha, :cantidad, :tipo, :total)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_kardex", $id_kardex);
            $stmt->bindParam("id_nombre_equipo", $id_nombre_equipo);
            $stmt->bindParam("fecha", $fecha);
            $stmt->bindParam("cantidad", $cantidad);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("total", $total);
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
        $id_kardex        = $data['id_kardex'];
        $id_nombre_equipo = $data['id_nombre_equipo'];
        $fecha            = $data['fecha'];
        $cantidad         = $data['cantidad'];
        $tipo             = $data['tipo'];
        $total            = $data['total'];

        $query = "UPDATE $this->table SET id_kardex = :id_kardex, id_nombre_equipo = :id_nombre_equipo, fecha = :fecha, cantidad = :cantidad, tipo = :tipo WHERE id_kardex = :id_kardex, total = :total";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_kardex", $id_kardex);
            $stmt->bindParam("id_nombre_equipo", $id_nombre_equipo);
            $stmt->bindParam("fecha", $fecha);
            $stmt->bindParam("cantidad", $cantidad);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("total", $total);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
