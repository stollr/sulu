<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Content\Compat;

use Sulu\Component\Util\ArrayableInterface;

/**
 * Property definition and value.
 */
interface PropertyInterface extends ArrayableInterface
{
    /**
     * returns name of template.
     *
     * @return string
     */
    public function getName();

    /**
     * returns mandatory.
     *
     * @return bool
     */
    public function isMandatory();

    /**
     * returns multilingual.
     *
     * @return bool
     */
    public function isMultilingual();

    /**
     * return min occurs.
     *
     * @return int
     */
    public function getMinOccurs();

    /**
     * return max occurs.
     *
     * @return int
     */
    public function getMaxOccurs();

    /**
     * returns name of content type.
     *
     * @return string
     */
    public function getContentTypeName();

    /**
     * parameter of property.
     *
     * @return PropertyParameter[]
     */
    public function getParams();

    /**
     * sets the value from property.
     */
    public function setValue($value);

    /**
     * gets the value from property.
     */
    public function getValue();

    /**
     * returns TRUE if property is a block.
     *
     * @return bool
     */
    public function getIsBlock();

    /**
     * returns TRUE if property is multiple.
     *
     * @return bool
     */
    public function getIsMultiple();

    /**
     * returns field is mandatory.
     *
     * @return bool
     */
    public function getMandatory();

    /**
     * returns field is multilingual.
     *
     * @return bool
     */
    public function getMultilingual();

    /**
     * Returns tags defined in xml.
     *
     * @return PropertyTag[]
     */
    public function getTags();

    /**
     * returns tag with given name.
     *
     * @param string $tagName
     *
     * @return PropertyTag
     */
    public function getTag($tagName);

    /**
     * returns column span.
     *
     * @return int
     */
    public function getColSpan();

    /**
     * returns title of property.
     *
     * @param string $languageCode
     *
     * @return string
     */
    public function getTitle($languageCode);

    /**
     * returns infoText of property.
     *
     * @param string $languageCode
     *
     * @return string
     */
    public function getInfoText($languageCode);

    /**
     * returns placeholder of property.
     *
     * @param string $languageCode
     *
     * @return string
     */
    public function getPlaceholder($languageCode);

    /**
     * returns structure.
     *
     * @return StructureInterface
     */
    public function getStructure();

    /**
     * sets structure.
     *
     * @param StructureInterface $structure
     */
    public function setStructure($structure);

    /**
     * returns a list of properties managed by this block.
     *
     * @return PropertyType[]
     */
    public function getTypes();

    /**
     * adds a type.
     *
     * @param PropertyType $type
     */
    public function addType($type);

    /**
     * Returns type with given name.
     *
     * @param string $name of property
     *
     * @return PropertyType
     *
     * @throws \InvalidArgumentException
     */
    public function getType($name);

    /**
     * Returns true if the type with given name is known.
     *
     * @param string $name
     *
     * @return bool
     */
    public function hasType($name);

    /**
     * returns properties for given index.
     *
     * @param int $index
     *
     * @return PropertyType
     */
    public function getProperties($index);

    /**
     * Returns sizeof block.
     *
     * @return int
     */
    public function getLength();

    /**
     * initiate new child with given type name.
     *
     * @param int $index
     * @param string $typeName
     *
     * @return PropertyType
     */
    public function initProperties($index, $typeName);

    /**
     * clears all initialized properties.
     */
    public function clearProperties();

    /**
     * return default type name.
     *
     * @return string
     */
    public function getDefaultTypeName();
}
