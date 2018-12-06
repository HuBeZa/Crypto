<?php

class PageNotFoundController extends Controller {

    public function __construct($f3) {
        parent::__construct($f3, '');
    }

    public function render() {
        $this->renderTemplate('404.htm');
    }
}