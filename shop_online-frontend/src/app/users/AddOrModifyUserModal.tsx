'use client';

import { Button, Form, FormInstance, Input, Modal, Select, Slider } from 'antd';
import React, { useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { MdEdit } from 'react-icons/md';

interface AddOrModifyUserModalProps {
    onSubmit: (formData: any) => void;
    initialValue?: {
        name: string;
        surname: string;
        address: string;
        email: string;
        phone: string;
    };
}

export const AddOrModifyUserModal: React.FC<AddOrModifyUserModalProps> = ({
    onSubmit,
    initialValue,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formRef = useRef<FormInstance<any>>(null);

    return (
        <>
            <Button
                title={initialValue && 'Modify user'}
                icon={initialValue ? <MdEdit /> : <GoPlus />}
                onClick={() => setIsModalOpen(true)}
                type={!initialValue ? 'primary' : undefined}
            >
                {!initialValue && 'Add user'}
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => {
                    formRef.current?.submit();
                    setIsModalOpen(false);
                }}
                title={
                    initialValue
                        ? `Modify ${initialValue?.name} ${initialValue?.surname}`
                        : 'Add new user'
                }
            >
                <Form
                    onFinish={onSubmit}
                    ref={formRef}
                    initialValues={initialValue}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Surname"
                        name="surname"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Phone no"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
