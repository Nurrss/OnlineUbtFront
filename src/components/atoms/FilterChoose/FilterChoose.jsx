import React from 'react';
import { Radio } from 'antd';
import {filterData} from '../../../data/filter_select'
import { CheckOutlined } from '@ant-design/icons';

import './FilterChoose.css'

export const FilterChoose = ({ onSelect, selectedRole }) => {

  return (
      <Radio.Group 
          defaultValue='' 
          size="large" 
          style={{ borderRadius: 0 }} 
          value={selectedRole} 
          onChange={(e) => onSelect(e.target.value)}
        >
          {filterData.map((filter, index) => (
            <Radio.Button
              key={index}
              value={filter.role}
            >
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {filter.name}
                {selectedRole === filter.role && <CheckOutlined style={{ marginLeft: 8 }} />}
              </div>
            </Radio.Button>
          ))}
        </Radio.Group>
  )
}