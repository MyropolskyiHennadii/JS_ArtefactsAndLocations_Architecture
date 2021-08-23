import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeaderDescriptionComponent(props) {
    const [t, i18n] = useTranslation();

    return (
        <div>
            <h1>{t("MainHeader")}</h1>
            <p style={{ marginLeft: 2 + 'em' }}>{t('FirstInstruction')}</p>
        </div>
    );
} 