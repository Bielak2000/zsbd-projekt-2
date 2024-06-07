'use client';

import { Table } from 'antd';
import Link from 'next/link';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import classes from './ProductsTable.module.css';

interface ProductsTableProps {
    data: any[];
    pageSize: number;
    currentPage: number;
    total: number;
}

const DetailsColumn: React.FC<any> = ({ type, ...rest }) => {
    switch (type) {
        case 'machine':
            return (
                <div className={classes.detailsColumnRoot}>
                    <div>Type</div>
                    <div>{rest.machine_type}</div>
                    <div>Make</div>
                    <div>{rest.machine_make}</div>
                    <div>Year</div>
                    <div>{rest.machine_year}</div>
                </div>
            );
        case 'car':
            return (
                <div className={classes.detailsColumnRoot}>
                    <div>Make</div>
                    <div>{rest.car_make}</div>
                    <div>Model</div>
                    <div>{rest.car_model}</div>
                    <div>Year</div>
                    <div>{rest.car_year}</div>
                    <div>VIN</div>
                    <div>{rest.car_vin}</div>
                </div>
            );
        case 'phone':
            return (
                <div className={classes.detailsColumnRoot}>
                    <div>Producer</div>
                    <div>{rest.device.producer}</div>
                    <div>Model</div>
                    <div>{rest.device.model}</div>
                    <div>Description</div>
                    <div>{rest.device.description}</div>
                    {(rest.device.photo as string[]).length > 0 && (
                        <>
                            <div>Photos</div>
                            <div className={classes.photos}>
                                {(rest.device.photo as string[]).map(photo => (
                                    <img src={photo} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        default:
            return <pre>{JSON.stringify(rest, null, 4)}</pre>;
    }
};

export const ProductsTable: React.FC<ProductsTableProps> = ({
    data,
    pageSize,
    currentPage,
    total,
}) => (
    <Table
        columns={[
            {
                title: 'Product type',
                dataIndex: 'type',
            },
            {
                title: 'Price',
                dataIndex: 'price',
            },
            {
                title: 'Is available',
                dataIndex: 'availiability',
                render: val => (val ? <FaCheck /> : <IoMdClose />),
            },
            {
                title: 'Product data',
                render: (_, { type, price, availiability, ...rest }) => (
                    <DetailsColumn
                        type={type}
                        {...rest}
                    />
                ),
            },
        ]}
        rowKey={({ _id }) => _id}
        pagination={{
            pageSize,
            current: currentPage,
            total,
            showSizeChanger: false,
            itemRender: (page, _, element) => (
                <Link
                    href={`?page=${page}`}
                    legacyBehavior
                >
                    {element}
                </Link>
            ),
            position: ['bottomCenter'],
        }}
        dataSource={data}
    />
);
