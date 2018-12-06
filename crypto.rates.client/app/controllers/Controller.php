<?php

abstract class Controller {
    protected $f3;
    protected $name;

    protected function __construct($f3, $name) {
        $this->f3 = $f3;
        $this->name = $name;
    }

    public function beforeroute() {
        $this->f3->set('activePage', $this->name);
        $this->renderTemplate('header.htm');
    }

    public function afterroute() {
        $this->renderTemplate('footer.htm');
    }

    protected function renderError() {
        $this->renderTemplate('error.htm');
    }

    protected function renderTemplate($templateName) {
        echo \Template::instance()->render($templateName);
    }
}