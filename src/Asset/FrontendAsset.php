<?php
/**
 * Contao Open Source CMS
 *
 * Copyright (c) 2020 Heimrich & Hannot GmbH
 *
 * @author  Thomas Körner <t.koerner@heimrich-hannot.de>
 * @license http://www.gnu.org/licences/lgpl-3.0.html LGPL
 */


namespace HeimrichHannot\TwentyTwentyBundle\Asset;

#
//use HeimrichHannot\UtilsBundle\Container\ContainerUtil;
use HeimrichHannot\UtilsBundle\Util\ContainerUtil;

class FrontendAsset
{
    /**
     * @var ContainerUtil
     */
    private $containerUtil;
    /**
     * @var \HeimrichHannot\EncoreBundle\Asset\FrontendAsset
     */
    private $encoreFrotnendAsset;

    /**
     * FrontendAsset constructor.
     */
    public function __construct(ContainerUtil $containerUtil )
    {
        $this->containerUtil = $containerUtil;
    }

    public function setEncoreFrontendAsset(\HeimrichHannot\EncoreBundle\Asset\FrontendAsset $encoreFrontendAsset)
    {
        $this->encoreFrotnendAsset = $encoreFrontendAsset;
    }

    public function addFrontendAssets()
    {
        if (!$this->containerUtil->isFrontend()) {
            return;
        }
        if ($this->encoreFrotnendAsset) {
            $this->encoreFrotnendAsset->addActiveEntrypoint('contao-twentytwenty-bundle');
        }

        $publicFolder = 'bundles/heimrichhannottwentytwenty/';
        $GLOBALS['TL_CSS']['twentytwenty']            = $publicFolder.'vendor/twentytwenty/css/twentytwenty.css';
        $GLOBALS['TL_JAVASCRIPT']['twentytwenty']     = $publicFolder.'vendor/twentytwenty/js/jquery.event.move.js';
        $GLOBALS['TL_JAVASCRIPT']['event-move']       = $publicFolder.'vendor/twentytwenty/js/jquery.twentytwenty.js';
        $GLOBALS['TL_JAVASCRIPT']['huh_twentytwenty'] = $publicFolder.'js/contao-twentytwenty.es6.js';
    }
}