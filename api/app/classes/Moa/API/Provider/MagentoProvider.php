<?php
namespace Moa\API\Provider;

/**
 * Magento API provider for Laravel
 *
 * @author Raja Kapur <raja.kapur@gmail.com>
 * @author Adam Timberlake <adam.timberlake@gmail.com>
 * @author Vallabh Kansagara <vrkansagara@gmail.com>
 */
class MagentoProvider extends AbstractProvider implements ProviderInterface
{

    /**
     * @constant IMAGE_PATH
     * @type string
     */
    const IMAGE_PATH = 'localhost';

    use Magento\Account,
        Magento\Cart,
        Magento\Category,
        Magento\Currency,
        Magento\Product;

    /**
     * Initialize the Mage environment.
     *
     * @constructor
     */
    public function __construct($config)
    {
//        umask(0);
//        chdir($config['path']);
//        require_once $config['path'] . '/app/Mage.php';
//        \Mage::app($config['store']);

        /**
         * @todo  Add magento config path from the repo config.
         * @fixme fix this line ASAP
         */
        umask(0);
        chdir('/home/vallabh/www/Magento-on-Angular/magento1921/');
        require_once 'app/Mage.php';
        \Mage::app(0);
    }

    /**
     * Start sessions for Magento.
     *
     * @method startSession
     * @return void
     */
    public function startSession()
    {
        session_start();
        \Mage::getSingleton('customer/session')->start();
    }

    /**
     * @method frontEndSession
     * @return void
     */
    private function frontEndSession()
    {
        \Mage::getSingleton('core/session', array('name' => 'frontend'));
    }

}