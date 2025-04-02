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

    private FileUtil $fileUtil;
    private EncoreFrontendAsset $frontendAsset;

    public function __construct(FileUtil $fileUtil, EncoreFrontendAsset $frontendAsset)
    {
        parent::__construct();
        $this->fileUtil = $fileUtil;
        $this->frontendAsset = $frontendAsset;
    }
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
        $source = $this->fileUtil->getFileFromUuid($this->{$field});

        if (null === $source) {
            return;
        }


        $image = new FrontendTemplate();

        $this->addImageToTemplate($image, [
            'addImage' => 1,
            'singleSRC' => $source->path,
            'alt' => $this->alt,
            'size' => $this->size,
            'imagemargin' => $this->imagemargin,
            'imageUrl' => $this->imageUrl,
            'caption' => $this->caption,
            'floating' => $this->floating,
            'fullsize' => $this->fullsize,
        ], null, 'id'.$source->id);

        System::getContainer()->get(FrontendAsset::class)->addFrontendAssets();

        $this->Template->{$field} = $image;
    }
}



