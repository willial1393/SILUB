<?php
use App\Model\PrestamosModel;

$app->group('/prestamos/', function () {

    $this->get('', function ($req, $res, $args) {
        $um = new PrestamosModel();

        $res->write(
            json_encode($um->getAll(), JSON_UNESCAPED_UNICODE)
        );

        return $res;
    });

    $this->get('{id}', function ($req, $res, $args) {
        $um = new PrestamosModel();

        return $res
            ->getBody()
            ->write(
                json_encode($um->get($args['id']), JSON_UNESCAPED_UNICODE)
            );
    });

    $this->post('', function ($req, $res) {
        $um = new PrestamosModel();

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

    $this->put('', function ($req, $res) {
        $um = new PrestamosModel();
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
