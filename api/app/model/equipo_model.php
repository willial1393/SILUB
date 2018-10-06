<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class EquiposModel
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

            $stm = $this->db->prepare("SELECT e.*,t.tipo,t.total FROM equipo AS e, tipo_equipo AS t WHERE e.id_tipo_equipo = t.id_tipo_equipo");
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

            $stm = $this->db->prepare("SELECT e.*,t.tipo,t.total FROM equipo AS e, tipo_equipo AS t WHERE e.id_tipo_equipo = t.id_tipo_equipo AND e.id_equipo = ?");
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

        $descripcion = $data['descripcion'];
        $tipo        = $data['tipo'];

        $query = "call insert_equipo(:descripcion, :tipo)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("descripcion", $descripcion);
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
        $id_equipo      = $data['id_equipo'];
        $id_tipo_equipo = $data['id_tipo_equipo'];
        $id_estante     = $data['id_estante'];
        $descripcion    = $data['descripcion'];
        $serial         = $data['serial'];
        $estado         = $data['estado'];

        $query = "CALL update_equipo(:id_equip:, :id_tipo_equipo, :id_estante, :serial, :descripcion, :estado)";

        try {

            $stmt = $this->db->prepare($query);
            $stmt->bindParam("id_equipo", $id_equipo);
            $stmt->bindParam("id_tipo_equipo", $id_tipo_equipo);
            $stmt->bindParam("id_estante", $id_estante);
            $stmt->bindParam("descripcion", $descripcion);
            $stmt->bindParam("serial", $serial);
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
