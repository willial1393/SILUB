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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_laboratorio = ?");
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
        $descripcion    = $data['descripcion'];
        $nombre         = $data['nombre'];

        $query = "INSERT INTO $this->table (id_laboratorio, descripcion, nombre) VALUES (:id_laboratorio, :descripcion, :nombre)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
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
        $id_laboratorio = $data['id_laboratorio'];
        $descripcion    = $data['descripcion'];
        $nombre         = $data['nombre'];

        $query = "UPDATE $this->table SET id_laboratorio = :id_laboratorio, descripcion = :descripcion, nombre = :nombre WHERE id_laboratorio = :id_laboratorio";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_laboratorio", $id_laboratorio);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("nombre", $nombre);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
