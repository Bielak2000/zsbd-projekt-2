'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { PropsWithChildren, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Layout, Menu } from 'antd';
import classes from './layout.module.css';
import { FaCartPlus } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { MdChecklist } from 'react-icons/md';
import Link from 'next/link';
import '~/utils/dayjs';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: PropsWithChildren) {
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(true);
    const pathname = usePathname();

    return (
        <html lang="en">
            <body className={inter.className}>
                <AntdRegistry>
                    <Layout>
                        <Layout.Sider
                            theme="light"
                            collapsible
                            collapsed={isSiderCollapsed}
                            onCollapse={setIsSiderCollapsed}
                            className={classes.sider}
                        >
                            <Menu
                                activeKey={pathname}
                                items={[
                                    {
                                        label: <Link href="/">Overview</Link>,
                                        key: '/',
                                        icon: <FaHome />,
                                    },
                                    {
                                        label: <Link href="/users">Users</Link>,
                                        key: '/users',
                                        icon: <HiMiniUserGroup />,
                                    },
                                    {
                                        label: (
                                            <Link href="/orders">Orders</Link>
                                        ),
                                        key: '/orders',
                                        icon: <MdChecklist />,
                                    },
                                    {
                                        label: (
                                            <Link href="/products">
                                                Products
                                            </Link>
                                        ),
                                        key: '/products',
                                        icon: <FaCartPlus />,
                                    },
                                ]}
                            />
                        </Layout.Sider>
                        <Layout.Content className={classes.content}>
                            {children}
                        </Layout.Content>
                    </Layout>
                </AntdRegistry>
            </body>
        </html>
    );
}
