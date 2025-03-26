<?php


use HeimrichHannot\EncoreContracts\EncoreEntry;
use HeimrichHannot\EncoreContracts\EncoreExtensionInterface;
use HeimrichHannot\ExampleBundle\HeimrichHannotExampleBundle;
class EncoreExtension implements EncoreExtensionInterface{


    public function getBundle(): string
    {
        return HeimrichHannotTwentyTwentyBundle::class;
    }

    public function getEntries(): array
    {

        return [

            EncoreEntry::create('twentytwenty', 'public/js/contao-twentytwenty.js')
                ->setIsHeadScript(false),
            EncoreEntry::create('twentytwentyscss', 'public/vendor/twentytwenty/twentytwenty.scss')
                ->setIsHeadScript(true),
            EncoreEntry::create('event.move', 'public/vendor/twentytwenty/js/jquery.event.move.js')
                ->setIsHeadScript(true),

            EncoreEntry::create('jquery.twentytwenty', 'public/vendor/twentytwenty/js/jquery.twentytwenty.js')
                ->setIsHeadScript(true),



        ];

    }
}