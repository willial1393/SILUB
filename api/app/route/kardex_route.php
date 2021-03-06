<?php

use App\Model\KardexModel;

$app->group('/kardex/', function () {

    $this->get('', function ($req, $res, $args) {
        $um = new KardexModel();

        $res->write(
            json_encode($um->getAll(), JSON_UNESCAPED_UNICODE)
        );

        return $res;
    });

    $this->get('{id}', function ($req, $res, $args) {
        $um = new KardexModel();

        return $res
            ->getBody()
            ->write(
                json_encode($um->get($args['id']), JSON_UNESCAPED_UNICODE)
            );
    });
});
