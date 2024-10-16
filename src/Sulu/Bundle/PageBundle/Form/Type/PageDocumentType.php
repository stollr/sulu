<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\PageBundle\Form\Type;

use Sulu\Component\Content\Form\Type\DocumentObjectType;
use Sulu\Component\DocumentManager\DocumentManagerInterface;
use Sulu\Component\DocumentManager\Metadata\MetadataFactory;
use Sulu\Component\PHPCR\SessionManager\SessionManagerInterface;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageDocumentType extends BasePageDocumentType
{
    public function __construct(
        private SessionManagerInterface $sessionManager,
        private DocumentManagerInterface $documentManager,
        private MetadataFactory $metadataFactory,
    ) {
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->add('parent', DocumentObjectType::class);

        $builder->addEventListener(FormEvents::POST_SUBMIT, [$this, 'postSubmitDocumentParent']);
    }

    public function configureOptions(OptionsResolver $options)
    {
        $metadata = $this->metadataFactory->getMetadataForAlias('page');

        $options->setDefaults([
            'data_class' => $metadata->getClass(),
        ]);

        parent::configureOptions($options);
    }

    /**
     * Set the document parent to be the webspace content path
     * when the document has no parent.
     */
    public function postSubmitDocumentParent(FormEvent $event)
    {
        $document = $event->getData();

        if ($document->getParent()) {
            return;
        }

        $form = $event->getForm();
        $webspaceKey = $form->getConfig()->getAttribute('webspace_key');
        $parent = $this->documentManager->find($this->sessionManager->getContentPath($webspaceKey));

        if (null === $parent) {
            throw new \InvalidArgumentException(
                \sprintf(
                    'Could not determine parent for document with title "%s" in webspace "%s"',
                    $document->getTitle(),
                    $webspaceKey
                )
            );
        }

        $document->setParent($parent);
    }
}
