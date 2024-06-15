import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Space, Tooltip } from 'antd';
import { useState } from 'react';

const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };
  return (
      <Input
        {...props}
        onChange={handleChange} 
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={16}
      />
  );
};

export const CustomInputNumber = ({width}) => {
  const [value, setValue] = useState('');
  return (
    <NumericInput
      style={{
        width: {width},
      }}
      value={value}
      onChange={setValue}
    />
  );
}

export const CustomInputPassword = ({placeholder}) => {
  return (
    <Space  direction="vertical">
      <Input.Password
        placeholder={placeholder}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
    </Space>
  );
}