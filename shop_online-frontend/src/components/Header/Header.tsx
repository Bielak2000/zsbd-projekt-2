import React, { ComponentProps } from 'react';
import { Header as AntdHeader } from '../antd';
import classes from './Header.module.css';
import classNames from 'classnames';

export const Header: React.FC<ComponentProps<typeof AntdHeader>> = props => (
    <AntdHeader
        {...props}
        className={classNames(props.className, classes.root)}
    />
);
