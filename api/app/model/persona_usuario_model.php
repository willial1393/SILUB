<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class PersonaUsuarioModel
{
    private $db;
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

            $stm = $this->db->prepare("SELECT u.id_usuario,p.*,u.nombre_usuario,u.clave,u.tipo FROM persona as p, usuario as u WHERE u.id_persona = p.id_persona AND p.estado != 'ELIMINADO'");
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
            $stm = $this->db->prepare("SELECT u.id_usuario,p.*,u.nombre_usuario,u.clave,u.tipo FROM persona as p, usuario as u WHERE p.codigo = ? AND p.estado != 'ELIMINADO'");
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
        $correo_electronico  = $data['correo_electronico'];
        $nombre      = $data['nombre'];
        $estado   = $data['estado'];
        $nombre_usuario   = $data['nombre_usuario'];
        $clave   = $data['clave'];
        $tipo   = $data['tipo'];
        $codigo   = $data['codigo'];


        $query = "CALL insert_persona_usuario(:correo_electronico, :nombre, :estado, :nombre_usuario, :clave, :tipo, :codigo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre", $nombre);            
            $stmt->bindParam("estado", $estado);
            $stmt->bindParam("nombre_usuario", $nombre_usuario);   
            $stmt->bindParam("clave", $clave);            
            $stmt->bindParam("tipo", $tipo);            
            $stmt->bindParam("codigo", $codigo);            
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
        $id_usuario = $data['id_usuario'];
        $correo_electronico  = $data['correo_electronico'];
        $nombre      = $data['nombre'];
        $estado   = $data['estado'];
        $codigo   = $data['codigo'];
        $nombre_usuario   = $data['nombre_usuario'];
        $clave   = $data['clave'];
        $tipo   = $data['tipo'];

        $query = "CALL update_persona_usuario(:id_persona, :id_usuario, :correo_electronico, :nombre, :estado, :codigo, :nombre_usuario, :clave, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("id_usuario", $id_usuario);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre", $nombre);            
            $stmt->bindParam("estado", $estado);
            $stmt->bindParam("codigo", $codigo);            
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
