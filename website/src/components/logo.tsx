import Image from "next/image";
import React from "react";
export const Logo = ({
    ...props
}) => <Image  src="/logo.svg" alt="Logo" width={160} height={160} {...props} />;