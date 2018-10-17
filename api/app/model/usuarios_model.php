<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class UsuariosModel
{
    private $db;
    private $table = 'usuario';
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

            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_usuario = ?");
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

        $id_usuario     = $data['id_usuario'];
        $id_persona     = $data['id_persona'];
        $nombre_usuario = $data['nombre_usuario'];
        $clave          = $data['clave'];
        $tipo           = $data['tipo'];

        $query = "INSERT INTO $this->table (id_usuario, id_persona, nombre_usuario, clave, tipo) VALUES (:id_usuario, :id_persona, :nombre_usuario, :clave, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("nombre_usuario", $nombre_usuario);
            $stmt->bindParam("clave", $clave);
            $stmt->bindParam("tipo", $tipo);
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
        $id_usuario     = $data['id_usuario'];
        $id_persona     = $data['id_persona'];
        $nombre_usuario = $data['nombre_usuario'];
        $clave          = $data['clave'];
        $tipo           = $data['tipo'];

        $query = "UPDATE $this->table SET id_usuario = :id_usuario, id_persona = :id_persona, nombre_usuario = :nombre_usuario, clave = :clave, tipo = :tipo WHERE id_usuario = :id_usuario";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("nombre_usuario", $nombre_usuario);
            $stmt->bindParam("clave", $clave);
            $stmt->bindParam("tipo", $tipo);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
            return $this->response;

        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }
}
