<?php
/**
 * Created by PhpStorm.
 * User: mkunitzsch
 * Date: 20.08.18
 * Time: 17:13
 */

namespace HeimrichHannot\TwentyTwentyBundle\ContentElement;


use Contao\ContentElement;
use Contao\FrontendTemplate;
use Contao\System;
use HeimrichHannot\TwentyTwentyBundle\Asset\FrontendAsset;

class ContentTwentyTwenty extends ContentElement
{
    protected $strTemplate = 'ce_twentytwenty';
    
    public function generate()
    {
//        if (System::getContainer()->get('huh.utils.container')->isBackend()) {
//            return $GLOBALS['TL_LANG']['CTE']['twentytwenty'];
//        }
        
        return parent::generate();
    }
    
    protected function compile()
    {
        if ($this->singleSRC_before && $this->singleSRC_after) {
            $this->addTwentyTwentyImageToTemplate('singleSRC_before');
            $this->addTwentyTwentyImageToTemplate('singleSRC_after');
        }
    }
    
    /**
     * add the images to the template
     *
     * @param string $field
     */
    protected function addTwentyTwentyImageToTemplate(string $field)
    {
        $fileUtil = System::getContainer()->get('huh.utils.file');
        $file = $fileUtil->getFileFromUuid($this->{$field});

        if (!$file || !$file->path) {
            return;
        }

        $imageTemplate = new FrontendTemplate('twentytwenty_image');

        $this->addImageToTemplate($imageTemplate, [
            'addImage'   => true,
            'singleSRC'  => $file->path,
            'alt'        => $this->alt,
            'size'       => $this->size,
            'imagemargin'=> $this->imagemargin,
            'imageUrl'   => $this->imageUrl,
            'caption'    => $this->caption,
            'floating'   => $this->floating,
            'fullsize'   => $this->fullsize,
        ], null, 'id' . $file->id);

        if (System::getContainer()->has(FrontendAsset::class)) {
            System::getContainer()->get(FrontendAsset::class)->addFrontendAssets();
        }

        $this->Template->{$field} = $imageTemplate->parse();
    }
}



