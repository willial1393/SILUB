<?php

namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class KardexModel
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
            $stm = $this->db->prepare("SELECT k.*, t.tipo as equipo
FROM kardex k, tipo_equipo t
WHERE k.id_tipo_equipo = t.id_tipo_equipo");
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
            $stm = $this->db->prepare("SELECT k.*, t.tipo as equipo
FROM kardex k, tipo_equipo t
WHERE k.id_tipo_equipo = t.id_tipo_equipo AND id_kardex = ?");
            $stm->execute(array($value));
            $this->response->setResponse(true);
            $this->response->result = $stm->fetch();
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
