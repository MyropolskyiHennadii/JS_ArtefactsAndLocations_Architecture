import React, { Fragment } from 'react';
//i18next
import { useTranslation } from 'react-i18next';

import SynonymsAndLanguages from '../service/SynonymsAndLanguages';
import GeomarkersService from '../service/GeomarkersService';
import AsidePhotoComponent from './AsidePhotoComponent';

export default function InfoArtefact(props) {

    const [t, i18n] = useTranslation();

    const featureStyle = { marginLeft: '0em', backgroundColor: '#EEE8AA' };
    if (props.feature !== null) {
        const feature = GeomarkersService.fillFeatureWithProperties(props.feature, props.artefact, i18n.language, props.allCategories);
        return (
            <Fragment>
                <div style={featureStyle}>
                    <b>ID: </b> <span>{feature.get('id_artefact')}</span>
                    <div>
                        <b>{t("ArtefactsName")}: </b><span>{feature.get('name')}</span>
                    </div>
                    <div>
                        <b>{t("ArtefactsCoordinates")}</b> <span>{feature.get('longitude')}, {feature.get('latitude')}</span>
                    </div>
                    <div>
                        <b>{t("ArtefactsEvent")}</b> <span>{feature.get('event')}</span>
                    </div>
                    <div>
                        <b>{t("ArtefactsAuthor")}</b> <span>{feature.get('author')}</span>
                    </div>
                    <div>
                        <b>{t("ArtefactsCategory")}</b> <span>{feature.get('categories')}</span>
                    </div>
                    <div>
                        <a href={feature.get('wiki')} target="_blank"><b>{t("ArtefactsWiki")} {feature.get('name')}</b></a>
                    </div>
                </div>
                <AsidePhotoComponent feature={feature} linksToPhotos = {props.linksToPhotos}></AsidePhotoComponent> 
            </Fragment>

        )
    } else if (props.category != null) {
        const category = props.category;
        if (category.value.substring(0, 3) === "000") {//all category
            return (
                <div> </div>
            )
        } else {
            const mainCategory = props.allCategories
                .find(x => (x.id_category == category.value));//in different languages
            if (mainCategory !== undefined) {
                const nameAndWebReference = SynonymsAndLanguages.getCategoryName(i18n.language, mainCategory);
                return (
                    <div style={featureStyle}>
                        <b>ID: </b> <span>{category.value}</span>
                        <div>
                            <b>name: </b><span>{nameAndWebReference.category_name.substring(3)}</span>
                        </div>
                        <div>
                            <a href={nameAndWebReference.web_reference} target="_blank"><b>{t("CategoriesWikiPage")} {nameAndWebReference.category_name.substring(3)}</b></a>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div> </div>
                )
            }
        }
    }
    else {
        return (
            <div> </div>
        )
    }
}