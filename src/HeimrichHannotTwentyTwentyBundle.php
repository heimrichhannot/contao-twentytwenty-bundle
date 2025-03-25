<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:08
 */

namespace HeimrichHannot\TwentyTwentyBundle\DependencyInjection;


use HeimrichHannot\TwentyTwentyBundle\DependencyInjection\HeimrichHannotTwentyTwentyExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class HeimrichHannotTwentyTwentyBundle extends Bundle
{
    /**
    * {@inheritdoc}
    */
    public function getContainerExtension()
    {
        return new HeimrichHannotTwentyTwentyExtension();
    }
    
}