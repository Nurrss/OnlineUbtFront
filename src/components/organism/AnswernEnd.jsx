import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { CustomButton } from '../atoms/CustomButton/CustomButton';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import { Text } from '../atoms/CustomText/CustomText';
import { colors } from '../../base/colors';
import { RadioExample } from '../atoms/CustomRadio/CustomRadio';

const AnswerPartContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 100%;
    gap: 30px;
`





export const AnswerPart = ({ image1, image2, image3, image4}) => {
    return (
        <AnswerPartContainer>
            <CustomButton bgColor={colors.black_green} color={colors.white} sizeType='endButton'>Завершить тест</CustomButton>
        </AnswerPartContainer>
    )
}