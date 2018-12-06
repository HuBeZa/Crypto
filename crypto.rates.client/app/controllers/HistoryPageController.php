<?php

class HistoryPageController extends Controller {

    public function __construct($f3) {
        parent::__construct($f3, 'rates.history');
    }

    public function render() {
        $api = $this->f3->get('ratesAPI');
        $rates = $api->getRatesHistory();

        if (!$rates) {
            $this->renderError();
            return;
        }

        $this->f3->set('historicRates', $rates);
        $this->renderTemplate('history.htm');
    }
}