<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class PrestamosModel
{
    private $db;
    private $table = 'prestamo';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_prestamo = ?");
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

        $id_prestamo             = $data['id_prestamo'];
        $id_equipo               = $data['id_equipo'];
        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];
        $id_cliente              = $data['id_cliente'];
        $fecha_solicitud         = $data['fecha_solicitud'];
        $fecha_devolucion        = $data['fecha_devolucion'];
        $estado                  = $data['estado'];

        $query = "INSERT INTO $this->table (id_prestamo, id_equipo, id_solicitud_adecuacion, id_cliente, fecha_solicitud, fecha_devolucion, estado) VALUES (:id_prestamo, :id_equipo, :id_solicitud_adecuacion, :id_cliente, :fecha_solicitud, :fecha_devolucion, :estado)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_prestamo", $id_prestamo);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("fecha_solicitud", $fecha_solicitud);
            $stmt->bindParam("fecha_devolucion", $fecha_devolucion);
            $stmt->bindParam("estado", $estado);
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
        $id_prestamo             = $data['id_prestamo'];
        $id_equipo               = $data['id_equipo'];
        $id_solicitud_adecuacion = $data['id_solicitud_adecuacion'];
        $id_cliente              = $data['id_cliente'];
        $fecha_solicitud         = $data['fecha_solicitud'];
        $fecha_devolucion        = $data['fecha_devolucion'];
        $estado                  = $data['estado'];

        $query = "UPDATE $this->table SET id_prestamo = :id_prestamo, id_equipo = :id_equipo, id_solicitud_adecuacion = :id_solicitud_adecuacion, id_cliente = :id_cliente, fecha_solicitud = :fecha_solicitud, fecha_devolucion = :fecha_devolucion, estado = :estado WHERE id_prestamo = :id_prestamo";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_prestamo", $id_prestamo);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_solicitud_adecuacion", $id_solicitud_adecuacion);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("fecha_solicitud", $fecha_solicitud);
            $stmt->bindParam("fecha_devolucion", $fecha_devolucion);
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
