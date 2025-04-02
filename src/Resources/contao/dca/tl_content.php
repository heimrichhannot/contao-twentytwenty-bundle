<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:41
 */

$GLOBALS['TL_DCA']['tl_content']['palettes']['twentytwenty'] = '{type_legend},type,headline;
                                                                {twentytwenty_legend},singleSRC_before,singleSRC_after,size;
                                                                {template_legend:hide},customTpl;
                                                                {protected_legend:hide},protected;
                                                                {expert_legend:hide},guests,cssID,space;
                                                                {invisible_legend:hide},invisible,start,stop';

$GLOBALS['TL_DCA']['tl_content']['fields']['singleSRC_before'] = [
    'label'     => &$GLOBALS['TL_LANG']['tl_content']['singleSRC_before'],
    'exclude'   => true,
    'inputType' => 'fileTree',
    'eval'      => ['filesOnly' => true, 'fieldType' => 'radio', 'mandatory' => true, 'tl_class' => 'clr'],
    'sql'       => "binary(16) NULL",
];

$GLOBALS['TL_DCA']['tl_content']['fields']['singleSRC_after'] = [
    'label'     => &$GLOBALS['TL_LANG']['tl_content']['singleSRC_after'],
    'exclude'   => true,
    'inputType' => 'fileTree',
    'eval'      => ['filesOnly' => true, 'fieldType' => 'radio', 'mandatory' => true, 'tl_class' => 'clr'],
    'sql'       => "binary(16) NULL",
];