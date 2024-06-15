import React from "react";
import { Text } from "../components/atoms/CustomText/CustomText";
import styled from "styled-components";

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 72vh;
`;

export const NotFoundPage = () => {
    return (
        <NotFoundWrapper>
            <Text type='notFoundTitle' color='green'>404</Text>
            <Text type='notFoundText' color='green'>страница не найдена</Text>
        </NotFoundWrapper>
    )
}