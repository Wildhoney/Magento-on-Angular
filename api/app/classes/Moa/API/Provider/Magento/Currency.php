<?php
namespace Moa\API\Provider\Magento;

/**
 * Magento API provider traits for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 */
trait Currency {

    /**
     * @method getCurrencies
     * @return array
     */
    public function getCurrencies()
    {
        $baseCode = \Mage::app()->getBaseCurrencyCode();
        $options  = array();

        $allowedCurrencies = \Mage::getModel('directory/currency')->getConfigAllowCurrencies();
        $rates = \Mage::getModel('directory/currency')->getCurrencyRates($baseCode, array_values($allowedCurrencies));

        if (count($rates) > 0) {
            foreach ($rates as $symbol => $rate) {
                array_push($options, array(
                    'code'   => $symbol,
                    'symbol' => \Mage::app()->getLocale()->currency($symbol)->getSymbol(),
                    'rate'   => round($rate, 20),
                    'base'   => ($symbol === $baseCode)
                ));
            }
        } else {
            $options[] = array(
                'code'   => $baseCode,
                'symbol' => \Mage::app()->getLocale()->currency($baseCode)->getSymbol(),
                'rate'   => 1,
                'base'   => true
            );
        }

        return $options;
    }

}