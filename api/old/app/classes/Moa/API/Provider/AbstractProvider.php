<?php
namespace Moa\API\Provider;

/**
 * Abstract API provider for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 */
abstract class AbstractProvider {

    /**
     * @method createIdent
     * @param string $name
     * @return string
     * @protected
     */
    protected function createIdent($name)
    {
        $name = strtolower($name);
        $name = preg_replace('~[^A-Z0-9\s]~i', '', $name);
        $name = str_replace(' ', '-', $name);
        return $name;
    }

}