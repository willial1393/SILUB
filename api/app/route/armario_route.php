<?php

use App\Model\ArmarioModel;

$app->group('/armarios/', function () {

    $this->get('', function ($req, $res, $args) {
        $um = new ArmarioModel();

        $res->write(
            json_encode($um->getAll(), JSON_UNESCAPED_UNICODE)
        );

        return $res;
    });

    $this->get('{id}', function ($req, $res, $args) {
        $um = new ArmarioModel();

        return $res
            ->getBody()
            ->write(
                json_encode($um->get($args['id']), JSON_UNESCAPED_UNICODE)
            );
    });
    $this->get('estantes/{id}', function ($req, $res, $args) {
        $um = new ArmarioModel();

        return $res
            ->getBody()
            ->write(
                json_encode($um->getEstantes($args['id']), JSON_UNESCAPED_UNICODE)
            );
    });

    $this->post('', function ($req, $res) {
        $um = new ArmarioModel();

        return $res
            ->getBody()
            ->write(
                json_encode(
                    $um->insert(
                        $req->getParsedBody()
                    )
                    , JSON_UNESCAPED_UNICODE)
            );
    });

    $this->post('delete/', function ($req, $res) {
        $um = new ArmarioModel();

        return $res
            ->getBody()
            ->write(
                json_encode(
                    $um->delete(
                        $req->getParsedBody()
                    )
                    , JSON_UNESCAPED_UNICODE)
            );
    });

    $this->put('', function ($req, $res) {
        $um = new ArmarioModel();
        return $res
            ->getBody()
            ->write(
                json_encode(
                    $um->update(
                        $req->getParsedBody()
                    )
                    , JSON_UNESCAPED_UNICODE)
            );
    });
});
