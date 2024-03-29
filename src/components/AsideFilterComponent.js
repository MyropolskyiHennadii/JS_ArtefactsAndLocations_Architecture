import React from 'react';
import ReactDOM from 'react-dom';
//i18next
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

import SynonymsAndLanguages from '../service/SynonymsAndLanguages';
import GeomarkersService from '../service/GeomarkersService';
import InfoArtefact from "./InfoArtefactComponent";

//for sorting 
function compare(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    if (a.value > b.value) {
        return 1;
    }
    return 0;
}

const Category = class {
    value;
    web_reference;
    key;
    constructor(value, web_reference, key) {
        this.value = value;
        this.web_reference = web_reference;
        this.key = key;
    }
}

function prepareOptionsArtefactsCategories(allCategories, t) {
    let optionsCategories = [];//select categories
    optionsCategories.push(new Category(t("SelectAllCategories"),
        null,
        t("SelectAllCategories"),
        0
    ));

    for (let i = 0; i < allCategories.length; i++) {
        const mainCategory = allCategories[i];
        const nameAndWebReference = SynonymsAndLanguages.getCategoryName(i18n.language, mainCategory);
        optionsCategories.push(new Category(
            nameAndWebReference.category_name,
            nameAndWebReference.web_reference,
            mainCategory.id
        ));
    }
    //sort by value and throw the begignning 00...
    optionsCategories.sort(compare);
    for (let i = 0; i < optionsCategories.length; i++) {
        optionsCategories[i].value = optionsCategories[i].value.substring(3);
    }
    const options = [];
    for (let i = 0; i < optionsCategories.length; i++) {
        options.push(<option value={optionsCategories[i].key} id={optionsCategories[i].web_reference} key={optionsCategories[i].key}>{optionsCategories[i].value}</option>);
    }
    return options;
}

export default function AsideFiltersComponent(props) {

    const [t, i18n] = useTranslation();

    //by selecting category in list
    const handleChangeSelectFromListCategory = () =>
    (
        props.refreshGeomarkers(
            GeomarkersService.formingArtefactsArrayByCategory(
                props.artefacts,
                props.allCategories,
                document.getElementById("selectCategoryID").options[document.getElementById("selectCategoryID").selectedIndex].value
            )
        ),
        ReactDOM.render(
            <InfoArtefact feature={null}
                category={document.getElementById("selectCategoryID").options[document.getElementById("selectCategoryID").selectedIndex]}
                allCategories={props.allCategories}
            />,
            document.getElementById('infoArtefact')
        )
    )

    //if ((props.categories !== null) && (props.categories !== undefined)) {
    if (props.allCategories !== null) {
        let optionsCategories = prepareOptionsArtefactsCategories(props.allCategories, t)
        return (
            <div>
                <h2 style={{ marginLeft: 2 + 'em' }}>{t("Filters")}</h2>
                <form>
                    <div>
                        <p>{t("SelectCategory")}</p>
                        <select id="selectCategoryID" onChange={handleChangeSelectFromListCategory}>
                            {optionsCategories}
                        </select>
                    </div>
                </form>
            </div>)
    } else {
        return (
            <div>
                <h2 style={{ marginLeft: 2 + 'em' }}>{t(props.message)}</h2>
            </div>)
    }
}