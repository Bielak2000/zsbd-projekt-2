import { ReactNode } from 'react';
import { Header } from '~/components/Header';
import { Content, Layout } from '~/components/antd';
import { Metadata } from 'next';
import { Card } from 'antd';
import classes from './layout.module.css';

export const metadata: Metadata = {
    title: 'Webshop',
};

export default function OverviewLayout({
    rejectedPayments,
    topProduct,
    topUserByOrderCount,
    topUserByOrderValue,
}: {
    rejectedPayments: ReactNode;
    topProduct: ReactNode;
    topUserByOrderCount: ReactNode;
    topUserByOrderValue: ReactNode;
}) {
    return (
        <Layout>
            <Header>
                <h1>Overview</h1>
            </Header>
            <Content className={classes.root}>
                <Card
                    className={classes.topProduct}
                    title="Top phone by order count"
                >
                    {topProduct}
                </Card>
                <Card
                    className={classes.topUserByOrderCount}
                    title="Top user by order count"
                >
                    {topUserByOrderCount}
                </Card>
                <Card
                    className={classes.topUserByOrderValue}
                    title="Top user by total order value"
                >
                    {topUserByOrderValue}
                </Card>
                <Card
                    className={classes.rejectedPayments}
                    title="Users with rejected payment on some orders"
                >
                    {rejectedPayments}
                </Card>
            </Content>
        </Layout>
    );
}
