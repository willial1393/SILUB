<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class ClientesModel
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
            $stm = $this->db->prepare("SELECT c.id_cliente,p.*,c.tipo FROM persona as p, cliente as c WHERE c.id_persona = p.id_persona AND p.estado_persona != 'ELIMINADO'");
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
        try {
            $stm = $this->db->prepare("SELECT c.id_cliente,p.*,c.tipo FROM persona as p, cliente as c WHERE c.id_persona = p.id_persona AND p.estado_persona != 'ELIMINADO' AND p.codigo = ? ");
            $stm->execute(array($value));

            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();

            return $this->response;
        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
            return $this->response;
        }
    }

    public function getClienteSancionado($value)
    {
        try {
            $stm = $this->db->prepare("CALL cliente_sancionado(?)");
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

        $correo_electronico = $data['correo_electronico'];
        $nombre_persona = $data['nombre_persona'];
        $estado_persona = $data['estado_persona'];
        $codigo = $data['codigo'];
        $tipo = $data['tipo'];

        $query = "CALL insert_persona_cliente(:correo_electronico, :nombre_persona, :estado_persona, :codigo, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre_persona", $nombre_persona);
            $stmt->bindParam("estado_persona", $estado_persona);
            $stmt->bindParam("codigo", $codigo);
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
        $id_cliente = $data['id_cliente'];
        $id_persona = $data['id_persona'];
        $correo_electronico = $data['correo_electronico'];
        $nombre_persona = $data['nombre_persona'];
        $estado_persona = $data['estado_persona'];
        $codigo = $data['codigo'];
        $tipo = $data['tipo'];

        $query = "call update_persona_cliente(:id_cliente, :id_persona, :correo_electronico, :nombre_persona, :estado_persona, :codigo, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("id_persona", $id_persona);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre_persona", $nombre_persona);
            $stmt->bindParam("estado_persona", $estado_persona);
            $stmt->bindParam("codigo", $codigo);
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
