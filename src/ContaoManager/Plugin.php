<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:11
 */

namespace HeimrichHannot\TwentyTwentyBundle\src\ContaoManager;


use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use Contao\ManagerPlugin\Config\ContainerBuilder;
use Contao\ManagerPlugin\Config\ExtensionPluginInterface;
use HeimrichHannot\BegBundle\HeimrichHannotBegBundle;
use HeimrichHannot\TwentyTwentyBundle\src\src\HeimrichHannotTwentyTwentyBundle;
use HeimrichHannot\UtilsBundle\Container\ContainerUtil;

class Plugin implements BundlePluginInterface, ExtensionPluginInterface
{
    /**
     * {@inheritdoc}
     */
    public function getBundles(ParserInterface $parser)
    {
        return [
            BundleConfig::create(HeimrichHannotTwentyTwentyBundle::class)->setLoadAfter([ContaoCoreBundle::class,HeimrichHannotBegBundle::class])
        ];
    }
    
    /**
     * {@inheritdoc}
     */
    public function getExtensionConfig($extensionName, array $extensionConfigs, ContainerBuilder $container) {
        return ContainerUtil::mergeConfigFile(
            'huh_encore',
            $extensionName,
            $extensionConfigs,
            $container->getParameter('kernel.project_dir').'/vendor/heimrichhannot/contao-twentytwenty-bundle/src/Resources/config/config_encore.yml'
        );
    }
}