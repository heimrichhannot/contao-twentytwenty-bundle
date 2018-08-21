<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:44
 */

array_insert($GLOBALS['TL_CTE']['media'], count($GLOBALS['TL_CTE']['media']), [
    'twentytwenty' => \HeimrichHannot\TwentyTwentyBundle\ContentElement\ContentTwentyTwenty::class
]);


/**
 * JS
 */
if (\Contao\System::getContainer()->get('huh.utils.container')->isFrontend()
    && !in_array('HeimrichHannot\EncoreBundle\HeimrichHannotContaoEncoreBundle', \Contao\System::getContainer()->getParameter('kernel.bundles'), true)) {
    
    $GLOBALS['TL_CSS']['twentytwenty']            = 'bundles/heimrichhannottwentytwenty/vendor/twentytwenty/css/twentytwenty.css';
    $GLOBALS['TL_JAVASCRIPT']['twentytwenty']     = 'bundles/heimrichhannottwentytwenty/vendor/twentytwenty/js/jquery.event.move.js';
    $GLOBALS['TL_JAVASCRIPT']['event-move']       = 'bundles/heimrichhannottwentytwenty/vendor/twentytwenty/js/jquery.twentytwenty.js';
    $GLOBALS['TL_JAVASCRIPT']['huh_twentytwenty'] = 'bundles/heimrichhannottwentytwenty/js/contao-twentytwenty.js';
}
