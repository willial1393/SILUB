<?php
namespace App\Model;

use App\Lib\Database;
use App\Lib\Response;

class LoginModel
{
    private $db;
    private $response;

    public function __CONSTRUCT()
    {
        $this->db       = Database::StartUp();
        $this->response = new Response();
    }

    public function login($data)
    {

        $usuario = $data['usuario'];
        $clave  = $data['clave'];

        $query = "CALL _login(:usuario, :clave)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam("usuario", $usuario);
            $stmt->bindParam("clave", $clave);            
            $stmt->execute();
            $this->response->setResponse(true, 'Successfully login');
            $this->response->result = $stmt->fetch()?true:false;
        } catch (\Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
        return $this->response;
    }
}
