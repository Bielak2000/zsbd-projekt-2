'use client';

import { Table } from 'antd';
import Link from 'next/link';
import React from 'react';

interface UsersTableProps {
    data: any[];
    pageSize?: number;
    currentPage?: number;
    total?: number;
}

export const UsersTable: React.FC<UsersTableProps> = ({
    data,
    pageSize,
    currentPage,
    total,
}) => (
    <Table
        columns={[
            {
                title: 'Name',
                dataIndex: ['personal_data', 'name'],
            },
            {
                title: 'Surname',
                dataIndex: ['personal_data', 'surname'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
            {
                title: 'Address',
                dataIndex: ['personal_data', 'address'],
            },
            {
                title: 'Phone',
                dataIndex: ['personal_data', 'phone_number'],
            },
            {
                title: 'Registered at',
                dataIndex: 'registered',
            },
        ]}
        rowKey={({ _id }) => _id}
        pagination={
            currentPage !== undefined &&
            total !== undefined &&
            pageSize !== undefined
                ? {
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
                  }
                : undefined
        }
        dataSource={data}
    />
);
