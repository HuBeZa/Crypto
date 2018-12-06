<?php

class LiveRatesPageController extends Controller {

    public function __construct($f3) {
        parent::__construct($f3, 'rates.live');
    }

    public function render() {
        $api = $this->f3->get('ratesAPI');
        $rates = $api->getLastRates();

        if (!$rates) {
            $this->renderError();
            return;
        }

        $this->f3->set('liveRates', $rates);
        $this->renderTemplate('liveRates.htm');
    }
}