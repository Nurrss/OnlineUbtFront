// ButtonTemplates.js

import { css } from 'styled-components';
import {colors} from '../../../base/colors'
import {sizes} from '../../../base/sizes'

export const TextStyles = {
  large: css`
    font-size: ${sizes.large};
    text-align: start;
    /* font-weight: 700; */
  `,
  largePlus: css`
    font-size: ${sizes.largePlus};
    text-align: start;
    /* font-weight: 700; */
  `,
  largex: css`
    font-size: ${sizes.xLarge};
    /* font-weight: 600; */
    text-align: start;
  `,
  large2x: css`
    text-align: center;
    /* font-weight: 500; */
    font-size: ${sizes.xxLarge};
  `,
  large2xPlus: css`
    text-align: center;
    /* font-weight: 500; */
    font-size: ${sizes.xxLarge};
  `,
  notFoundTitle: css`
    text-align: center;
    /* font-weight: 500; */
    font-size: ${sizes.notFoundTitle};
  `,
  notFoundText: css`
    font-size: ${sizes.notFoundText};
    /* font-weight: 500; */
    text-align: center;
  `,
  medium: css`
    font-size: ${sizes.medium};
    /* weight: 600; */
    text-align: start;
  `
};
