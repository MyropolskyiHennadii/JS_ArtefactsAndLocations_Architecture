import CommonConstants from "./CommonConstants";

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


class SynonymsAndLanguages {

    //prepare name category for user
    getRightNameOfCategory(fullName) {
        let name = fullName.replace(" - Wikipedia", "");//en, it, es, de
        name = name.replace("Wikipédia", "");//fr
        name = name.replace("Wikipedia", "");//it
        name = name.replace("Вікіпедія", "");//uk
        name = name.replace("Википедия", "");//ru

        name = name.replace(" — ", "");
        name = name.replace(" — ", "");
        name = name.replace(" - ", "");
        name = name.replace(" – ", "");
        //ro? ...
        if (name.indexOf("Category:", 0) === 0) {
            name = name.substring(9);//in different languages...
        }
        if (name.indexOf("Kategorie:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        if (name.indexOf("Catégorie:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        if (name.indexOf("Categoria:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        if (name.indexOf("Categoría:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        if (name.indexOf("Категория:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        if (name.indexOf("Категорія:", 0) === 0) {
            name = name.substring(10);//in different languages...
        }
        return name.trim();
    }

    //"translate" name of category ant get web-wiki at using language
    //"000"+ and so on - for sorting
    //if we found language we need, return name in this lang
    //if we didn't find it: return name in English or (if in English it doesn't exist) - the first name
    getCategoryName(lang, mainCategory) {

        const nameAndWebReference = class {//returning pair
            category_name;
            web_reference;
            constructor(category_name, web_reference) {
                this.category_name = category_name;
                this.web_reference = web_reference;
            }
        }

        let categoryName = this.getRightNameOfCategory(mainCategory.category_name);
        if (mainCategory.page_language === lang) {
            return new nameAndWebReference("000" + categoryName, mainCategory.web_reference_wiki);
        }
        let enName = "";
        let firstName = categoryName;//that's default
        let enWiki = "";
        let firstWiki = mainCategory.web_reference_wiki;//that's default
        for (let index = 0; index < mainCategory.synonyms.length; index++) {
            if (mainCategory.synonyms[index].lang === lang) {
                return new nameAndWebReference("000" + this.getRightNameOfCategory(mainCategory.synonyms[index].lang_name), mainCategory.synonyms[index].web_reference_wiki);
            }
            if (index === 0) {
                firstName = "004" + this.getRightNameOfCategory(mainCategory.synonyms[index].lang_name);
                firstWiki = mainCategory.synonyms[index].web_reference_wiki;
            }
            if (mainCategory.synonyms[index].lang === "en") {
                enName = "001" + this.getRightNameOfCategory(mainCategory.synonyms[index].lang_name);
                enWiki = mainCategory.synonyms[index].web_reference_wiki;
            }
        }
        if (enName !== "") {
            return new nameAndWebReference(enName, enWiki);
        }
        //al least (this "004"+ is just for sorting)
        return new nameAndWebReference("004" + firstName, firstWiki);
    }

    //"translate" name of artefact ant get web-wiki at using language
    //if we found language we need, return name in this lang
    //if we didn't find it: return name in English or (if in English it doesn't exist) - the first name
    getArtefactyName(mainArtefact, lang) {

        const nameAndWebReference = class {//returning pair
            artefact_name;
            web_reference;
            rate;
            constructor(artefact_name, web_reference, rate) {
                this.artefact_name = artefact_name;
                this.web_reference = web_reference;
                this.rate = rate;//only for sorting
            }
        }

        if ((mainArtefact.page_language === lang) || (mainArtefact.synonyms.length === 0)) {
            return new nameAndWebReference(mainArtefact.artefacts_name, mainArtefact.web_reference_wiki, CommonConstants.getLanguages().indexOf(mainArtefact.page_language));
        }

        //fill array with names, lang and wiki, then sort it
        const arrNames = [];
        arrNames.push(new nameAndWebReference(mainArtefact.artefacts_name, mainArtefact.web_reference_wiki, CommonConstants.getLanguages().indexOf(mainArtefact.page_language)));
        for (let index = 0; index < mainArtefact.synonyms.length; index++) {
            if (mainArtefact.synonyms[index].lang === lang) {
                //stop it, we found it
                return new nameAndWebReference(mainArtefact.synonyms[index].lang_name, mainArtefact.synonyms[index].web_reference_wiki, CommonConstants.getLanguages().indexOf(mainArtefact.synonyms[index].lang));
            }
            arrNames.push(new nameAndWebReference(mainArtefact.synonyms[index].lang_name, mainArtefact.synonyms[index].web_reference_wiki, CommonConstants.getLanguages().indexOf(mainArtefact.synonyms[index].lang)));
        }
        //nothing was found
        //sort by the rate
        arrNames.sort(compare);
        //return the first with rate >= 0 (it would be 'en', if 'en' exists in synonyms)
        for (let index = 0; index < arrNames.length; index++) {
            if(arrNames[index].rate >= 0){
                return arrNames[index];
            }
        }
        //at least nothing was found (may be, but it's very strange), then return just the first
        return arrNames[0];
    }

}

export default new SynonymsAndLanguages();