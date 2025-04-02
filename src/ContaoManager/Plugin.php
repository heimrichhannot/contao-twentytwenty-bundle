<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:11
 */

namespace HeimrichHannot\TwentyTwentyBundle\ContaoManager;


use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use HeimrichHannot\TwentyTwentyBundle\HeimrichHannotTwentyTwentyBundle;
use HeimrichHannot\UtilsBundle\Util\ContainerUtil;

class Plugin implements BundlePluginInterface
{
    /**
     * {@inheritdoc}
     */
    public function getBundles(ParserInterface $parser): array
    {
        return [
            BundleConfig::create(HeimrichHannotTwentyTwentyBundle::class)->setLoadAfter([ContaoCoreBundle::class])
        ];
    }

}