'use client';

import { Table } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import classes from './OrdersTable.module.css';

interface OrdersTableProps {
    data: any[];
    pageSize: number;
    currentPage: number;
    total: number;
}

const PaymentStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case 'new':
            return <span className={classes.paymentStatusNew}>New</span>;
        case 'in_progress':
            return (
                <span className={classes.paymentStatusInProgress}>
                    In progress
                </span>
            );
        case 'paid':
            return <span className={classes.paymentStatusCompleted}>Paid</span>;
        case 'rejected':
            return (
                <span className={classes.paymentStatusRejected}>Rejected</span>
            );
        default:
            return <span>{status}</span>;
    }
};

const OrderStatus: React.FC<{ status: string }> = ({ status }) => {
    switch (status) {
        case 'new':
            return <span className={classes.paymentStatusNew}>New</span>;
        case 'in_progress':
            return (
                <span className={classes.paymentStatusInProgress}>
                    In progress
                </span>
            );
        case 'delivered':
            return (
                <span className={classes.paymentStatusCompleted}>
                    Delivered
                </span>
            );
        case 'returned':
            return (
                <span className={classes.paymentStatusRejected}>Returned</span>
            );
        default:
            return <span>{status}</span>;
    }
};

export const OrdersTable: React.FC<OrdersTableProps> = ({
    data,
    pageSize,
    currentPage,
    total,
}) => (
    <Table
        columns={[
            {
                title: 'Client name',
                dataIndex: ['client', 'name'],
            },
            {
                title: 'Client surname',
                dataIndex: ['client', 'surname'],
            },
            {
                title: 'Date',
                dataIndex: 'order_date',
                render: value => {
                    const date = dayjs(value);

                    return (
                        <span title={date.format('DD-MM-YYYY, HH:mm')}>
                            {date.calendar(undefined, {
                                sameElse: 'DD-MM-YYYY',
                            })}
                        </span>
                    );
                },
            },
            {
                title: 'Delivery address',
                dataIndex: 'address',
            },
            {
                title: 'Total price',
                dataIndex: 'total_price',
                render: val =>
                    new Intl.NumberFormat('pl-PL', {
                        style: 'currency',
                        currency: 'PLN',
                    }).format(val),
            },
            {
                title: '# of items',
                render: (_, { products }) => products.length,
            },
            {
                title: 'Payment status',
                dataIndex: 'payment_status',
                render: val => <PaymentStatus status={val} />,
            },
            {
                title: 'Order status',
                dataIndex: 'order_status',
                render: val => <OrderStatus status={val} />,
            },
        ]}
        expandable={{
            expandedRowRender: row => (
                <Table
                    dataSource={row.products}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                        },
                        {
                            title: 'Amount',
                            dataIndex: 'amount',
                        },
                        {
                            title: 'Unit price',
                            render: (_, { amount, price }) =>
                                new Intl.NumberFormat('pl-PL', {
                                    style: 'currency',
                                    currency: 'PLN',
                                }).format(price / amount),
                        },
                        {
                            title: 'Price',
                            dataIndex: 'price',
                            render: val =>
                                new Intl.NumberFormat('pl-PL', {
                                    style: 'currency',
                                    currency: 'PLN',
                                }).format(val),
                        },
                    ]}
                />
            ),
        }}
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
