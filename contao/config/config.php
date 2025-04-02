<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:44
 */

file_put_contents(
    __DIR__ . '/../../../../config_debug.log',
    "config.php wurde geladen\n",
    FILE_APPEND
);


array_insert($GLOBALS['TL_CTE']['media'], count($GLOBALS['TL_CTE']['media']), [
    'twentytwenty' => \HeimrichHannot\TwentyTwentyBundle\ContentElement\ContentTwentyTwenty::class
]);
