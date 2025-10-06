'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from "@ant-design/icons";

type Props = {
  children: ReactNode;
  hasNavigationBack?: boolean;
};

export default function NavLayout({ children, hasNavigationBack }: Props) {
  const router = useRouter();
  return (
    <>
      {hasNavigationBack && (
        <ArrowLeftOutlined
          style={{
            color: "#0D6EFD",
            fontSize: "24px",
            marginLeft: "5%",
            marginTop: "1%",
            cursor: 'pointer',
          }}
          onClick={() => router.back()}
        />
      )}
      {children}
    </>
  );
}
