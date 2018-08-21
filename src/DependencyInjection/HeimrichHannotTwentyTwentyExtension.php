<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:09
 */

namespace HeimrichHannot\TwentyTwentyBundle\DependencyInjection;


use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Extension\Extension;
use Symfony\Component\DependencyInjection\Loader\YamlFileLoader;

class HeimrichHannotTwentyTwentyExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        
        $loader->load('services.yml');
    }
}