'use client';

import { Button, Popconfirm } from 'antd';
import { useRef } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface DeleteButtonProps {
    onUserDelete: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onUserDelete }) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    return (
        <form
            ref={formRef}
            action={onUserDelete}
        >
            <Popconfirm
                title="Are you sure?"
                onConfirm={() => {
                    formRef.current?.requestSubmit();
                }}
            >
                <Button
                    danger
                    title="Delete"
                    icon={<FaTrashAlt />}
                />
            </Popconfirm>
        </form>
    );
};
