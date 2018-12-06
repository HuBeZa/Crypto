<?php

require_once("vendor/autoload.php");

$f3 = Base::instance();

$f3->config('./app/config/config.ini');
$f3->config('./app/config/routes.ini');
$f3->set('ratesAPI', new RatesAPI($f3));

$f3->run();