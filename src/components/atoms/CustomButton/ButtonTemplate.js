// ButtonTemplates.js

import { css } from 'styled-components';
import {sizes} from '../../../base/sizes'

export const ButtonSizeStyles = {
    loginButton: css`
        width: 616px;
        height: 64px;
        font-size: ${sizes.large};
        font-weight: 600;
    `,
    questionButton: css`
        width: 60px;
        height: 60px;
        font-size: ${sizes.large};
        font-weight: 500;
    `,
    endButton: css`
        font-size: ${sizes.xLarge};
        font-weight: 500;
    `,
    popupButton: css`
        width: 164px;
        height: 48px;
        font-size: ${sizes.large};
        font-weight: 500;
    `,
    detailsButton: css`
        width: 164px;
        height: 42px;
        font-size: ${sizes.mediumPlus};
        font-weight: 500;
    `,
};
