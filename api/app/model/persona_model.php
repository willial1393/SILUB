<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class PersonasModel
{
    private $db;
    private $table = 'persona';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_persona = ?");
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

        $id_persona = $data['id_persona'];
        $correo_electronico  = $data['correo_electronico'];
        $nombre      = $data['nombre'];
        $estado   = $data['estado'];

        $query = "INSERT INTO $this->table (id_persona, correo_electronico, nombre, estado) VALUES (:id_persona, :correo_electronico, :nombre, :estado)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("correo_electronico", $correo_electronico);            
            $stmt->bindParam("nombre", $nombre);
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
        $id_persona = $data['id_persona'];
        $correo_electronico  = $data['correo_electronico'];
        $nombre      = $data['nombre'];
        $estado   = $data['estado'];

        $query = "UPDATE $this->table SET id_persona = :id_persona, correo_electronico = :correo_electronico, nombre = :nombre, estado = :estado WHERE id_persona = :id_persona";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("correo_electronico", $correo_electronico);            
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
