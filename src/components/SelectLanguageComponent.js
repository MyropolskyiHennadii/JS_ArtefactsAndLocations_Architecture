import React from 'react';
import i18n from "i18next";
import CommonConstants from '../service/CommonConstants';

//change language
 const handleChangeLanguage = (options) => (
     i18n.changeLanguage(options[document.getElementById("selectLanguageID").selectedIndex].key)
    );

/*select language*/
export default function SelectLanguageComponent(props) {
    const optionsLanguages = CommonConstants.buildLanguageOptions();
    return (
        <div>
            <form>
                <div>
                    <select id="selectLanguageID" onChange={()=>handleChangeLanguage(optionsLanguages)}>
                        {optionsLanguages}
                    </select>
                </div>
            </form>
        </div>
    )

}