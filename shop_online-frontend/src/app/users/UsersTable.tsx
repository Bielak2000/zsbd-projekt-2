'use client';

import { Button, Popconfirm, Table } from 'antd';
import Link from 'next/link';
import React from 'react';
import classes from './UsersTable.module.css';
import dayjs from 'dayjs';
import { DeleteButton } from './DeleteButton';
import { AddOrModifyUserModal } from './AddOrModifyUserModal';

interface UsersTableProps {
    data: any[];
    onUserDelete?: (id: any) => void;
    onUserUpdate?: (id: any, formData: any) => void;
    onUserCreate?: (formData: any) => void;
    pageSize?: number;
    currentPage?: number;
    total?: number;
}

export const UsersTable: React.FC<UsersTableProps> = ({
    data,
    pageSize,
    currentPage,
    total,
    onUserDelete,
    onUserCreate,
    onUserUpdate,
}) => (
    <>
        {onUserCreate && <AddOrModifyUserModal onSubmit={onUserCreate} />}
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
                    render: val => dayjs(val).format('YYYY-MM-DD'),
                },
                ...(onUserDelete && onUserUpdate
                    ? [
                          {
                              title: 'Actions',
                              dataIndex: '_id',
                              render: (
                                  id: any,
                                  { personal_data, email }: any,
                              ) => (
                                  <div className={classes.actions}>
                                      <AddOrModifyUserModal
                                          onSubmit={onUserUpdate.bind(null, id)}
                                          initialValue={{
                                              address: personal_data.address,
                                              email,
                                              name: personal_data.name,
                                              surname: personal_data.surname,
                                              phone: personal_data.phone_number,
                                          }}
                                      />
                                      <DeleteButton
                                          onUserDelete={onUserDelete.bind(
                                              null,
                                              id,
                                          )}
                                      />
                                  </div>
                              ),
                          },
                      ]
                    : []),
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
    </>
);
