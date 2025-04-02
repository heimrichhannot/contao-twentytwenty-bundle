<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:44
 */




if (function_exists('array_insert')) {
    // Contao 4.13: mit array_insert()
    array_insert($GLOBALS['TL_CTE']['media'], count($GLOBALS['TL_CTE']['media']), [
        'twentytwenty' => \HeimrichHannot\TwentyTwentyBundle\ContentElement\ContentTwentyTwenty::class,
    ]);
} else {
    // Contao 5.x: direkt hinzufügen
    $GLOBALS['TL_CTE']['media']['twentytwenty'] = \HeimrichHannot\TwentyTwentyBundle\ContentElement\ContentTwentyTwenty::class;
}