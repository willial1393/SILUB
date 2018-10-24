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
            $stm = $this->db->prepare("SELECT * FROM cliente");
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
            $stm = $this->db->prepare("SELECT * FROM cliente c WHERE c.codigo = ?");
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

        $tipo = $data['tipo'];
        $codigo = $data['codigo'];
        $estado_cliente = $data['estado_cliente'];
        $correo_electronico = $data['correo_electronico'];
        $nombre = $data['nombre'];

        $query = "INSERT INTO cliente (tipo, codigo, estado_cliente, correo_electronico, nombre) VALUES (:tipo, :codigo, :estado_cliente, :correo_electronico, :nombre)";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("codigo", $codigo);
            $stmt->bindParam("estado_cliente", $estado_cliente);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre", $nombre);
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
        $id_cliente = $data['id_cliente'];

        $query = "DELETE FROM cliente WHERE  id_cliente = :id_cliente";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_cliente", $id_cliente);
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
        $id_cliente = $data['id_cliente'];
        $tipo = $data['tipo'];
        $codigo = $data['codigo'];
        $estado_cliente = $data['estado_cliente'];
        $correo_electronico = $data['correo_electronico'];
        $nombre = $data['nombre'];

        $query = "UPDATE cliente SET id_cliente = :id_cliente, correo_electronico = :correo_electronico, nombre = :nombre, estado_cliente = :estado_cliente, codigo = :codigo, tipo = :tipo WHERE id_cliente = :id_cliente";
        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_cliente", $id_cliente);
            $stmt->bindParam("tipo", $tipo);
            $stmt->bindParam("codigo", $codigo);
            $stmt->bindParam("estado_cliente", $estado_cliente);
            $stmt->bindParam("correo_electronico", $correo_electronico);
            $stmt->bindParam("nombre", $nombre);
            $stmt->execute();
            $this->response->setResponse(true, "Successfully Updated");
            $this->response->result = "";
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
