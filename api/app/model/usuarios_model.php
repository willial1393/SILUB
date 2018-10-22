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
            $stm = $this->db->prepare("SELECT * FROM $this->table WHERE id_usuario = ?");
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

        $id_usuario = $data['id_usuario'];
        $nombre_usuario = $data['nombre_usuario'];
        $clave = $data['clave'];
        $tipo = $data['tipo'];
        $codigo = $data['codigo'];
        $estado = $data['estado'];
        $correo_electronico = $data['correo_electronico'];
        $nombre_persona = $data['nombre_persona'];

        $query = "INSERT INTO $this->table (id_usuario, nombre_usuario, clave, tipo, codigo, estado, correo_electronico, nombre_persona) VALUES (:id_usuario, :nombre_usuario, :clave, :tipo, :codigo, :estado, :correo_electronico, :nombre_persona)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->bindParam("nombre_usuario", $nombre_usuario);
            $stmt->bindParam("clave", $clave);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("codigo", $codigo);
            $stmt->bindParam("estado", $estado);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre_persona", $nombre_persona);
            $stmt->execute();

            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = '';
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function delete($data)
    {
        $id_usuario = $data['id_usuario'];

        $query = "DELETE FROM $this->table WHERE  id_usuario = :id_usuario";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->execute();

            $this->response->setResponse(true, 'Successfully Insertion');
            $this->response->result = '';
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }

    public function update($data)
    {
        $id_usuario = $data['id_usuario'];
        $nombre_usuario = $data['nombre_usuario'];
        $clave = $data['clave'];
        $tipo = $data['tipo'];
        $codigo = $data['codigo'];
        $estado = $data['estado'];
        $correo_electronico = $data['correo_electronico'];
        $nombre_persona = $data['nombre_persona'];

        $query = "UPDATE $this->table SET id_usuario = :id_usuario, nombre_usuario = :nombre_usuario, clave = :clave, tipo = :tipo, codigo = :codigo, estado = :estado, correo_electronico = :correo_electronico, nombre_persona = :nombre_persona WHERE id_usuario = :id_usuario";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->bindParam("nombre_usuario", $nombre_usuario);
            $stmt->bindParam("clave", $clave);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("codigo", $codigo);
            $stmt->bindParam("estado", $estado);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre_persona", $nombre_persona);
            $stmt->execute();

            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = '';
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
