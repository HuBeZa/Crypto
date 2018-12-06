<?php

class RatesAPI {
    private $f3;

    public function __construct($f3) {
        $this->f3 = $f3;
    }

    public function getLastRates(){
        return $this->get('/Rates/Last');
    }

    public function getRatesHistory(){
        return $this->get('/Rates/History');
    }

    private function get($path) {
        $response = \Web::instance()->request($this->buildUrl($path));
        return $this->parseResponse($response);
    }

    private function buildUrl($path) {
        $baseAddress = $this->f3->get('apiServer');
        return http_build_url($baseAddress, $path);
    }

    private function parseResponse($response) {
        if ($response['body'] && preg_grep('/HTTP\\/1\\.\\d 200/', $response['headers'])) {
            return json_decode($response['body']);
        }
        else {
            return FALSE;
        }
    }
}