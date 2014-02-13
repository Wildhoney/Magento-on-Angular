<?php

class CurrenciesController extends MageController {

    public function getCurrencies() {

        $baseCode = Mage::app()->getBaseCurrencyCode();
        $options  = array();

        $allowedCurrencies = Mage::getModel('directory/currency')->getConfigAllowCurrencies();
        $rates = Mage::getModel('directory/currency')->getCurrencyRates($baseCode, array_values($allowedCurrencies));

        foreach ($rates as $symbol => $rate) {

            array_push($options, array(
                'code'   => $symbol,
                'symbol' => Mage::app()->getLocale()->currency($symbol)->getSymbol(),
                'rate'   => round($rate, 20),
                'base'   => ($symbol === $baseCode)
            ));

        }

        if (count($rates) === 0) {

            return Response::json(array(array(
                'code'   => $baseCode,
                'symbol' => Mage::app()->getLocale()->currency($baseCode)->getSymbol(),
                'rate'   => 1,
                'base'   => true
            )));

        }

        return Response::json($options);

    }

}